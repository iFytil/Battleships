class Shiptype < ActiveRecord::Base
    validates_presence_of :size, :speed, :turn_speed, :turn_index, :armor, :name, :radar_back, :radar_w, :radar_l, :cannon_back, :cannon_w, :cannon_l
end
