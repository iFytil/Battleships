class Game < ActiveRecord::Base
  validates_presence_of :player_1, :player_2
end
