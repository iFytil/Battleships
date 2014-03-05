class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer  :player_1
      t.integer  :player_2
      t.integer  :moves_made, :null => false, :default => 0
      t.text     :coral
      t.timestamps
    end
  end
end
