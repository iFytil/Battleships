class GamesController < ApplicationController
  def show
    @game = Game.find(params[:id])
  end

  def list
    @games = Game.where("player_1_id = ? OR player_2_id = ?", current_user.id, current_user.id)
  end

  def shiporder
    game = Game.find(params[:id])
    turn = current_user == game.player1 ? "Left" : "Right"
    x = current_user == game.player1 ? 1 : 28
    turn = current_user == game.player1 ? 0 : 1
    shiplist = params[:shiporder]
    shiporder = []
    shiplist.split(",").each {|ship| shiporder << ship}
    shiporder.each_with_index do |ship,index|
      Ship.create(:shiptype => Shiptype.findByName(ship), :location_x => x, :location_y => index+10, :game => game, :turn => turn)
    end
  end
end
