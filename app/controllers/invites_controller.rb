class InvitesController < ApplicationController
  def new
    @invite = Invite.find_or_create_by(user_params)
    redirect_to request.referer
  end

  def destroy
    Invite.find(params[:id]).destroy
    puts params
    if params[:accept]
      puts "Create a new game"
    end
    redirect_to request.referer
  end

  private

  def user_params
    params.permit(:sender, :receiver)
  end
end
