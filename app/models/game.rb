class Game < ActiveRecord::Base
  include GamesHelper

  validates_presence_of :player_1, :player_2

  after_create do |game|
    game.coral = generateCoral
    game.save
  end
end
