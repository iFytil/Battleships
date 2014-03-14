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

      if (!move) {
        return
      }

      var validPoints = game.currentZone.GetPoints()
      var validMove = false
      for(var i = 0; i < validPoints.length; i++)
      {
          if(validPoints[i].x == sq.x && validPoints[i].y == sq.y) validMove = true
      }

      if(validMove) request_move(shipid,sq.x,sq.y, move)

    }
    else if(x>=WIDTH && x<WIDTH+BAR_WIDTH && y>0 && y<WIDTH){
      // on sidebar
      game.sidebar.Click(x,y);
    }
    
  }
  function hover(e) {
    var x = e.x-canvas.getBoundingClientRect().left;
    var y = e.y-canvas.getBoundingClientRect().top;
    
    // check if in grid or on sidebar
    if(x>0 && x<WIDTH && y>0 && y<WIDTH)
    {
      game.env.Hover(e.clientX  ,e.clientY)
    }
    else if(x>=WIDTH && x<WIDTH+BAR_WIDTH && y>0 && y<WIDTH)
    {
      game.sidebar.Hover(x,y);
    }
  }
}