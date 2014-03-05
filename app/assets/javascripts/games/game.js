Player = function(side,sqsize,gridn){
  
  // true - it is this player's turn
  var turn = false;
  
  // initial fleet
  this.fleet = new Fleet(side,sqsize,gridn);
  
  // current ship
  this.selected = 0; //index
  this.fleet.ships[this.selected].highlighted = true;
  
  this.Turn = function()
  {
    turn = !turn;
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

Game = function(context,w,n)
{

  // environment
  var square_width = Math.floor(w/n);
  var env = new Environment(context,n,w,square_width);
  
  // 2 players
  this.players=new Array();
  this.players.push(new Player('left',square_width,n));
  this.players.push(new Player('right',square_width,n));
  
  this.turn = 0;
  this.players[this.turn].Turn();
  
  // Visibility
  this.V = new Visibility(n,this.players[this.turn].Ranges());
  
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
    this.players[0].fleet.Draw(context,'#B80B0B');
    this.players[1].fleet.Draw(context,'#63A80A');
    
    // "cloud of invisibitily"
    //this.V.Draw(context,'grey',square_width);
  };
  
};
