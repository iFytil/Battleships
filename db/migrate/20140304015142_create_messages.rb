class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :user_name
      t.text :msg_body
      t.timestamps
    end
  end
end
