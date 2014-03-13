// Ship directions
var D = {
  Up: 0,
  Left: 1,
  Down: 2,
  Right: 3
};

var Turn = {
  First: 0,
  Second: 1
}

Player = function(turn){
  
  // true - it is this player's turn
  var is_turn = false;

  this.turn = turn;
  
  // initial fleet
  this.fleet = new Fleet(this.turn);

  // current ship
  this.selected = 0; //index
  if (this.fleet.ships[this.selected])
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
  this.env = new Environment(ctx);
  
  // sidebar
  this.sidebar = new Sidebar(ctx);
  
  // 2 players
  this.players=new Array();
  this.players.push(new Player(Turn.First));
  this.players.push(new Player(Turn.Second));
  
  this.turn = 0;
  this.players[this.turn].changeTurn();
  
  // Visibility
  this.V = new Visibility(this.players[this.turn].Ranges());
  
  
  this.NextShipUp = function()
  {
    this.players[pid].nextShip(1);
  };
  this.NextShipDown = function()
  {
    this.players[pid].nextShip(-1);
  };
  
  this.Display = function()
  {
    this.env.draw();

    // ships
    this.players[0].fleet.Draw(ctx,'#B80B0B');
    this.players[1].fleet.Draw(ctx,'#63A80A');
    
    // "cloud of invisibitily"
    //this.V.Draw(ctx,'grey');
    
    // sidebar
    this.sidebar.Draw();
  };

  this.reload = function()
  {
    // 2 players
    this.players=new Array();
    this.players.push(new Player(Turn.First));
    this.players.push(new Player(Turn.Second));

    this.turn = GAME_DATA.moves.length%2
    this.players[this.turn].changeTurn();

    // Visibility
    this.V = new Visibility(this.players[pid].Ranges());
  }

  this.reload();
  
  // forward, backward, up, down
  this.MoveOptions = function(){
    
    };
  this.RotateOptions = function(){
    
    };
  this.CannonOptions = function(){
    
    };
  this.TorpedoOptions = function(){
    
    };
  this.MineOptions = function(){
    
    };
  
};
