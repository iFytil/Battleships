jQuery(function() {
  dispatch();
});

function dispatch() {
  dispatcher.on_open = function() {
    dispatcher.trigger('get_data', GAME_DATA)
  }

  dispatcher.bind('move_response', function(message) {
    if (message.valid) {
      // Reload ships
      console.log("Move occured")
      dispatcher.trigger('get_data', GAME_DATA)
    } else {
      // Error in our program. Do nothing
      console.log("ERROR: Invalid")
    }
  });

  dispatcher.bind('receive_data', function(message) {
    var newdata = JSON.parse(message.game);
    if (newdata.id == GAME_DATA.id) {
      SHIPS = JSON.parse(message.ships);
      GAME_DATA = newdata;
      game.textbar.Message(message.msg)
      game.reload();
    }
  });
}

function request_move(ship_id, x, y, kind) {
  dispatcher.trigger('send_move', {ship_id: ship_id, pos_x: x, pos_y: y, kind: kind})
}