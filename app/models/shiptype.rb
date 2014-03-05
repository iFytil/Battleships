class Shiptype < ActiveRecord::Base
  validates_presence_of :size, :speed, :armor, :name
end
