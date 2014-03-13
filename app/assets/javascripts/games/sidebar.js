Button = function(x, y, w, h){
  
  this.name = "";
  
  var inactiveColour = 'grey';
  
  this.active = false;
  
  this.Activate = function(){
    this.active = !this.active;
  }
  
  this.Draw = function(ctx,colour){
    
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, w,h, 30);
    
    ctx.fillStyle = 'black';
    ctx.font = 'bold 12pt Calibri';
    ctx.fillText(this.name, x+w/2, y+15);
    
    if(this.active){
      
    }else{
      
    }
  }
  
}

Sidebar = function(ctx){
  
  // top left corner
  this.x = WIDTH;
  this.y = 0;
  
  this.ctx = ctx;
  
  this.buttons = new Array();
  
  var numButtons = 7;
  var spacing = 10;
  var infospace = 70;
  var bW = BAR_WIDTH-2*spacing;
  var bH = (WIDTH - infospace -numButtons*spacing)/numButtons;
  
  var x = this.x + spacing;
  var y = this.y + infospace ;
  for (i = 0; i < numButtons; i++) {
    this.buttons.push(new Button(x,y,bW,bH));
    y+=bH+spacing;
  }
  this.buttons[0].name = "Move";
  this.buttons[1].name = "Rotate";
  this.buttons[2].name = "Cannons";
  this.buttons[3].name = "Torpedos";
  this.buttons[4].name = "Mines";
  this.buttons[5].name = "Radar";
  this.buttons[6].name = "Repair";

  this.Draw = function(){
    
    ctx.save();
    
    this.ctx.fillStyle = '#00B25C';
    this.ctx.fillRect(WIDTH, 0, WIDTH+BAR_WIDTH, WIDTH);
    
    // title
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = 'bold 10pt Calibri';
    ctx.fillText('Available', WIDTH+BAR_WIDTH/2, 20);
    ctx.fillText('Moves', WIDTH+BAR_WIDTH/2, 40);
    
    // number of moves
    var s = ((pid === GAME_DATA.moves.length%2) ? "Your turn" : "Opponent turn")
    ctx.fillText("("+s+")", WIDTH+BAR_WIDTH/2, 60);
    
    // buttons
    for (i = 0; i < this.buttons.length; i++) {
      this.buttons[i].Draw(ctx,"orange");
    }

    ctx.restore();
    
    
  };
};
