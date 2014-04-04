class AddAmmoToShips < ActiveRecord::Migration
  def change
    add_column :ships, :ammo, :integer, :default => 5
  end

end
