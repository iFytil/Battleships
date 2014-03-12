class CreateMoves < ActiveRecord::Migration
  def change
    create_table :moves do |t|
      
      t.belongs_to :game, index: true
      t.belongs_to :ship, index: true
      t.integer :pos_x
      t.integer :pos_y
      t.string :kind

      t.timestamps
    end
  end
end
