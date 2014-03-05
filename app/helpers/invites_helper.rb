module InvitesHelper
  def invites_sent(id)
    Invite.where(sender_id: id)
  end

  def invites_received(id)
    Invite.where(receiver_id: id)
  end
end
