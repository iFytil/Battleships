class Invite < ActiveRecord::Base
  validates_presence_of :sender, :receiver
end
