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

// displayed movezones
var Z = {
  None: -1,
  Translate: 0,
  Rotate: 1,
  Cannon: 2,
  Torpedo: 3,
  Mine: 4,
  Radar: 5,
  Heal: 6
}

var T = {
  R:"Radar Boat",
  M:"Mine Layer",
  T:"Torpedo Boat",
  D:"Destroyer",
  C:"Cruiser"
}

Player = function(turn){
  // initial fleet
  this.fleet = new Fleet(turn);

  // current ship
  this.selected = 0; //index
  if (this.fleet.ships[this.selected])
    this.fleet.ships[this.selected].highlighted = true;

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
    r.push(this.fleet.base.radarzone);
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
  this.sidebar = new Sidebar(ctx,this);
  
  // currently displayed zones
  this.movezone = Z.None;
  
  // 2 players
  this.players=new Array();
  this.players.push(new Player(Turn.First));
  this.players.push(new Player(Turn.Second));
  
  this.turn = 0;
  
  this.NextShipUp = function()
  {
    this.players[pid].nextShip(1);
    this.sidebar.RegisterShipChange();
    this.movezone = Z.None;
  };
  this.NextShipDown = function()
  {
    this.players[pid].nextShip(-1);
    this.sidebar.RegisterShipChange();
    this.movezone = Z.None;
  };
  
  this.CurrentPlayer =function(){
      return this.players[pid].Selected();
  };
  
  this.Display = function()
  {
    this.env.draw();

    // ships
    this.players[0].fleet.Draw(ctx,'#B80B0B');
    this.players[1].fleet.Draw(ctx,'#63A80A');
    
    // "cloud of invisibitily"
    //this.V.Draw(ctx,'grey');
    
    // zones
    if(this.movezone == Z.None){
        // do nothing
    }else if(this.movezone == Z.Translate){
        // DrawTranslationZone(this.players[this.turn].Selected(), ctx);
    } else if(this.movezone ==Z.Rotate){
        // DrawRotationZone(this.players[this.turn].Selected(), ctx);
    }else if(this.movezone == Z.Cannon){
        this.players[pid].Selected().cannonzone.Draw(ctx,"rgb(0,0,255)");
    }else if(this.movezone == Z.Torpedo){
        this.players[pid].Selected().torpedozone.Draw(ctx,"rgb(0,0,255)");
    }else if(this.movezone ==Z.Mine){
    };
    
    // sidebar
    game.sidebar.RegisterShipChange();
    this.sidebar.Draw();
    
   
  };

  this.reload = function()
  {
    // 2 players
    this.players=new Array();
    this.players.push(new Player(Turn.First));
    this.players.push(new Player(Turn.Second));

    this.turn = GAME_DATA.moves.length%2

    // Visibility
    this.V = new Visibility(this.players[pid].Ranges());

  }

  this.reload();
  
  // forward, backward, up, down
  this.TranslateOptions = function(){
    this.movezone = Z.Translate;
    };
  this.RotateOptions = function(){
    this.movezone = Z.Rotate;
    };
  this.CannonOptions = function(){
    this.movezone = Z.Cannon;
    };
  this.TorpedoOptions = function(){
    this.movezone = Z.Torpedo;
    };
  this.MineOptions = function(){
    this.movezone = Z.Mine;
    };
  this.DisplayRadarOptions = function(){
    this.movezone = Z.Radar;
    };
  this.DisplayHealingOptions = function(){
    this.movezone = Z.Heal;
    };
    
  
  
};
