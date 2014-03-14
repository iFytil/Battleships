class Move < ActiveRecord::Base

  validates_inclusion_of :kind, :in => [ "Move", "Cannon", "Rotate","Radar" ]

  belongs_to :ship
  belongs_to :game

  after_create do |move|

    move.game_id = ship.game_id
    move.save

    case move.kind
    when "Cannon"

    when "Move"
      if ship.location_x == move.pos_x
        dy = move.pos_y - ship.location_y
        dy.abs.times {|i| addToShip({x: 0, y: dy/dy.abs})}
      end

      if ship.location_y == move.pos_y
        dx = move.pos_x - ship.location_x
        dx.abs.times {|i| addToShip({x: dx/dx.abs, y: 0})}
      end

    when "Rotate"
      d1 = shipToDelta(ship.shiptype.turn_index)
      ship.direction = whereToRotate(move,ship)
      d2 = shipToDelta(ship,ship.shiptype.turn_index)
    

    when "Radar"
      if ship.shiptype.name == "Radar Boat"
        ship.shiptype_id = Shiptype.find_by(:name => "Radar Boat Extended").id
      else
        ship.shiptype_id = Shiptype.find_by(:name => "Radar Boat").id
      end
    end

    ship.save
  end

  private

  def isCoral(x,y)
    isit = x >= 10 && x < 20 && y >= 3 && y < 27 && game.coral[(y - 3)*10 + (x - 10)]=='1'
  end

  def whereToRotate(move,ship)
    if ship.location_x == move.pos_x
      if ship.location_y > move.pos_y
        "Up"
      else
        "Down"
      end
    else
      if ship.location_x > move.pos_x
        "Left"
      else
        "Right"
      end
    end
  end

  def addToShip(delta)
    ship.shiptype.size.times { |i|
      shipSq = directionToDelta(ship.direction,i)
      if isCoral(ship.location_x + delta[:x] + shipSq[:x], ship.location_y + delta[:y] + shipSq[:y])
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
