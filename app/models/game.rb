class Game < ActiveRecord::Base
  include GamesHelper

  has_many :ships

  validates_presence_of :player_1, :player_2

  after_create do |game|
    game.coral = generateCoral
    game.save
  end
end
