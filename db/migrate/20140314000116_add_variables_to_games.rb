class AddVariablesToGames < ActiveRecord::Migration
  def change
    add_column :games, :player_1_ships, :boolean, :default => false
    add_column :games, :player_2_ships, :boolean, :default => false
    add_column :games, :player_1_coral, :boolean, :default => false
    add_column :games, :player_2_coral, :boolean, :default => false
  end
end
