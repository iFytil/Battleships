class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :username
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
