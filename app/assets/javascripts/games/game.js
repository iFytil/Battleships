// Ship directions
var D = {
  Up: 0,
  Left: 1,
  Down: 2,
  Right: 3
};
// Ship rotations
var R = {
  CW: 0,
  CCW: 1
};

var Turn = {
  First: 1,
  Second: 2
}

Player = function(turn){
  
  // true - it is this player's turn
  var is_turn = false;
  
  // initial fleet
  this.fleet = new Fleet(turn);
  
  // current ship
  this.selected = 0; //index
  this.fleet.ships[this.selected].highlighted = true;
  
  this.changeTurn = function()
  {
    is_turn = !is_turn;
  }

  this.nextShip = function(delta)
  {
    var len = this.fleet.ships.length;
    this.fleet.ships[this.selected].highlighted = false;
    this.selected = (this.selected + delta + len)%len
    this.fleet.ships[this.selected].highlighted = true;
  }

  this.Ranges = function()
  {
    var r = new Array();
    for(var i=0;i<this.fleet.ships.length;i++){
      r.push(this.fleet.ships[i].radarzone);
    }
    return r;
  };
  
  this.Selected = function(){
	  return this.fleet.ships[this.selected];
  }
  
};

Game = function(ctx)
{

  // environment
  var env = new Environment(ctx);
  
  // 2 players
  this.players=new Array();
  this.players.push(new Player(Turn.First));
  this.players.push(new Player(Turn.Second));
  
  this.turn = 0;
  this.players[this.turn].changeTurn();
  
  // Visibility
  this.V = new Visibility(this.players[this.turn].Ranges());
  
  this.FinalizeMove=function()
  {
    // change turns
    this.players[this.turn].changeTurn();//remove turn
    if(this.turn==0) 
    {
      this.turn=1;
    }
    else 
    {
      this.turn=0;
    }
    this.players[this.turn].changeTurn();

    this.V.ranges = this.players[this.turn].Ranges();
    this.V.Set();
      
  };
  
  // moves a ship in a specified direction
  // restricts based on speed and damage
  this.Traverse = function(d){
	  
	  var s = this.players[this.turn].Selected();
	  
	if (d == D.Right) 
    {
      s.Right();
    } 
    else if (d == D.Left) 
    {
      s.Left();
    } 
    else if (d == D.Up) 
    {
      s.Up();
    } 
    else if (d == D.Down) 
    {
      s.Down();
    }
  }
  
  // rotates a ship in a specified direction
  // restricts based on turn speed
  this.Rotate = function(r){
	  
	var s = this.players[this.turn].Selected();
	  
	if (r == R.CW) 
    {
      s.CW();
    } 
    else if (r == R.CCW) 
    {
      s.CCW();
    } 
  }
  
  GetIndex = function(x,y)
  {
    
  };
  
  this.Process=function(x,y)
  {
    
  };
  
  this.NextShipUp = function()
  {
    this.players[this.turn].nextShip(1);
  };
  this.NextShipDown = function()
  {
    this.players[this.turn].nextShip(-1);
  };
  
  this.Display = function()
  {
    
    // environment
    env.Draw();
    
    // ships
    this.players[0].fleet.Draw(ctx,'#B80B0B');
    this.players[1].fleet.Draw(ctx,'#63A80A');
    
    // "cloud of invisibitily"
    //this.V.Draw(ctx,'grey');
  };
  
};
