class MoveController < WebsocketRails::BaseController

  def handle_move
    send_message :move_response, {valid_json: is_valid_json(message)}
  end

  def handle_data_request
    game = Game.find(message[:id])
    send_message :receive_data, {ships: game.ships.to_json(:include => :shiptype), game: game.to_json(:include => :moves)}
  end

  private

  def is_valid_json(message)
    !(message[:ship_id].nil? || message[:pos_x].nil? || message[:pos_y].nil?)
  end

end