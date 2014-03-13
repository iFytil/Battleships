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
      case 13:  request_move(1,1,0, "Move"); break;
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
    }else if(x>=WIDTH && x<WIDTH+BAR_WIDTH && y>0 && y<WIDTH){
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