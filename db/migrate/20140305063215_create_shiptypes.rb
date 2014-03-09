class CreateShiptypes < ActiveRecord::Migration
  def change
    create_table :shiptypes do |t|
      t.integer :size
      t.integer :speed
      t.integer :armor
      t.integer :radar_back
      t.integer :radar_w
      t.integer :radar_l
      t.integer :cannon_back
      t.integer :cannon_w
      t.integer :cannon_l
      t.string :name
    end
  end
end
