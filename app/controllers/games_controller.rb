class GamesController < ApplicationController
  def show
  	@game = Game.find(params[:id])
  end

  def list
    @games = Game.where("player_1_id = ? OR player_2_id = ?", current_user.id, current_user.id)
  end
end
