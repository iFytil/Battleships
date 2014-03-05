class CreateShips < ActiveRecord::Migration
  def change
    create_table :ships do |t|
      t.belongs_to :shiptype, index: true
      t.timestamps
    end
  end
end
