class AddBasesToGames < ActiveRecord::Migration
  def change
  	add_column :games, :player_1_base, :string
  	add_column :games, :player_2_base, :string
  end
end
