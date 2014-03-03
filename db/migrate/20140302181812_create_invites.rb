class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|
      t.integer :sender,   :null => false, :default => 0
      t.integer :receiver, :null => false, :default => 0
      t.timestamps
    end
  end
end
