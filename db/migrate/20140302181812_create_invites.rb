class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|
      t.belongs_to :sender, index: true
      t.belongs_to :receiver, index: true
      t.timestamps
    end
  end
end
