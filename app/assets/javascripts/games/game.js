// Ship directions
var Dir = {
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
var Zone = {
  None: -1,
  Translate: 0,
  Rotate: 1,
  Cannon: 2,
  Torpedo: 3,
  Mine: 4,
  Radar: 5,
  Repair: 6,
  Kamikaze: 7
}

var Abilities = ["Move", "Rotate", "Cannon", "Torpedo", "Mine", "Radar", "Repair", "Kamikaze"]

var Type = {
  RadarBoat:         "Radar Boat",
  MineLayer:         "Mine Layer",
  TorpedoBoat:       "Torpedo Boat",
  Destroyer:         "Destroyer",
  Cruiser:           "Cruiser",
  RadarBoatExtended: "Radar Boat Extended",
  KamikazeBoat:      "Kamikaze Boat"
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

    this.cleanSidebar();
  }
  this.selectShip = function(idx)
  {
    this.fleet.ships[this.selected].highlighted = false;
    this.selected = idx;
    this.fleet.ships[this.selected].highlighted = true;

    this.cleanSidebar();
  }

  this.cleanSidebar = function() {
    game.movezone = Zone.None;
    if(game.sidebar.selected>=0){
      game.sidebar.buttons[game.sidebar.selected].selected = false;
      game.sidebar.buttons[game.sidebar.selected].hover = false;
    }
    game.sidebar.selected = -1;
    game.sidebar.ClearButtons();

  }

  this.Ranges = function()
  {
    var r = new Array();
    for(var i=0;i<this.fleet.ships.length;i++){
      r.push(this.fleet.ships[i].radarzone);
    }
    r.push(this.fleet.baseradar);
    return r;
  };
  
  this.Selected = function(){
	  return this.fleet.ships[this.selected];
  }
  
};

Game = function()
{

  // 2 players
  this.players=new Array();
  this.players.push(new Player(Turn.First));
  this.players.push(new Player(Turn.Second));
  this.turn = 0;

  // environment
  this.env = new Environment();

  // bars 
  this.sidebar = new Sidebar();
  this.textbar = new Textbar();
  
  // currently displayed zones
  this.movezone = Zone.None;
  
  
  
  
  
  this.NextShipUp = function()
  {
    this.players[pid].nextShip(1);
  };
  this.NextShipDown = function()
  {
    this.players[pid].nextShip(-1);
  };
  this.SelectShip = function(idx)
  {
    this.players[pid].selectShip(idx);
  };
  
  this.UpdateZones = function()
  {
    var ship = this.players[pid].Selected();
    this.translationZone = (ship.name=="Kamikaze Boat") ? new KamikazeZone(ship) : new TranslationZone(ship)
    this.mineZone     = new MineZone(ship)
    this.rotationZone = new RotationZone(ship)
    this.cannonZone   = ship.cannonzone
    this.torpedoZone  = ship.torpedozone
    this.kamikazeZone = new KamikazeZone(ship)
  };

// returns selected ship
  this.CurrentPlayer =function(){
      return this.players[pid].Selected();
  };
  
  this.Display = function()
  {
    this.env.drawGrid();

    // ships
    if(pid==1){
      this.players[0].fleet.Draw();
      this.V.Draw('grey');
      this.players[1].fleet.Draw();
    }else{
      this.players[1].fleet.Draw();
      this.V.Draw('grey');
      this.players[0].fleet.Draw();
    }
  
    // coral map
    this.env.drawCoral();

    // zones
    if(this.turn == pid){
      if(this.movezone == Zone.None){
          // do nothing
      }else if(this.movezone == Zone.Translate){
          this.currentZone = this.translationZone
          this.currentZone.Draw();
      } else if(this.movezone == Zone.Rotate){
          this.currentZone = this.rotationZone
          this.currentZone.Draw();
      }else if(this.movezone == Zone.Cannon){
          this.currentZone = this.cannonZone
          this.currentZone.Draw();
      }else if(this.movezone == Zone.Torpedo){
          this.currentZone = this.torpedoZone
          this.currentZone.Draw();
      }else if(this.movezone ==Zone.Mine){
          this.currentZone = this.mineZone
          this.currentZone.Draw();
      }else if(this.movezone ==Zone.Kamikaze){
          this.currentZone = this.kamikazeZone
          this.currentZone.Draw();
      }
    }
    
    // bars
    game.sidebar.RegisterShipChange();
    game.sidebar.setMessages();
    this.sidebar.Draw();

  };

  this.reload = function()
  {
    // reset zone
    this.movezone = Zone.None;
    this.sidebar.ClearButtons();
    this.sidebar.selected = -1;

    // 2 players
    this.players=new Array();
    this.players.push(new Player(Turn.First));
    this.players.push(new Player(Turn.Second));

    this.turn = GAME_DATA.moves.length%2

    // Visibility
    this.V = new Visibility(this.players[pid].Ranges());

    //messages
    var moves = GAME_DATA.moves;
    var len = GAME_DATA.moves.length;
    for(var i=10;i>0;i--)
      this.textbar.Message(GAME_DATA.moves[len-i].message);
  }

  this.reload();
  
};


