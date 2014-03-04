module ChatHelper
  def find_old_msgs
    oldmsgs = Array.new
    Message.all.each do |message|
      oldmsgs.push ({
        :user_name => message.user_name,
        :received => message.created_at.to_s(:short),
        :msg_body => message.msg_body
      })
    end
    oldmsgs
  end

  def max_chat_msgs
    25
  end
end
