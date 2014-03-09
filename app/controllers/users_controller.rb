class UsersController < ApplicationController
  def index
    @users = User.where("id <> ?", current_user.id)
  end

  def show
    @user = User.find(params[:id])
  end

  def games
    @games = Game.where("player_1_id = ? OR player_2_id = ?", current_user.id, current_user.id)
  end
end
