class Move < ActiveRecord::Base

  validates_inclusion_of :kind, :in => [ "Move", "Cannon", "Rotate","Radar","Repair" ]

  belongs_to :ship
  belongs_to :game

  after_create do |move|

    move.game_id = ship.game_id

    case move.kind
    when "Cannon"
      result = getShipCollision(move.pos_x, move.pos_y)
      txt = "Cannon fired at (#{move.pos_x},#{move.pos_y}). "

      if result==:hit
        txt += "Ship hit!"
      elsif result==:miss
        txt += "Shot hit the water!"
      end

      move.message = txt

    when "Move"
      if ship.location_x == move.pos_x
        dy = move.pos_y - ship.location_y
        dy.abs.times {|i| addToShip({x: 0, y: dy/dy.abs})}
      end

      if ship.location_y == move.pos_y
        dx = move.pos_x - ship.location_x
        dx.abs.times {|i| addToShip({x: dx/dx.abs, y: 0})}
      end
      move.message = "No shots were fired"
    when "Rotate"
      turn_index = ship.shiptype.turn_index
      case ship.direction
      when "Up"
        if ship.location_x == move.pos_x && ship.location_y == move.pos_y
          ship.direction = "Down"
          ship.location_y -= turn_index * 2
        elsif move.pos_x < ship.location_x 
          ship.direction = "Left"
          ship.location_x += turn_index
          ship.location_y -= turn_index
        else
          ship.direction = "Right"
          ship.location_x -= turn_index
          ship.location_y -= turn_index
        end

      when "Down"
        if ship.location_x == move.pos_x && ship.location_y == move.pos_y
          ship.direction = "Up"
          ship.location_y += turn_index * 2
        elsif move.pos_x < ship.location_x 
          ship.direction = "Left"
          ship.location_x += turn_index
          ship.location_y += turn_index
        else
          ship.direction = "Right"
          ship.location_x -= turn_index
          ship.location_y += turn_index
        end

      when "Left"
        if ship.location_x == move.pos_x && ship.location_y == move.pos_y
          ship.direction = "Right"
          ship.location_x -= turn_index * 2
        elsif move.pos_y < ship.location_y
          ship.direction = "Up"
          ship.location_x -= turn_index
          ship.location_y += turn_index
        else
          ship.direction = "Down"
          ship.location_x -= turn_index
          ship.location_y -= turn_index
        end 

      when "Right"
        if ship.location_x == move.pos_x && ship.location_y == move.pos_y
          ship.direction = "Left"
          ship.location_x += turn_index * 2
        elsif move.pos_y < ship.location_y
          ship.direction = "Up"
          ship.location_x += turn_index
          ship.location_y += turn_index
        else
          ship.direction = "Down"
          ship.location_x += turn_index
          ship.location_y -= turn_index
        end
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

    move.save
    ship.save
  end

  private

  def isUnsafe(x,y)
    isCoral(x,y) || isShip(x,y)
  end

  def isCoral(x,y)
    x >= 10 && x < 20 && y >= 3 && y < 27 && game.coral[(y - 3)*10 + (x - 10)]=='1'
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

  def addToShip(delta)
    ship.shiptype.size.times { |i|
      shipSq = directionToDelta(ship.direction,i)
      if isUnsafe(ship.location_x + delta[:x] + shipSq[:x], ship.location_y + delta[:y] + shipSq[:y])
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

end
