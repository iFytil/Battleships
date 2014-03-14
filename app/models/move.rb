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
      ship.location_x = move.pos_x
      ship.location_y = move.pos_y
    when "Rotate"
      ship.direction = whereToRotate(move,ship)
    end

    ship.save
  end

  private

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

end
