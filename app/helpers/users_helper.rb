module UsersHelper
  def isGameGoingOn(id)
    Invite.find_by({sender: current_user.id, receiver: id}) or Invite.find_by({sender: id, receiver: current_user.id})
  end
end
