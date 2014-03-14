class Move < ActiveRecord::Base

  validates_inclusion_of :kind, :in => [ "Move", "Cannon", "Rotate" ]

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
      d1 = shipToDelta(ship,ship.shiptype.turn_index)
      ship.direction = whereToRotate(move,ship)
      d2 = shipToDelta(ship,ship.shiptype.turn_index)
    end

    ship.save
  end

  private

  def isCoral(x,y)
    x >= 10 && x < 20 && y >= 3 && y < 27 && game.coral[(y - 3)*10 + (x - 10)]=='1'
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
    if !isCoral(ship.location_x + delta[:x], ship.location_y + delta[:y])
      ship.location_x += delta[:x]
      ship.location_y += delta[:y]
    end
  end

  def shipToDelta(ship,len)
    dx = 0
    dy = 0
    case ship.direction
    when "Up"
      dy = -len
    when "Left"
      dx = len
    when "Down"
      dy = len
    when "Right"
      dx = -len
    end

    {x: dx, y: dy}
  end

end
