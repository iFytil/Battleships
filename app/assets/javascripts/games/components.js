Point = function (x, y) {
  this.x = x;
  this.y = y;
};

// relative to bow coordinates
// b = backward offset
RadarRange = function (x,y,back, width, length,facing) {
  // identified by the top left corner
  // w by h range

  this.h = width;
  this.w = length;
  
  this.facing = facing;

  this.Set =function(sternx,sterny){
    if (this.facing == D.Right) 
    {
      this.x = sternx+back;
      this.y = sterny-Math.floor(this.h/2);
    } 
    else if (this.facing == D.Left) 
    {
      this.x = sternx+1-back-this.w;
      this.y = sterny-Math.floor(this.h/2);
    } 
    else if (this.facing == D.Up) 
    {
      this.h = length;
      this.w = width;
      this.x = sternx-Math.floor(this.w/2);
      this.y = sterny+1-back-this.h;
    } 
    else if (this.facing == D.Down) 
    {
      this.h = length;
      this.w = width;
      this.x = sternx-Math.floor(this.w/2);
      this.y = sterny+back;
    }
  }

  this.Set(x,y);
    
  this.Draw = function (ctx, color) {
    ctx.beginPath();
    ctx.moveTo(this.x*SQ_WIDTH, this.y*SQ_WIDTH);
    ctx.lineTo(this.x*SQ_WIDTH+this.w*SQ_WIDTH, this.y*SQ_WIDTH);
    ctx.lineTo(this.x*SQ_WIDTH+this.w*SQ_WIDTH, this.y*SQ_WIDTH+this.h*SQ_WIDTH);
    ctx.lineTo(this.x*SQ_WIDTH, this.y*SQ_WIDTH+this.h*SQ_WIDTH);
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  

};

Ship = function (x, y, length, speed, facing, radar) {

  // 'facing' indicates ship direction: D.Left D.Right D.Up D.Down

  var t = SQ_WIDTH / 2;
  this.sternx = (x) * SQ_WIDTH; // bow tip coordinates
  this.sterny = (y) * SQ_WIDTH;
  
  this.facing = facing;
  
  this.radar = radar;

  this.points = new Array();

  // spacing 
  var s = 4;

this.Set = function(){
  
  if (this.facing == D.Right) 
  {
    this.points[0] =new Point(this.sternx+s,this.sterny+s);
    this.points[1] =new Point(this.sternx+s,this.sterny+SQ_WIDTH-s);
    this.points[2] =new Point(this.sternx+(length-1)*SQ_WIDTH,this.sterny+SQ_WIDTH-s);
    this.points[3] =new Point(this.sternx+(length)*SQ_WIDTH-t,this.sterny+t);
    this.points[4] =new Point(this.sternx+(length-1)*SQ_WIDTH,this.sterny+s);
  } 
  else if (this.facing == D.Left) 
  {
    this.points[0] =new Point(this.sternx+SQ_WIDTH-s,this.sterny+s);
    this.points[1] =new Point(this.sternx+SQ_WIDTH-s,this.sterny+SQ_WIDTH-s);
    this.points[2] =new Point(this.sternx-(length-2)*SQ_WIDTH,this.sterny+SQ_WIDTH-s);
    this.points[3] =new Point(this.sternx-(length-1)*SQ_WIDTH+t,this.sterny+t);
    this.points[4] =new Point(this.sternx-(length-2)*SQ_WIDTH,this.sterny+s);
  } 
  else if (this.facing == D.Up) 
  {
    this.points[0] =new Point(this.sternx+s,this.sterny+SQ_WIDTH-s);
    this.points[1] =new Point(this.sternx+SQ_WIDTH-s,this.sterny+SQ_WIDTH-s);
    this.points[2] =new Point(this.sternx+SQ_WIDTH-s,this.sterny-(length-2)*SQ_WIDTH);
    this.points[3] =new Point(this.sternx+t,this.sterny-(length-1)*SQ_WIDTH+t);
    this.points[4] =new Point(this.sternx+s,this.sterny-(length-2)*SQ_WIDTH);
  } 
  else if (this.facing == D.Down) 
  {
    this.points[0] =new Point(this.sternx+s,this.sterny+s);
    this.points[1] =new Point(this.sternx+SQ_WIDTH-s,this.sterny+s);
    this.points[2] =new Point(this.sternx+SQ_WIDTH-s,this.sterny+(length-1)*SQ_WIDTH);
    this.points[3] =new Point(this.sternx+t,this.sterny+(length)*SQ_WIDTH-t);
    this.points[4] =new Point(this.sternx+s,this.sterny+(length-1)*SQ_WIDTH);
  }
}
this.Set();

  this.Forward = function (a) {
    if (this.facing == D.Right) {
        for (var i = 0; i < 5; i++) {
          this.points[i].x += SQ_WIDTH * a;
        }
    } else if (this.facing == D.Left) {
        for (var i = 0; i < 5; i++) {
          this.points[i].x -= SQ_WIDTH * a;
        }
    } else if (this.facing == D.Up) {
        for (var i = 0; i < 5; i++) {
          this.points[i].y -= SQ_WIDTH * a;
        }
    } else if (this.facing == D.Down) {
        for (var i = 0; i < 5; i++) {
          this.points[i].y += SQ_WIDTH * a;
        }
    }
  }
  this.Backward = function () {
      if (this.facing == D.Right) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x -= SQ_WIDTH;
          }
      } else if (this.facing == D.Left) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x += SQ_WIDTH;
          }
      } else if (this.facing == D.Up) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y += SQ_WIDTH;
          }
      } else if (this.facing == D.Down) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y -= SQ_WIDTH;
          }
      }
  }
  this.Left = function () {
      for (var i = 0; i < 5; i++) {
              this.points[i].x -= SQ_WIDTH;
              
          }
  }
  this.Right = function () {
      for (var i = 0; i < 5; i++) {
              this.points[i].x += SQ_WIDTH;
          }
  }
 
  this.Up = function () {
      for (var i = 0; i < 5; i++) {
              this.points[i].y -= SQ_WIDTH;
          }
  }
  
  this.Down = function () {
      for (var i = 0; i < 5; i++) {
              this.points[i].y += SQ_WIDTH;
          }
  }
  this.CW = function () {
    if (this.facing == D.Right) {
        this.facing = D.Down;
        this.Set();
    } else if (this.facing == D.Left) {
        this.facing = D.Up;
        this.Set();
    } else if (this.facing == D.Up) {
        this.facing = D.Right;
        this.Set();
    } else if (this.facing == D.Down) {
        this.facing = D.Left;
        this.Set();
    }
  }
  this.CCW = function () {
      if (this.facing == D.Right) {
        this.facing = D.Up;
        this.Set();
    } else if (this.facing == D.Left) {
        this.facing = D.Down;
        this.Set();
    } else if (this.facing == D.Up) {
        this.facing = D.Left;
        this.Set();
    } else if (this.facing == D.Down) {
        this.facing = D.Right;
        this.Set();
    }
  }
    this.highlighted = false;
    this.Draw = function (ctx, color) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        ctx.lineTo(this.points[1].x, this.points[1].y);
        ctx.lineTo(this.points[2].x, this.points[2].y);
        ctx.lineTo(this.points[3].x, this.points[3].y);
        ctx.lineTo(this.points[4].x, this.points[4].y);
        ctx.closePath();
        ctx.lineWidth = 2;
        if (this.highlighted)
            ctx.strokeStyle = 'yellow';
        else
            ctx.strokeStyle = color;
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
        
        this.radar.Draw(ctx, 'yellow');
    }


};

