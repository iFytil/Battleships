# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Shiptype.create(:size => 5, :speed => 10, :armor => 2, :name => "Cruiser")
Shiptype.create(:size => 4, :speed => 8, :armor => 1, :name => "Destroyer")
Shiptype.create(:size => 3, :speed => 9, :armor => 1, :name => "Torpedo Boat")
Shiptype.create(:size => 2, :speed => 6, :armor => 2, :name => "Mine Layer")
Shiptype.create(:size => 3, :speed => 3, :armor => 1, :name => "Radar Boat")
