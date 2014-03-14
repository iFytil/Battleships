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
    end

    ship.save
  end

end
