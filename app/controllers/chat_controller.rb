class ChatController < WebsocketRails::BaseController
  include ActionView::Helpers::SanitizeHelper

  def initialize_session
  end
  
  def system_msg(ev, msg)
    broadcast_message ev, { 
      user_name: 'system', 
      received: Time.now.utc.to_s(:short), 
      msg_body: msg
    }
  end
  
  def user_msg(ev, msg)
    broadcast_message ev, { 
      user_name:  connection_store[:user][:user_name], 
      received:   Time.now.utc.to_s(:short), 
      msg_body:   ERB::Util.html_escape(msg) 
      }
  end
  
  def client_connected
    #clientName = current_user.name
    #system_msg :new_message, "#{clientName} #{client_id} connected"
  end

  def send_message
    Message.create(message)
    user_msg :new_message, message[:msg_body].dup
  end
  
  def new_user
    connection_store[:user] = { user_name: sanitize(message[:user_name]) }
    broadcast_user_list
  end
  
  def client_disconnected
    connection_store[:user] = nil
    #system_msg :new_message, "client #{client_id} disconnected"
    broadcast_user_list
  end
  
  def broadcast_user_list
    users = connection_store.collect_all(:user)
    broadcast_message :user_list, users
  end
  
end