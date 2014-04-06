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
  Repair: 6
}

//Ship
var S = {
  C: 0,
  D: 1,
  T: 2,
  R: 3,
  M: 4,
  K: 5
}
//colour
var C = {
  G: 1,
  B: 0
}

var Abilities = ["Move", "Rotate", "Cannon", "Torpedo", "Mine", "Radar", "Repair"]

var T = {
  R:"Radar Boat",
  M:"Mine Layer",
  T:"Torpedo Boat",
  D:"Destroyer",
  C:"Cruiser",
  E:"Radar Boat Extended",
  K:"Kamikaze Boat"

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


    game.sidebar.RegisterShipChange();
    game.sidebar.ClearButtons();
    game.movezone = Z.None;
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
  
  // ship images
  this.shipdisplay = new ShipDisplay();

  // bars 
  this.sidebar = new Sidebar(ctx,this);
  this.textbar = new Textbar(ctx);
  
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
  };
  this.NextShipDown = function()
  {
    this.players[pid].nextShip(-1);
  };
  
  this.UpdateZones = function()
  {
    this.translationZone = new TranslationZone(this.players[pid].Selected())
    this.rotationZone = new RotationZone(this.players[pid].Selected())
    this.cannonZone = this.players[pid].Selected().cannonzone
    this.torpedoZone = this.players[pid].Selected().torpedozone
  };

  this.CurrentPlayer =function(){
      return this.players[pid].Selected();
  };
  
  this.Display = function()
  {
    this.env.drawGrid();

    // ships
    if(pid == 0){
      this.players[1].fleet.Draw(ctx,C.B,this.shipdisplay);
      this.V.Draw(ctx,'grey');
      this.players[0].fleet.Draw(ctx,C.G,this.shipdisplay);
    }else {
      this.players[0].fleet.Draw(ctx,C.B,this.shipdisplay);
      this.V.Draw(ctx,'grey');
      this.players[1].fleet.Draw(ctx,C.G,this.shipdisplay);
    }

       
    // "cloud of invisibitily"
      //this.V.Draw(ctx,'grey');
    
      // coral map
      this.env.drawCoral();

      // bases
      this.players[0].fleet.DrawBase(ctx,'blue');
      this.players[1].fleet.DrawBase(ctx,'#4DDE00');

    // zones
    if(this.turn == pid){
      if(this.movezone == Z.None){
          // do nothing
      }else if(this.movezone == Z.Translate){
          this.currentZone = this.translationZone
          this.currentZone.Draw(ctx);
      } else if(this.movezone == Z.Rotate){
          this.currentZone = this.rotationZone
          this.currentZone.Draw(ctx);
      }else if(this.movezone == Z.Cannon){
          this.currentZone = this.cannonZone
          this.currentZone.Draw(ctx,"white");//rgb(0,0,255)
      }else if(this.movezone == Z.Torpedo){
          this.currentZone = this.torpedoZone
          this.currentZone.Draw(ctx,"white");
      }else if(this.movezone ==Z.Mine){
      };
    }
    
    // bars
    game.sidebar.RegisterShipChange();
    this.sidebar.Draw();
    this.textbar.Draw();
    
   
  };

  this.reload = function()
  {
    // reset zone
    this.movezone = Z.None;
    this.sidebar.ClearButtons();
    this.sidebar.selected = -1;

    // 2 players
    this.players=new Array();
    this.players.push(new Player(Turn.First));
    this.players.push(new Player(Turn.Second));

    this.turn = GAME_DATA.moves.length%2

    // Visibility
    this.V = new Visibility(this.players[pid].Ranges());
  }

  this.reload();
  
};


