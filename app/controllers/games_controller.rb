class GamesController < ApplicationController
  def show
    @game = Game.find(params[:id])
  end

  def list
    @games = Game.where("player_1_id = ? OR player_2_id = ?", current_user.id, current_user.id)
  end

  def start
    @id = params[:id]
    game = Game.find(@id)
    if game.player_1.id == current_user.id
      if game.player_1_ships
        redirect_to game_coral_path
      end
    else
      if game.player_2_ships
        redirect_to game_coral_path
      end
    end
  end

  def shiporder
    game = Game.find(params[:id])
    direction = current_user.id == game.player_1.id ? "Right" : "Left"
    x = current_user.id == game.player_1.id ? 1 : 28
    turn = current_user.id == game.player_1.id ? 0 : 1
    shiplist = params[:shiporder]
    shiporder = []
    shiplist.split(",").each {|ship| shiporder << ship}
    shiporder.each_with_index do |ship,index|
      Ship.create!(:shiptype => Shiptype.find_by_name(ship), :location_x => x, :location_y => index+10, :game => game, :turn => turn, :direction => direction)
    end

    if game.player_1.id == current_user.id
      game.player_1_ships = true
      game.save!
    else
      game.player_2_ships = true
      game.save!
    end

    redirect_to game_coral_path
  end
end
