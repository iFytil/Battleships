class CreateShips < ActiveRecord::Migration
  def change
    create_table :ships do |t|
      t.belongs_to :shiptype, index: true
      t.belongs_to :game, index: true
      t.integer    :turn
      t.string     :direction
      t.integer    :location_x
      t.integer    :location_y
      t.timestamps
      t.string     :health
    end
  end
end
