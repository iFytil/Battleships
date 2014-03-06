// Ship directions
var D = {
  Up: 0,
  Left: 1,
  Down: 2,
  Right: 3
};

var Turn = {
  First: 1,
  Second: 2
}

var ShipType = {
  1: Cruiser,
  2: Destroyer,
  3: TorpedoBoat,
  4: MineLayer,
  5: RadarBoat
}

Player = function(turn){
  
  // true - it is this player's turn
  var is_turn = false;
  
  // initial fleet
  this.fleet = new Fleet(turn);
  
  // current ship
  this.selected = 0; //index
  this.fleet.ships[this.selected].highlighted = true;
  
  this.Turn = function()
  {
    is_turn = !is_turn;
  }

  this.NextShipUp = function()
  {
    this.fleet.ships[this.selected].highlighted = false;
    this.selected++;
    if (this.selected>=this.fleet.ships.length)
    {
      this.selected = 0; 
    }
    this.fleet.ships[this.selected].highlighted = true;
  }

  this.NextShipDown = function()
  {
    this.fleet.ships[this.selected].highlighted = false;
    this.selected--;
    if (this.selected<0) 
    {
      this.selected = this.fleet.ships.length-1;
    }
    this.fleet.ships[this.selected].highlighted = true;
  }

  this.Ranges = function()
  {
    var r = new Array();
    for(var i=0;i<this.fleet.ships.length;i++){
      r.push(this.fleet.ships[i].radar);
    }
    return r;
  };
  
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
  this.players[this.turn].Turn();
  
  // Visibility
  this.V = new Visibility(this.players[this.turn].Ranges());
  
  this.FinalizeMove=function()
  {
    // change turns
    this.players[this.turn].Turn();//remove turn
    if(this.turn==0) 
    {
      this.turn=1;
    }
    else 
    {
      this.turn=0;
    }
    this.players[this.turn].Turn();

    this.V.ranges = this.players[this.turn].Ranges();
    this.V.Set();
      
  };
  
  GetIndex = function(x,y)
  {
    
  };
  
  this.Process=function(x,y)
  {
    
  };
  
  this.NextShipUp = function()
  {
    this.players[this.turn].NextShipUp();
  };
  this.NextShipDown = function()
  {
    this.players[this.turn].NextShipDown();
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
