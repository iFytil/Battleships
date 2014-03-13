class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.belongs_to :player_1, index: true
      t.belongs_to :player_2, index: true
      t.text     :coral
      t.timestamps
    end
  end
end
