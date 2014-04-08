class Move < ActiveRecord::Base

  validates_inclusion_of :kind, :in => [ "Move", "Cannon", "Rotate", "Radar", "Repair", "Mine", "Torpedo" ]

  belongs_to :ship
  belongs_to :game

  after_create do |move|

    # Associate game with ship
    move.game_id = ship.game_id

    # Default message
    move.message = "No shots were fired"

    case move.kind
    when "Cannon"
      result = getShipCollision(move.pos_x, move.pos_y)
      mineResult = getMineCollision(move.pos_x, move.pos_y)
      txt = "Cannon fired at (#{move.pos_x},#{move.pos_y}). "

      if result==:hit
        txt += "Ship hit!"
      elsif mineResult==:hit
        txt += "Mine hit!"
      elsif result==:miss
        txt += "Nothing hit!"
      end

      move.message = txt
    when "Torpedo"
      result = getTorpedoCollision()
      txt = "Torpedo fired."
      
      if result[:hit]==:ship
        txt += " Ship hit at (#{result[:x]},#{result[:y]})"
      elsif result[:hit]==:mine
        txt += " Mine hit at (#{result[:x]},#{result[:y]})"
      elsif result[:hit]==:coral
        txt += " Coral hit at (#{result[:x]},#{result[:y]})"
      elsif result[:hit]==:miss
        txt += " Nothing hit!"
      end

      move.message = txt
    when "Mine"

      # Getting/Setting mines triggers only default message

      # Pick up an existing mine
      if isMine(move.pos_x, move.pos_y)

        # Remove mine from map and add to inventory
        removeMine(move.pos_x, move.pos_y)
        ship.ammo += 1

      # If the mine wouldn't detonate immediately
      elsif wontDetonate(move.pos_x, move.pos_y) && ship.ammo > 0
        
        # Add one mine from inventory to the map
        addMine(move.pos_x, move.pos_y)
        ship.ammo -= 1

      end  

    when "Move"
      move.message = "No shots were fired"
      if ship.location_x == move.pos_x
        dy = move.pos_y - ship.location_y
        dy.abs.times {|i| 
          addToShip({x: 0, y: dy/dy.abs})

          if ship.shiptype.name != "Mine Layer"
            if movedToMine()
              move.message = "Mine detonation ended action!"
              break
            end
          end
        }
      end

      if ship.location_y == move.pos_y
        dx = move.pos_x - ship.location_x
        dx.abs.times {|i| 
          addToShip({x: dx/dx.abs, y: 0})

          if ship.shiptype.name != "Mine Layer"
            if movedToMine()
              move.message = "Mine detonation ended action!"
              break
            end
          end
        }
      end
    when "Rotate"
      move.message = "No shots were fired"
      turnPossible = false
      quadrant = "NE"
      turn_index = ship.shiptype.turn_index

      location_x = ship.location_x
      location_y = ship.location_y

      case ship.direction
      when "Up"
        if ship.location_x == move.pos_x && ship.location_y == move.pos_y
          direction = "Down"
          location_y -= turn_index * 2
          turnPossible = true
        elsif move.pos_x < ship.location_x 
          direction = "Left"
          quadrant = "NW"
          location_x += turn_index
          location_y -= turn_index
        else
          direction = "Right"
          quadrant = "NE"
          location_x -= turn_index
          location_y -= turn_index
        end

      when "Down"
        if ship.location_x == move.pos_x && ship.location_y == move.pos_y
          direction = "Up"
          location_y += turn_index * 2
          turnPossible = true
        elsif move.pos_x < ship.location_x 
          direction = "Left"
          quadrant = "SW"
          location_x += turn_index
          location_y += turn_index
        else
          direction = "Right"
          quadrant = "SE"
          location_x -= turn_index
          location_y += turn_index
        end

      when "Left"
        if ship.location_x == move.pos_x && ship.location_y == move.pos_y
          direction = "Right"
          location_x -= turn_index * 2
          turnPossible = true
        elsif move.pos_y < ship.location_y
          direction = "Up"
          quadrant = "NW"
          location_x -= turn_index
          location_y += turn_index
        else
          direction = "Down"
          quadrant = "SW"
          location_x -= turn_index
          location_y -= turn_index
        end 

      when "Right"
        if ship.location_x == move.pos_x && ship.location_y == move.pos_y
          direction = "Left"
          location_x += turn_index * 2
          turnPossible = true
        elsif move.pos_y < ship.location_y
          direction = "Up"
          quadrant = "NE"
          location_x += turn_index
          location_y += turn_index
        else
          direction = "Down"
          quadrant = "SE"
          location_x += turn_index
          location_y -= turn_index
        end
      end

      # Collision Detection
      dx = 0
      dy = 0
      case ship.direction
        when "Up"
          dy = -1
        when "Down"
          dy = 1
        when "Right"
          dx = 1
        when "Left"
          dx = -1
      end

      case quadrant
        when "NE"
          opposingQuadrant = "SW"
        when "NW"
          opposingQuadrant = "SE"
        when "SW"
          opposingQuadrant = "NE"
        when "SE"
          opposingQuadrant = "NW"
      end

      if(turnPossible)
      elsif(turn_index != 0)
        quad1 = turnQuadrantClear(ship.location_x + turn_index * dx, ship.location_y + turn_index * dy, ship.shiptype.size - turn_index, quadrant)
        quad2 = turnQuadrantClear(ship.location_x + turn_index * dx, ship.location_y + turn_index * dy, turn_index + 1, opposingQuadrant)
        turnPossible = quad1.size == 0 && quad2.size == 0

        if quad1.size != 0 || quad1.size != 0
          closestCollision(quad1 + quad2)
        end
      else
        quad = turnQuadrantClear(ship.location_x, ship.location_y, ship.shiptype.size, quadrant)
        turnPossible = quad.size == 0

        if quad.size != 0
          closestCollision(quad)
        end
      end

      if(turnPossible)
        ship.location_x = location_x
        ship.location_y = location_y
        ship.direction = direction
      end

    when "Radar"
      if ship.shiptype.name == "Radar Boat"
        ship.shiptype_id = Shiptype.find_by(:name => "Radar Boat Extended").id
      else
        ship.shiptype_id = Shiptype.find_by(:name => "Radar Boat").id
      end

    when "Repair"
      tmp = ship.health.reverse
      count=0
      tmp.split("").each do |i|
          if i=='0' || i=='1'
            tmp[count] = ship.shiptype.armor.to_s
            ship.health = tmp.reverse
            ship.save
            break
          end
          count+=1
      end
    end

    game.save
    move.save
    ship.save

    deleteDeadShips()
  end

  private

  def isUnsafe(x,y)
    isCoral(x,y) || isShip(x,y) || isMine(x,y)
  end

  def isCoral(x,y)
    x >= 10 && x < 20 && y >= 3 && y < 27 && game.coral[(y - 3)*10 + (x - 10)]=='1'
  end

  def isMine(x,y)
    mineIndex = y * 30 + x
    game.mines[mineIndex]=='1'
  end

  def mineInProx(x,y)
    if isMine(x+1,y)
      return {result: true, x: x+1, y: y}
    elsif isMine(x-1,y) 
      return {result: true, x: x-1, y: y}
    elsif isMine(x,y+1) 
      return {result: true, x: x, y: y+1}
    elsif isMine(x,y-1)
      return {result: true, x: x, y: y-1}
    else
      return {result: false, x: 0, y: 0}
    end
  end

  def movedToMine()
    delta = directionToDelta(ship.direction,1)

    # test = {result: true, x: 0, y: 0}

    mineHit = false
    blockX = ship.location_x
    blockY = ship.location_y
    for i in 0..ship.shiptype.size-1
      for j in 0..5
        check = mineInProx(blockX, blockY)
        # check = test
        if check[:result]==true
          detonateMine(check[:x],check[:y],i)
          mineHit = true
        else
          break
        end
      end
      blockX += delta[:x]
      blockY += delta[:y]
    end
    return mineHit
  end

  def detonateMine(x, y, ship_index)
    h = ship.health
    str = "";
    str += h;
    after_hit = 0;

    str[ship_index] = after_hit.to_s
    ship.health = str
    ship.save

    splashDamage(ship,ship_index)

    removeMine(x, y)
  end

  # Checks if this is a valid place to put a mine without detonation
  def wontDetonate(x,y)
    if isCoral(x,y) || isShip(x,y)
      return false
    elsif isCoral(x+1,y) || isShip(x+1,y)
      return false
    elsif isCoral(x-1,y) || isShip(x-1,y)
      return false
    elsif isCoral(x,y+1) || isShip(x,y+1)
      return false
    elsif isCoral(x,y-1) || isShip(x,y-1)
      return false
    else
      return true
    end
  end

  def getMineCollision(x,y)
    if isMine(x,y)
      removeMine(x,y)
      return :hit
    end
    return :miss
  end

  def closestCollision(collisions)
    smallestDist = 20
    if ship.direction == "Up" || ship.direction == "Down"
      for c in collisions
        puts "COLLISION: (#{c[:x]},#{c[:y]})"
        if (c[:x] - ship.location_x).abs < smallestDist
          closest = c
          smallestDist = (c[:x] - ship.location_x).abs
        end
      end
    else
      for c in collisions
        d = (c[:y] - ship.location_y).abs
        puts "COLLISION: (#{c[:x]},#{c[:y]})"
        puts "DISTANCE is: #{d}"
        if (c[:y] - ship.location_y).abs < smallestDist
          closest = c
          smallestDist = (c[:y] - ship.location_y).abs
        end
      end
    end

    if isMine(closest[:x], closest[:y]) && ship.shiptype.name != "Mine Layer"
      rotationMine(closest[:x], closest[:y])
      self.message = "Rotation stopped, mine detonated at: (#{closest[:x]},#{closest[:y]})"
      self.save
    else
      self.message = "Rotation stopped, collision at: (#{closest[:x]},#{closest[:y]})"
      self.save
    end
  end

  def rotationMine(x,y)
    sX = ship.location_x
    sY = ship.location_y
    l = ship.shiptype.size-1

    if ship.direction == "Up"
      if y > sY
        detonateMine(x,y,0)
      elsif y < sY - l
        detonateMine(x,y,l)
      else
        detonateMine(x,y,sY - y)
      end
    elsif ship.direction == "Down"
      if y < sY
        detonateMine(x,y,0)
      elsif y > sY + l
        detonateMine(x,y,l)
      else
        detonateMine(x,y,y - sY)
      end
    elsif ship.direction == "Left"
      if x > sX
        detonateMine(x,y,0)
      elsif x < sX - l
        detonateMine(x,y,l)
      else
        detonateMine(x,y,sX - x)
      end
    elsif ship.direction == "Right"
      if x < sX
        detonateMine(x,y,0)
      elsif x > sX - l
        detonateMine(x,y,l)
      else
        detonateMine(x,y,x - sX)
      end
    end
  end

  def turnQuadrantClear(x,y,length,quadrant)
    case quadrant
      when "NE"
        dx = -1
        dy = -1
      when "NW"
        dx = 1
        dy = -1
      when "SE"
        dx = -1
        dy = 1
      when "SW"
        dx = 1
        dy = 1
      end

    startX = x - (length-1) * dx
    startY = y

    collisions = Array.new
    isClear = true
    yOffset = 0
    firstIteration = true
    xLengthCutter = 0
    for i in yOffset..(length-1)
      currentY = startY + i * dy
      currentX = startX
      xOffset = 0
      for j in xOffset..(length-1-xLengthCutter)
        currentX = startX + j * dx

        mineCheck = mineInProx(currentX,currentY)
        if isUnsafe(currentX,currentY)
          point = {x: currentX, y: currentY}
          if !collisions.include? point
            collisions.push(point)
          end
        end
        if mineCheck[:result]
          point = {x: mineCheck[:x], y: mineCheck[:y]}
          if !collisions.include? point
            collisions.push(point)
          end
        end
      end

      if !firstIteration
        startX += dx
        xLengthCutter += 1
      end

      firstIteration = false
    end

    return collisions
  end

  def isShip(x,y)
    game.ships.each { |s|
      s.shiptype.size.times {|i|
        shipSq = directionToDelta(s.direction,i)
        if ship.id!=s.id && (s.location_x + shipSq[:x] == x && s.location_y + shipSq[:y] == y)
          return true;
        end
      }
    }
    return false;
  end

  def getShipCollision(x,y)
    game.ships.each { |s|
      s.shiptype.size.times {|i|
        shipSq = directionToDelta(s.direction,i)
        if s.location_x + shipSq[:x] == x && s.location_y + shipSq[:y] == y
          hitShip(s, i, ship.shiptype.cannon_damage)
          return :hit
        end
      }
    }
    return :miss
  end

  def getShipTorpColl(x,y)
    game.ships.each { |s|
      s.shiptype.size.times {|i|
        shipSq = directionToDelta(s.direction,i)
        if s.location_x + shipSq[:x] == x && s.location_y + shipSq[:y] == y
          torpedoShip(s, i)
          return :hit
        end
      }
    }
    return :miss
  end

  def getTorpedoCollision()
    delta = directionToDelta(ship.direction,1)

    startX = ship.location_x
    startY = ship.location_y

    startX += delta[:x] * ship.shiptype.size
    startY += delta[:y] * ship.shiptype.size
  
    for i in 0..9
      checkX = startX + delta[:x] * i
      checkY = startY + delta[:y] * i
      if isUnsafe(checkX,checkY)
        if isMine(checkX,checkY)
          removeMine(checkX,checkY)
          return {hit: :mine, x: checkX, y: checkY}
        elsif getShipTorpColl(checkX,checkY)==:hit     
          return {hit: :ship, x: checkX, y: checkY}
        else
          return {hit: :coral, x: checkX, y: checkY}
        end
      end
    end
    return {hit: :miss, x: 0, y: 0}
  end

  def hitShip(hit_ship, i, dmg)
    # Caching sucks
    h = hit_ship.health
    str = "";
    str += h;
    after_hit = h[i].to_i - dmg;
    if after_hit < 0
      after_hit = 0
    end
    str[i] = after_hit.to_s
    hit_ship.health = str
    hit_ship.save
  end

  def torpedoShip(hit_ship, i)
    h = hit_ship.health
    str = "";
    str += h;
    after_hit = 0;

    str[i] = after_hit.to_s
    hit_ship.health = str
    hit_ship.save

    shot_dir = ship.direction
    splash = false
    if shot_dir == "Up" || shot_dir == "Down"
      if hit_ship.direction == "Left" || hit_ship.direction == "Right"
        splash = true
      end
    else
      if hit_ship.direction == "Up" || hit_ship.direction == "Down"
        splash = true
      end
    end

    if splash
      splashDamage(hit_ship,i)
    end
  end

  def splashDamage(hit_ship, i)
    # destroy 1 extra block towards bow of ship (or towards stern if no intact square towards bow exists)
    h = hit_ship.health
    str = "";
    str += h;
    after_hit = 0;

    if str.length == 1
      return
    elsif str.length-1 == i
      str[i-1] = after_hit.to_s
    elsif i==0
      str[i+1] = after_hit.to_s
    elsif str[i+1] == '0'
      str[i-1] = after_hit.to_s
    else
      str[i+1] = after_hit.to_s
    end

    hit_ship.health = str
    hit_ship.save
  end

  def removeMine(x,y)
    m = game.mines
    str = "";
    str += m;
    str[y * 30 + x] = '0'
    game.mines = str
  end

  def addMine(x,y)
    m = game.mines
    str = "";
    str += m;
    str[y * 30 + x] = '1'
    game.mines = str
  end

  def addToShip(delta)
    ship.shiptype.size.times { |i|
      shipSq = directionToDelta(ship.direction,i)
      x = ship.location_x + delta[:x] + shipSq[:x]
      y = ship.location_y + delta[:y] + shipSq[:y]
      if isUnsafe(x,y)
        self.message = "Collision at (#{x},#{y})";
        self.save
        return
      end
    }
    ship.location_x += delta[:x]
    ship.location_y += delta[:y]
  end

  def deltaToDirection(delta)
    dir = ""
    if delta[:x] == -1
      dir = "Left"
    elsif delta[:x] == 1
      dir = "Right"
    elsif delta[:y] == 1
      dir = "Down"
    elsif delta[:y] == -1
      dir = "Up"
    end
    dir
  end

  def shipToDelta(len)
    directionToDelta(ship.direction,len)
  end

  def directionToDelta(dir,len)
    dx = 0
    dy = 0
    case dir
    when "Up"
      dy = -len
    when "Left"
      dx = -len
    when "Down"
      dy = len
    when "Right"
      dx = len
    end

    {x: dx, y: dy}
  end

  def deleteDeadShips()
    game.ships.each { |s|
      # If the boat only has dead squares, destroy the boat
      if /^0*$/ =~ s.health
        s.destroy
      end
    }
  end
end
