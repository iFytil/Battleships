class AddVariablesToGames < ActiveRecord::Migration
  def change
    add_column :games, :player_1_ships, :boolean, :inclusion => {:in => [true, false]}
    add_column :games, :player_2_ships, :boolean, :inclusion => {:in => [true, false]}
    add_column :games, :player_1_coral, :boolean, :inclusion => {:in => [true, false]}
    add_column :games, :player_2_coral, :boolean, :inclusion => {:in => [true, false]}
  end
end
