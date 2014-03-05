class Ship < ActiveRecord::Base
  validates_presence_of :shiptype_id, :game_id
  belongs_to :shiptype
  belongs_to :game
end
