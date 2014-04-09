class Game < ActiveRecord::Base
  include GamesHelper

  validates_presence_of :player_1_id, :player_2_id

  has_many :ships
  has_many :moves

  belongs_to :player_1, :class_name => "User"
  belongs_to :player_2, :class_name => "User"

  after_create do |game|	
    game.mines = '0' * 900
    game.player_1_base = '1'*10
    game.player_2_base = '1'*10
    game.winner = -1
    game.save
  end

end
