class MoveController < WebsocketRails::BaseController

  def handle_move
    send_message :move_response, {valid_json: is_valid_json(message)}
  end

  def handle_ship_request
    send_message :receive_ships, {ships: Game.find(message[:id]).ships.to_json(:include => :shiptype)}
  end

  private

  def is_valid_json(message)
    !(message[:ship_id].nil? || message[:pos_x].nil? || message[:pos_y].nil?)
  end

end