class InvitesController < ApplicationController
  def new
    @invite = Invite.find_or_create_by(user_params)
    redirect_to request.referer
  end

  def destroy
    invite = Invite.find(params[:id])
    if params[:accept]
      Game.create(:player_1 => invite.sender, :player_2 => invite.receiver)
    end
    invite.destroy
    redirect_to request.referer
  end

  private

  def user_params
    params.permit(:sender, :receiver)
  end
end
