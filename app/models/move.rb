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
      # ship.direction = whereToRotate(move,ship)

      # if ship.shiptype.turn_index != 0

      # end
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
    end

    ship.save
  end

  private

  def isCoral(x,y)
    x >= 10 && x < 20 && y >= 3 && y < 27 && game.coral[(y - 3)*10 + (x - 10)]=='1'
  end

  # def whereToRotate(move,ship)
  #   case ship.direction
  #   when "Up"
  #     if ship.location_x == move.pos_x && ship.location_y == move.pos_y
  #       "Down"
  #     elsif move.pos_x < ship.location_x 
  #       "Left"
  #     else
  #       "Right"
  #     end

  #   when "Down"
  #     if ship.location_x == move.pos_x && ship.location_y == move.pos_y
  #       "Up"
  #     elsif move.pos_x < ship.location_x 
  #       "Left"
  #     else
  #       "Right"
  #     end

  #   when "Left"
  #     if ship.location_x == move.pos_x && ship.location_y == move.pos_y
  #       "Right"
  #     elsif move.pos_y < ship.location_y
  #       "Up"
  #     else
  #       "Down"
  #     end 

  #   when "Right"
  #     if ship.location_x == move.pos_x && ship.location_y == move.pos_y
  #       "Left"
  #     elsif move.pos_y < ship.location_y
  #       "Up"
  #     else
  #       "Down"
  #     end
  #   end
  # end

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
