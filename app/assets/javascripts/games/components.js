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

      // Draw ship image
      shipdisplay.Draw(this, color);

      function showdmg(x,y,life) {
        colordmg = function (pixels) {
          var d = pixels.data;
          for (var i = 0; i < d.length; i += 4) {
            var r = d[i];
            var g = d[i + 1];
            var b = d[i + 2];
            // This is so hacky I want to cry
            // Do not affect water color, grid borders or hover color
            if (b != 210 && b != 147 && b!=220) {
              if (life=='0') {
                // Dead square: RED
                d[i+1]=d[i+2]=0;
                d[i] = (r+g+b);
              } else if (life=='1') {
                // Partial damage: GREY
                d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
              }
            }
          }
          return pixels;
        };

        var drawx = x*SQ_WIDTH;
        var drawy = y*SQ_WIDTH;
        var sizex = SQ_WIDTH;
        var sizey = SQ_WIDTH

        var imageData = ctx.getImageData(drawx, drawy, sizex, sizey);
        colordmg(imageData);
        ctx.putImageData(imageData, drawx, drawy);
      }

      // Show damage on ships
      if(damage)
      {
        for(var i = 0; i < this.length; i++){
            if(parseInt(this.health.charAt(i)) != this.armor)
            {
              showdmg(this.points[i].x, this.points[i].y, this.health.charAt(i))
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

  var minegraphics = new Image();
  minegraphics.src = "/assets/mine.png";

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
                  ctx.drawImage(minegraphics, pt.x*SQ_WIDTH, pt.y*SQ_WIDTH);
                }
            }
          }
      }

  };

};
