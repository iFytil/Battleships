jQuery(function() {
  dispatch();
});

function dispatch() {
  dispatcher.on_open = function() {
    dispatcher.trigger('get_data', GAME_DATA)
  }

  // This is how you send a move
  //dispatcher.trigger('send_move', {ship_id: 5, pos_x: 7, pos_y: 15, type: "cannon"})

  dispatcher.bind('move_response', function(message) {
    if (message.valid_json) {
      // Reload ships
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