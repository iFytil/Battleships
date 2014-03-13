Button = function(x, y, w, h,bar){
  
  this.name = "";
  this.func = -1;
  this.x = x;
  this.y =y;
  
  var activeColour = 'red';
  var inactiveColour = 'grey';
  var hoverColour = 'pink';
  this.colour = activeColour;
  
  this.active = false;
  
  this.Activate = function(){
    this.active = !this.active;
  }
  
  // this is the function that will be called when this button 
  //is pressed
  this.Press = function(){   
    bar.Handle(this.func);
    };
  
  this.Click = function(x,y){
    if(x>this.x && x<this.x+w && y>this.y && y<this.y+h){
      this.Press();
      return true;
    }else{
      return false;
    }
  }
  this.Hover = function(x,y){
    if(x>this.x && x<this.x+w && y>this.y && y<this.y+h){
      this.colour = hoverColour;
      return true;
    }else{
      this.colour = activeColour;
      return false;
    }
  }
  
  this.Draw = function(ctx){
    
    ctx.fillStyle = this.colour;
    ctx.fillRect(this.x, this.y, w,h, 30);
    
    ctx.fillStyle = 'black';
    ctx.font = 'bold 12pt Calibri';
    ctx.fillText(this.name, this.x+w/2, this.y+15);
    
    if(this.active){
      
    }else{
      
    }
  }
  
}

Sidebar = function(ctx,game){
  
  // top left corner
  this.x = WIDTH;
  this.y = 0;
  
  this.ctx = ctx;
  this.game = game;
  
  this.buttons = new Array();
  
  var numButtons = 7;
  var spacing = 10;
  var infospace = 70;
  var bW = BAR_WIDTH-2*spacing;
  var bH = (WIDTH - infospace -numButtons*spacing)/numButtons;
  
  var x = this.x + spacing;
  var y = this.y + infospace ;
  for (i = 0; i < numButtons; i++) {
    this.buttons.push(new Button(x,y,bW,bH,this));
    y+=bH+spacing;
  }
  this.buttons[0].name = "Move";
  this.buttons[1].name = "Rotate";
  this.buttons[2].name = "Cannons";
  this.buttons[3].name = "Torpedos";
  this.buttons[4].name = "Mines";
  this.buttons[5].name = "Radar";
  this.buttons[6].name = "Repair";
  this.buttons[0].func  = 0;
  this.buttons[1].func  = 1;
  this.buttons[2].func  = 2;
  this.buttons[3].func  = 3;
  this.buttons[4].func  = 4;
  this.buttons[5].func  = 5;
  this.buttons[6].func  = 6;

  // handle function
  this.Handle = function(f){
    if(f==0)
      this.game.MoveOptions();
    if(f==1)
      this.game.RotateOptions();
    if(f==2)
      this.game.CannonOptions();
    if(f==3)
      this.game.TorpedoOptions();
    if(f==4)
      this.game.MineOptions();
   /* if(f==5)
      this.game.DisplayMovements();
    if(f==6)
      this.game.DisplayMovements();*/
  };
     
 

  this.Hover = function(x,y){
    // if true, break
     for (i = 0; i < this.buttons.length; i++) {
      if(this.buttons[i].Hover(x,y))
          break;
    }
  }
  this.Click = function(x,y){
    // if true, break
     for (i = 0; i < this.buttons.length; i++) {
      if(this.buttons[i].Click(x,y))
          break;
    }
  }
  
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
