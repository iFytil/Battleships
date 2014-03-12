class Move < ActiveRecord::Base

	validates_inclusion_of :type, :in => [ "Move", "Cannon", "Rotate" ]

	belongs_to :ship
	belongs_to :game
end
