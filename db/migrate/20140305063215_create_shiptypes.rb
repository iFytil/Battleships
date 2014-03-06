class CreateShiptypes < ActiveRecord::Migration
  def change
    create_table :shiptypes do |t|
      t.integer :size
      t.integer :speed
      t.integer :armor
      t.string :name
    end
  end
end