Base = function (x, y) {

    var x0 = x * SQ_WIDTH;
    var y0 = y * SQ_WIDTH;

    var points = new Array();
    points.push(new Point(x0, y0));
    points.push(new Point(x0 + SQ_WIDTH, y0));
    points.push(new Point(x0 + SQ_WIDTH, y0 + SQ_WIDTH * 10));
    points.push(new Point(x0, y0 + SQ_WIDTH * 10));

    this.Draw = function (ctx, color) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.lineTo(points[3].x, points[3].y);
        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
    }


};

Fleet = function (turn) {
  this.ships = new Array();

  var all_ships = $('#game-data').data("ships")

  for (each in all_ships) {
    var ship = all_ships[each];
    if (ship.turn == turn) {
      var type = ship.shiptype;
      var radar = new RadarRange(ship.location_x, ship.location_y, type.radar_back, type.radar_w, type.radar_l, D[ship.direction])
      this.ships.push(new Ship(ship.location_x, ship.location_y, type.size, type.speed, D[ship.direction], radar))
    }
  }

  if (turn == Turn.First) 
  {
    var base = new Base(0, 10);
  } 
  else if (turn == Turn.Second)
  {
    var base = new Base(29, 10);
  }

  this.Select = function (x, y) {
      return false; //true if something gets selected, false if nothing is selected
  };

  this.Draw = function (ctx, color) {
      for (var i = 0; i < this.ships.length; i++) {
          this.ships[i].Draw(ctx, color);
      }
      base.Draw(ctx, 'black');
  };

};
