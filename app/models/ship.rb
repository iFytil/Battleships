class Ship < ActiveRecord::Base
  validates_presence_of :shiptype_id, :game_id, :direction, :turn, :location_x, :location_y
  validates_inclusion_of :direction, :in => [ "Up", "Left", "Down", "Right" ]
  validates_inclusion_of :turn, :in => [ 0, 1 ]
  
  belongs_to :shiptype
  belongs_to :game
  has_many   :moves

  after_create do |ship|	
    ship.health = ship.shiptype.armor.to_s * ship.shiptype.size

    ship.save
  end
end
