class UsersController < ApplicationController
  def list
    @users = User.where("id <> ?", current_user.id)
  end

  def show
    @user = User.find(params[:id])
  end
end
