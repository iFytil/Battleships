jQuery(function() {
  dispatch();
});

function dispatch() {
  dispatcher.on_open = function() {
    dispatcher.trigger('get_data', GAME_DATA)
  }

  dispatcher.bind('move_response', function(message) {
    if (message.valid_json) {
      // Reload ships
      console.log("Move occured")
      dispatcher.trigger('get_data', GAME_DATA)
    } else {
      // Error in our program. Do nothing
      console.log("ERROR: Invalid move format")
    }
  });

  dispatcher.bind('receive_data', function(message) {
    SHIPS = JSON.parse(message.ships);
    GAME_DATA = JSON.parse(message.game);
    game.reload();
  });
}

function request_move(ship_id, x, y, kind) {
  dispatcher.trigger('send_move', {ship_id: ship_id, pos_x: x, pos_y: y, kind: kind})
}