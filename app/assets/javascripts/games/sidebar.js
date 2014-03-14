Button = function(x, y, w, h,bar){
  
  this.name = "";
  this.func = -1;
  this.x = x;
  this.y =y;
  
  var activeColour = '#66A3D2';
  var inactiveColour = '#24262A';
  var hoverColour = '#ff7f50';
  var selectedColour = 'white';
  
  this.active = false;
  this.selected = false;
  this.hover = false;
  
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
      this.hover = true;
      return true;
    }else{
      this.hover = false;
      return false;
    }
  
  }
  
  this.Draw = function(ctx){
      
    if(this.active){
      if(this.selected)
        ctx.fillStyle = selectedColour;
      else if(this.hover)
        ctx.fillStyle = hoverColour;
      else
        ctx.fillStyle = activeColour;
    }else
      ctx.fillStyle = inactiveColour;
  
    ctx.fillRect(this.x, this.y, w,h, 30);
    
    ctx.fillStyle = 'black';
    ctx.font = 'bold 12pt Calibri';
    ctx.fillText(this.name, this.x+w/2, this.y+15);
    
  }
  
}

Sidebar = function(ctx,game){
  
  // top left corner
  this.x = WIDTH;
  this.y = 0;
  
  this.ctx = ctx;
  this.game = game;
  
  // index of selected button
  this.selected = -1;
  
  // list of buttons
  this.buttons = new Array();
  
  var numButtons = 7;
  var spacing = 10;
  var infospace = 130;
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
   this.ClearButtons();
    
   if(f==0 && this.buttons[0].active){
     
      if(this.selected!=0){
        this.game.TranslateOptions();
        this.selected = 0;
        this.buttons[0].selected = true;
      }else{
        this.game.NoOptions();
        this.selected = -1;
      }
        
    }else if(f==1 && this.buttons[1].active){
      if(this.selected!=1){
        this.game.RotateOptions();
        this.selected = 1;
        this.buttons[1].selected = true;
      }else{
        this.game.NoOptions();
        this.selected = -1;
      }
    }else if(f==2 && this.buttons[2].active){
      if(this.selected!=2){
        this.game.CannonOptions();
        this.selected = 2;
        this.buttons[2].selected = true;
      }else{
        this.game.NoOptions();
        this.selected = -1;
      }
    }else if(f==3 && this.buttons[3].active){
      if(this.selected!=3){
        this.game.TorpedoOptions();
        this.selected = 3;
        this.buttons[3].selected = true;
      }else{
        this.game.NoOptions();
        this.selected = -1;
      }
    }else if(f==4 && this.buttons[4].active){
      if(this.selected!=4){
        this.game.MineOptions();
        this.selected = 4;
        this.buttons[4].selected = true;
      }else{
        this.game.NoOptions();
        this.selected = -1;
      }
    }else if(f==5 && this.buttons[5].active){
      if(this.selected!=5){
        this.game.DisplayRadarOptions();
        this.selected = 5;
        this.buttons[5].selected = true;
      }else{
        this.game.NoOptions();
        this.selected = -1;
      }
    }else if(f==6 && this.buttons[6].active){
      if(this.selected!=6){
        this.game.DisplayHealingOptions();
        this.selected = 6;
        this.buttons[6].selected = true;
      }else{
        this.game.NoOptions();
        this.selected = -1;
      }
     }
    /* if(this.selcted>0){
      this.buttons[this.selcted].selected = true;
    }*/
  };
    this.ClearButtons = function(){
      
 for(var i = 0;i<this.buttons.length;i++){
      this.buttons[i].selected = false;
    }
    
  }

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
  
  this.RegisterShipChange = function(){
    var player = this.game.players[pid]; // currently player
    var t = player.Selected().name; // currently selected ship's name
    var base = player.fleet.base
    
    
    
    // all ships have move capabilities
    // all ships have rotation abilities
    // all ships have cannon abilities
    this.buttons[0].active = true;
    this.buttons[1].active = true;
    this.buttons[2].active = true;
    this.buttons[3].active = false;
    this.buttons[4].active = false;
    this.buttons[5].active = false;
    this.buttons[6].active = false;
    
    if(t == T.R){
      // only radar boats can change their ranges
      this.buttons[5].active = true;
    }else if(t == T.M){
      // only mine layers can drip/pick up mines
      this.buttons[4].active = true;
    }else if(t == T.T){
      // torpedo boats have torpedos
      this.buttons[3].active = true;
    }else if(t == T.D){
      // destroyers have torpedos
      this.buttons[3].active = true;
    }else if(false){
      // repairs can only be made if
    // this.buttons[6].active = true;
    
    }
  }
  
  // function isByBase(ship, base){
      
  // }

  this.Draw = function(){
    
    ctx.save();
    
    this.ctx.fillStyle = '#254055';
    this.ctx.fillRect(WIDTH, 0, WIDTH+BAR_WIDTH, WIDTH);
    
    // title
    ctx.fillStyle = '#66A3D2';
    ctx.textAlign = 'center';
    ctx.font = 'bold 9pt Calibri';
    ctx.fillText('Available', WIDTH+BAR_WIDTH/2, 20);
    ctx.fillText('Moves', WIDTH+BAR_WIDTH/2, 40);
    
    var s = ((pid === GAME_DATA.moves.length%2) ? "Your turn" : "Opponent turn")
    ctx.fillText("("+s+")", WIDTH+BAR_WIDTH/2, 60);

    var sq = game.env.getSquare();
    if (sq==null) {sq="--"}
    ctx.fillText("Square: " + sq.toString(), WIDTH+BAR_WIDTH/2, 80);

    ctx.fillText("Ship: " + game.players[pid].Selected().name, WIDTH+BAR_WIDTH/2, 100);

    ctx.fillText("Move: " + game.movezone, WIDTH+BAR_WIDTH/2, 120);
    
    // buttons
    for (i = 0; i < this.buttons.length; i++) {
      this.buttons[i].Draw(ctx,"orange");
    }

    ctx.restore();
    
    
  };


};
