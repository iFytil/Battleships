# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Shiptype.create(:radar_back => 1, :radar_w => 3, :radar_l => 10,:cannon_back => -5, :cannon_w => 11, :cannon_l => 15,:size => 5, :speed => 10, :armor => 2, :name => "Cruiser")
Shiptype.create(:radar_back => 1, :radar_w => 3, :radar_l => 8,:cannon_back => -4, :cannon_w => 9, :cannon_l => 12,:size => 4, :speed => 8, :armor => 1, :name => "Destroyer")
Shiptype.create(:radar_back => 1, :radar_w => 3, :radar_l => 6,:cannon_back => 0, :cannon_w => 5, :cannon_l => 5,:size => 3, :speed => 9, :armor => 1, :name => "Torpedo Boat")
Shiptype.create(:radar_back => -2, :radar_w => 5, :radar_l => 6,:cannon_back => -1, :cannon_w => 5, :cannon_l => 4,:size => 2, :speed => 6, :armor => 2, :name => "Mine Layer")
Shiptype.create(:radar_back => 1, :radar_w => 3, :radar_l => 6,:cannon_back => -1, :cannon_w => 3, :cannon_l => 5,:size => 3, :speed => 3, :armor => 1, :name => "Radar Boat")
