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

  for (var i = 0; i < Object.keys(Abilities).length; i++) {
    this.buttons[i].name = Abilities[i];
    this.buttons[i].func = i;
  }


  // handle function
  this.Handle = function(f){

   // 
    for (var i = 0; i < Object.keys(Abilities).length; i++) {
      if(f==i && this.buttons[i].active) {
        if(this.selected!=i){
          this.game.movezone = i;
          this.game.UpdateZones();
          this.selected = i;
         this.ClearButtons();
          this.buttons[i].selected = true;
        }else{
          this.game.movezone = -1;
          this.selected = -1;
          this.buttons[i].selected = false;
          this.ClearButtons();
        }
      }
    }

    if(f==5 && this.buttons[5].active) {
      var shipid = game.players[pid].Selected().id
      var move = Abilities[5]
      request_move(shipid,0,0, move)
    }

  };
  
  this.ClearButtons = function(){  
    for(var i = 0;i<this.buttons.length;i++){
      this.buttons[i].selected = false;
    }
    //this.selected = -1;
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
    var ship = player.Selected();
    var t = ship.name; // currently selected ship's name
    var baseRadar = player.fleet.base.radarzone
    
    // all ships have move capabilities
    // all ships have rotation abilities
    // all ships have cannon abilities

    if(ship.speed >0)
      this.buttons[0].active = true;
    else
      this.buttons[0].active = false;

    this.buttons[1].active = true;
    this.buttons[2].active = true;
    this.buttons[3].active = false;
    this.buttons[4].active = false;
    this.buttons[5].active = false;
    this.buttons[6].active = false

    if(t == T.R || t == T.E){
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
    }

    // Repairs are only made if the ship is near the base
    if(isInBox(ship.points[0],baseRadar.pointTL,baseRadar.pointTR,baseRadar.pointBL) || isInBox(ship.points[ship.length-1],baseRadar.pointTL,baseRadar.pointTR,baseRadar.pointBL)){
      this.buttons[6].active = true;
    }
  }
  
  // Check if a point is in a box
  function isInBox(point, pointTL, pointTR, pointBL){  // pointTL = point top left, pointBR = point bottom right...
      // console.log(point+pointTL+pointTR+pointBL);
      if(point.x >= pointTL.x && point.x < pointTR.x && point.y < pointBL.y && point.y >= pointTL.y) {return true}
        else {return false}
  }

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

    var ability = game.movezone == -1 ? "None" : Abilities[game.movezone]

    ctx.fillText("Move: " + ability, WIDTH+BAR_WIDTH/2, 120);
    
    // buttons
    if(this.game.turn == pid){
      for (i = 0; i < this.buttons.length; i++) {
        this.buttons[i].Draw(ctx);
      }
    }

    ctx.restore();
    
    
  };


};
