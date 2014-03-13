class MoveController < WebsocketRails::BaseController

  def handle_move

    is_valid = is_valid_json(message) && is_valid_turn(message)
    puts is_valid_turn(message)

    if is_valid
      move = Move.create(message)
    end

    send_message :move_response, {valid: is_valid}
  end

  def handle_data_request
    game = Game.find(message[:id])
    send_message :receive_data, {ships: game.ships.to_json(:include => :shiptype), game: game.to_json(:include => :moves)}
  end

  private

  def is_valid_json(message)
    !(message[:ship_id].nil? || message[:pos_x].nil? || message[:pos_y].nil?)
  end

  def is_valid_turn(message)
    ship = Ship.find(message[:ship_id])
    ship.turn == ship.game.moves.length%2
  end

end