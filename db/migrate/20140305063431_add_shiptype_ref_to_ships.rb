class AddShiptypeRefToShips < ActiveRecord::Migration
  def change
    add_reference :ships, :shiptype, index: true
  end
end
