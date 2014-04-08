var shipdisplay;
jQuery(function() {
  shipdisplay = new ShipDisplay();
});

Point = function (x, y) {
  this.x = x;
  this.y = y;

  this.toString = function() {
    return "("+this.x+","+this.y+")"
  }
};

Ship = function (ship, radar, cannon, torpedo) {

  var t = SQ_WIDTH / 2;

  this.data = ship

  this.length     = ship.shiptype.size;
  this.x          = ship.location_x
  this.y          = ship.location_y
  this.turnSpeed  = ship.shiptype.turn_speed;
  this.turnIndex  = ship.shiptype.turn_index;
  this.speed      = ship.shiptype.speed;
  this.facing     = Dir[ship.direction];
  this.radarzone  = radar;
  this.cannonzone = cannon;
  this.health     = ship.health;
  this.armor      = ship.shiptype.armor;

  this.id         = ship.id;
  this.name       = ship.shiptype.name;

  this.torpedozone= torpedo;  

  this.points = new Array();

  // spacing 
  var s = 4;

  // adjust speed based on damage
  var dcount =0;
  for(var i=0;i<this.health.length;i++){
      if(this.health.charAt(i)=='0')
        dcount++;
  }
  this.speed=Math.floor(this.speed*((this.length-dcount)/this.length));

  this.Set = function() {
    var dx = 0;
    var dy = 0;
    switch (this.facing) {
    case Dir.Up:
      dy = -1;
      break;
    case Dir.Down:
      dy = 1;
      break;
    case Dir.Left:
      dx = -1;
      break;
    case Dir.Right:
      dx = 1;
      break;
    }
    for (var i = 0; i < this.length; i++) {
      this.points[i] = new Point(this.x+i*dx, this.y+i*dy)
    }
  }
  this.Set();

  this.highlighted = false;

  this.DrawStern = function(){
    ctx.fillStyle = "yellow"
    ctx.fillRect(this.x*SQ_WIDTH + SQ_WIDTH/4,this.y*SQ_WIDTH + SQ_WIDTH/4,SQ_WIDTH/2,SQ_WIDTH/2);
  }

  this.Draw = function (color, damage) {

      if(this.name == T.C)
        shipdisplay.Draw(this.x*SQ_WIDTH,this.y*SQ_WIDTH,this.facing,S.C,color);
      else if(this.name == T.D)
        shipdisplay.Draw(this.x*SQ_WIDTH,this.y*SQ_WIDTH,this.facing,S.D,color);
      else if(this.name == T.T)
        shipdisplay.Draw(this.x*SQ_WIDTH,this.y*SQ_WIDTH,this.facing,S.T,color);
      else if(this.name == T.R || this.name == T.E)
        shipdisplay.Draw(this.x*SQ_WIDTH,this.y*SQ_WIDTH,this.facing,S.R,color);
      else if(this.name == T.M)
        shipdisplay.Draw(this.x*SQ_WIDTH,this.y*SQ_WIDTH,this.facing,S.M,color);
      else if(this.name == T.K)
        shipdisplay.Draw(this.x*SQ_WIDTH,this.y*SQ_WIDTH,this.facing,S.K,color);

      // Paint damaged squares
      if(damage)
      {
        for(var i = 0; i < this.length; i++){
            if(parseInt(this.health.charAt(i)) != this.armor)
            {
              ctx.beginPath()
              var grayLevel = parseInt(this.health.charAt(i))/this.armor;

              var x = Math.floor(grayLevel*255);
              ctx.fillStyle = "rgb("+x+","+x+","+x+")";

              ctx.rect(this.points[i].x*SQ_WIDTH, this.points[i].y*SQ_WIDTH, SQ_WIDTH, SQ_WIDTH);
              ctx.stroke();
              ctx.fill();
              ctx.closePath();
            }
        }
      }
      if(this.highlighted)
        this.DrawStern();
  }

  // Duplicate!
  this.Duplicate = function(){
    return new Ship(ship, radar, cannon, torpedo);
  }


};

Base = function (x, y) {

  var x0 = x * SQ_WIDTH;
  var y0 = y * SQ_WIDTH;
  
  // visibility
  this.radarzone = new Range(x, y, -1, 3, 12, Dir.Down);

  this.Draw = function (color) {
    ctx.fillStyle = color;
    ctx.fillRect(x0,y0,SQ_WIDTH,10*SQ_WIDTH);
  }

};

Fleet = function (turn) {
  this.ships = new Array();

  for (each in SHIPS) {
    var ship = SHIPS[each];
    if (ship.turn == turn) {
      var type = ship.shiptype;
      var radar = new Range(ship.location_x, ship.location_y, type.radar_back, type.radar_w, type.radar_l, Dir[ship.direction])
      var cannon = new Range(ship.location_x, ship.location_y, type.cannon_back, type.cannon_w, type.cannon_l, Dir[ship.direction])
      var torpedo = new Range(ship.location_x, ship.location_y, type.size, 1, 10, Dir[ship.direction])

      this.ships.push(new Ship(ship, radar, cannon, torpedo))
    }
  }

  if (turn == Turn.First) 
  {
    this.base = new Base(0, 10);
  } 
  else if (turn == Turn.Second)
  {
    this.base = new Base(29, 10);
  }

  this.Draw = function (color) {

      for (var i = 0; i < this.ships.length; i++) {
          this.ships[i].Draw(color, true);
      }
  };
  this.DrawBase = function (color) {
      this.base.Draw(color);
      //this.base.radarzone.Draw(ctx, color);
  };
  this.DrawMines = function () {
      var mines = GAME_DATA.mines;
      for (var i = 0; i < this.ships.length; i++) 
      {
          if(this.ships[i].name == "Mine Layer" && this.ships[i].data.turn==pid)
          {
            var points = this.ships[i].radarzone.GetPoints();
            for ( var j = 0; j < points.length; j++ )
            {
                var pt = points[j];
                if( mines[pt.x + pt.y * 30] == 1)
                {
                  ctx.beginPath()
                  ctx.fillStyle = "black";
                  ctx.lineWidth = 1;
                  ctx.strokeStyle = 'black';
                  ctx.rect(pt.x*SQ_WIDTH, pt.y*SQ_WIDTH, SQ_WIDTH, SQ_WIDTH);
                  ctx.stroke();
                  ctx.fill();
                  ctx.closePath();
                }
            }
          }
      }

  };

};
