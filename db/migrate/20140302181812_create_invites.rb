class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|
      t.integer :sender
      t.integer :receiver
      t.timestamps
    end
  end
end
