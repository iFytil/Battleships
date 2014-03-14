class Game < ActiveRecord::Base
  include GamesHelper

  validates_presence_of :player_1_id, :player_2_id, :player_1_coral, :player_2_coral, :player_1_ships, :player_2_ships

  has_many :ships
  has_many :moves

  belongs_to :player_1, :class_name => "User"
  belongs_to :player_2, :class_name => "User"

  after_create do |game|
    game.coral = generateCoral

    Ship.create(:shiptype_id => Shiptype.find_by(:name => "Cruiser").id, :game_id => game.id, 
                :direction => "Left", :turn => 0, :location_x => 12, :location_y => 14)

    Ship.create(:shiptype_id => Shiptype.find_by(:name => "Destroyer").id, :game_id => game.id, 
                :direction => "Right", :turn => 1, :location_x => 7, :location_y => 5)

    Ship.create(:shiptype_id => Shiptype.find_by(:name => "Radar Boat").id, :game_id => game.id, 
                :direction => "Up", :turn => 1, :location_x => 21, :location_y => 14)

    Ship.create(:shiptype_id => Shiptype.find_by(:name => "Torpedo Boat").id, :game_id => game.id, 
                :direction => "Down", :turn => 0, :location_x => 18, :location_y => 3)

    Ship.create(:shiptype_id => Shiptype.find_by(:name => "Mine Layer").id, :game_id => game.id, 
                :direction => "Left", :turn => 1, :location_x => 3, :location_y => 18)

    game.save
  end
end
