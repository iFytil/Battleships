class Message < ActiveRecord::Base
  after_create :send_create_notifications

  private
    def send_create_notifications
      if Message.count > 25
        Message.first.destroy
      end
    end
end
