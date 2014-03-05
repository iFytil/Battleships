module UsersHelper
  def isGameGoingOn(id)
    Invite.find_by({sender_id: current_user.id, receiver_id: id}) or Invite.find_by({sender_id: id, receiver_id: current_user.id})
  end
end
