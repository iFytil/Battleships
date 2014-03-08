class InvitesController < ApplicationController
  def new
    @invite = Invite.find_or_create_by(user_params)
    redirect_to request.referer
  end

  def destroy
    invite = Invite.find(params[:id])
    if params[:accept]
      Game.create(:player_1_id => invite.sender_id, :player_2_id => invite.receiver_id)
    end
    invite.destroy
    redirect_to request.referer
  end

  def list
    @myinvites = Invite.where(:receiver => current_user)
    @sentinvites = Invite.where(:sender  => current_user)
  end

  private

  def user_params
    params.permit(:sender_id, :receiver_id)
  end
end
