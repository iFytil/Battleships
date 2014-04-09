jQuery(function() {
  loadMouseEvents();
});

function loadMouseEvents() {
  // Inputs
  window.addEventListener('keydown', check, false);
  window.addEventListener("mousedown", click, false);
  window.addEventListener("mousemove", hover, false);

  function check(e) {
    var code = e.keyCode;
    switch (code) {
      case 39:  game.NextShipDown(); break; // Right key
      case 37:  game.NextShipUp(); break; // Left key
      default:  //Everything else
    }
  }
  function click(e) {
  
    var x = e.x-canvas.getBoundingClientRect().left;
    var y = e.y-canvas.getBoundingClientRect().top;

    // check if in grid or on sidebar
    if(x>0 && x<WIDTH && y>0 && y<WIDTH){
      var sq = game.env.getSquare();
      var shipid = game.players[pid].Selected().id
      var move = Abilities[game.movezone]

      // ship selection
      var i=0;
      var selfClick = false;
      game.players[pid].fleet.ships.forEach(function(s) {
        s.points.forEach(function(p){
          if(p.x == sq.x && p.y == sq.y){
            game.SelectShip(i); 
            game.movezone = -1;

            if(game.sidebar.selected>=0){
              game.sidebar.buttons[game.sidebar.selected].selected = false;
              game.sidebar.buttons[game.sidebar.selected].hover = false;
            }
            game.sidebar.selected = -1;
            game.sidebar.ClearButtons();
            selfClick = true;
          }

        });
        i++;
      });
      // move selection
      if (!move) {
        return
      }

      var validPoints = game.currentZone.GetPoints()
      var validMove = false
      for(var i = 0; i < validPoints.length; i++)
      {
          if(validPoints[i].x == sq.x && validPoints[i].y == sq.y) validMove = true
      }
      if(!(selfClick && (move == Abilities[2] || move == Abilities[3]))){
        console.debug("move: "+move+", valid?: "+validMove)
        if(validMove) request_move(shipid,sq.x,sq.y, move)
      }

    }
    else if(x>=WIDTH && x<WIDTH+BAR_WIDTH && y>0 && y<WIDTH){
      // on sidebar
      game.sidebar.Click(x,y);

      // actions that happen right after button push
      
    }
    
  }
  function hover(e) {
    var x = e.x-canvas.getBoundingClientRect().left;
    var y = e.y-canvas.getBoundingClientRect().top;
    // check if in grid or on sidebar
    if(x>0 && x<WIDTH && y>0 && y<WIDTH)
    {
      game.env.Hover(e.clientX, e.clientY);
    }
    else if(x>=WIDTH && x<WIDTH+BAR_WIDTH && y>0 && y<WIDTH)
    {
      game.sidebar.Hover(x,y);
    }
  }
}