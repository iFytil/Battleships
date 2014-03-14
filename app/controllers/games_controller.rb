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

  def coral
    game = Game.find(params[:id])
    p1 = current_user.id == game.player_1.id
    if game.player_1_coral and game.player_2_coral 
      redirect_to game_path(game.id)
    elsif game.player_1_coral
      if p1
        render :coralwait
      else
        @generate = false
        @coralstring = game.coral
      end
    elsif game.player_2_coral
      if p1
        @generate = false
        @coralstring = game.coral
      else
        render :coralwait
      end
    else
      if p1
        @generate = true
      else
        render :coralwaitturn
      end
    end
  end
  def coral_handle
    game = Game.find(params[:id])
    if game.player_1_coral.nil?
      game.player_1_coral = false
    end
    if game.player_2_coral.nil?
      game.player_2_coral = false
    end
    game.save!
    coral = params[:coralstring]
    p1 = current_user.id == game.player_1.id
    if game.player_1_coral and game.player_2_coral 
      redirect_to game_path(game.id)
    elsif game.player_1_coral
      if p1
        redirect_to game_start_path
      else
        if coral == game.coral
          game.player_2_coral = true
          game.save!
          redirect_to game_start_path
        else
          game.coral = coral
          game.player_1_coral = false
          game.save!
          redirect_to game_start_path
        end
      end
    elsif game.player_2_coral
      if p1
        if coral == game.coral
          game.player_1_coral = true
          game.save!
          redirect_to game_start_path
        else
          game.coral = coral
          game.player_2_coral = false
          game.save!
          redirect_to game_start_path
        end
      else
        redirect_to game_start_path
      end
    else
      if p1
        game.coral = coral
        game.player_1_coral = true
        game.save!
        redirect_to game_start_path
      else
        redirect_to game_start_path
      end
    end
  end
end
