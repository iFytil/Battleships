class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :player

  after_create do |user|

  	player = Player.create(user_id: user.id, username: user.email.split("@")[0])

    user.player_id = player.id
    user.save
  end
         
end
