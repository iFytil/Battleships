module InvitesHelper
  def invites_sent(id)
    Invite.where(sender: id)
  end

  def invites_received(id)
    Invite.where(receiver: id)
  end
end
