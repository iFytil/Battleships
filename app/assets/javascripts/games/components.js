Point = function (x, y) {
  this.x = x;
  this.y = y;
};

// relative to bow coordinates
// b = backward offset
RadarRange = function (x,y,b, w, h,facing) {
  // identified by the top left corner
  // w by h range

  this.w = w;
  this.h = h;

  this.Set =function(bx,by){
    if (facing == D.RIGHT) 
    {
      this.x = bx-b;
      this.y = by-Math.floor(this.h/2);
    } 
    else if (facing == D.LEFT) 
    {
      this.x = bx+b-this.w+1;
      this.y = by-Math.floor(this.h/2);
    } 
    else if (facing == D.UP) 
    {
      this.x = bx-Math.floor(this.h/2);
      this.y = by-b;
    } 
    else if (facing == D.DOWN) 
    {
      this.x = bx-Math.floor(this.h/2);
      this.y = by+b;
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

Ship = function (x, y, speed, radar, length, facing) {

  // 'facing' indicates ship direction: D.LEFT D.RIGHT D.UP D.DOWN

  var t = SQ_WIDTH / 2;
  var bowx = (x) * SQ_WIDTH + t; // bow tip coordinates
  var bowy = (y) * SQ_WIDTH + t;
  
  this.radar = radar;

  this.points = new Array();

  // spacing 
  var s = 4;

  if (facing == D.RIGHT) {
      this.points.push(new Point(bowx - t, bowy - t + s));
      this.points.push(new Point(bowx, bowy));
      this.points.push(new Point(bowx - t, bowy + t - s));
      this.points.push(new Point(bowx - t - (length - 1) * SQ_WIDTH + s, bowy + t - s));
      this.points.push(new Point(bowx - t - (length - 1) * SQ_WIDTH + s, bowy - t + s));
  } else if (facing == D.LEFT) {
      this.points.push(new Point(bowx + t, bowy + t - s));
      this.points.push(new Point(bowx, bowy));
      this.points.push(new Point(bowx + t, bowy - t + s));
      this.points.push(new Point(bowx + t + (length - 1) * SQ_WIDTH - s, bowy - t + s));
      this.points.push(new Point(bowx + t + (length - 1) * SQ_WIDTH - s, bowy + t - s));
  } else if (facing == D.UP) {
      this.points.push(new Point(bowx - t + s, bowy + t));
      this.points.push(new Point(bowx, bowy));
      this.points.push(new Point(bowx + t - s, bowy + t));
      this.points.push(new Point(bowx + t - s, bowy + t + (length - 1) * SQ_WIDTH - s));
      this.points.push(new Point(bowx - t + s, bowy + t + (length - 1) * SQ_WIDTH - s));
  } else if (facing == D.DOWN) {
      this.points.push(new Point(bowx - t + s, bowy - t));
      this.points.push(new Point(bowx, bowy));
      this.points.push(new Point(bowx + t - s, bowy - t));
      this.points.push(new Point(bowx + t - s, bowy - t - (length - 1) * SQ_WIDTH + s));
      this.points.push(new Point(bowx - t + s, bowy - t - (length - 1) * SQ_WIDTH + s));
  }

  this.Forward = function (a) {
    if (facing == D.RIGHT) {
        for (var i = 0; i < 5; i++) {
            this.points[i].x += SQ_WIDTH * a;
        }
    } else if (facing == D.LEFT) {
        for (var i = 0; i < 5; i++) {
            this.points[i].x -= SQ_WIDTH * a;
        }
    } else if (facing == D.UP) {
        for (var i = 0; i < 5; i++) {
            this.points[i].y -= SQ_WIDTH * a;
        }
    } else if (facing == D.DOWN) {
        for (var i = 0; i < 5; i++) {
            this.points[i].y += SQ_WIDTH * a;
        }
    }
  }
  this.Backward = function () {
      if (facing == D.RIGHT) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x -= SQ_WIDTH;
          }
      } else if (facing == D.LEFT) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x += SQ_WIDTH;
          }
      } else if (facing == D.UP) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y += SQ_WIDTH;
          }
      } else if (facing == D.DOWN) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y -= SQ_WIDTH;
          }
      }
  }
  this.Left = function () {
      if (facing == D.RIGHT) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y -= SQ_WIDTH;
          }
      } else if (facing == D.LEFT) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y += SQ_WIDTH;
          }
      } else if (facing == D.UP) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x -= SQ_WIDTH;
          }
      } else if (facing == D.DOWN) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x += SQ_WIDTH;
          }
      }
  }
  this.Right = function () {
      if (facing == D.RIGHT) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y += SQ_WIDTH;
          }
      } else if (facing == D.LEFT) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y -= SQ_WIDTH;
          }
      } else if (facing == D.UP) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x += SQ_WIDTH;
          }
      } else if (facing == D.DOWN) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x -= SQ_WIDTH;
          }
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


Cruiser = function (x, y, facing) {
    var r = new RadarRange(x, y,3, 10, 3,facing);
    return new Ship(x, y, 10, r, 5, facing);
};
Destroyer = function (x, y, facing) {
    var r = new RadarRange(x, y,2, 8, 3,facing);
    return new Ship(x, y, 8, r, 4, facing);
};

Torpedo = function (x, y, facing) {
    var r = new RadarRange(x, y,1, 6, 3,facing);
    return new Ship(x, y, 9, r, 3, facing);
};

MineLayer = function (x, y, facing) {
    var r = new RadarRange(x, y,3, 6, 5,facing);
    return new Ship(x, y, 6, r, 2, facing);
};

RadarBoat = function (x, y, facing) {
    var r = new RadarRange(x, y,1, 12, 3,facing);
    return new Ship(x, y, 3, r, 3, facing);
};


Base = function (x, y) {

    var x0 = x * SQ_WIDTH;
    var y0 = y * SQ_WIDTH;

    var points = new Array();
    points.push(new Point(x0, y0));
    points.push(new Point(x0 + SQ_WIDTH, y0));
    points.push(new Point(x0 + SQ_WIDTH, y0 + SQ_WIDTH * 10));
    points.push(new Point(x0, y0 + SQ_WIDTH * 10));
    /*points.push(new Point(10,50));
  points.push(new Point(20,50));
  points.push(new Point(20,100));
  points.push(new Point(10,100));*/

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

Fleet = function (side) {
  this.ships = new Array();

  if (side == D.LEFT) 
  {
    this.ships.push(Destroyer(4, 10, D.RIGHT));
    this.ships.push(Torpedo(3, 11, D.RIGHT));
    this.ships.push(Cruiser(5, 12, D.RIGHT));
    this.ships.push(MineLayer(2, 13, D.RIGHT));
    this.ships.push(Destroyer(4, 14, D.RIGHT));
    this.ships.push(RadarBoat(3, 15, D.RIGHT));
    this.ships.push(Cruiser(5, 16, D.RIGHT));
    this.ships.push(Destroyer(4, 17, D.RIGHT));
    this.ships.push(MineLayer(2, 18, D.RIGHT));
    this.ships.push(Torpedo(3, 19, D.RIGHT));

    var base = new Base(0, 10);

  } 
  else // side == D.RIGHT
  {
      this.ships.push(Destroyer(25, 19, D.LEFT));
      this.ships.push(Torpedo(26, 18, D.LEFT));
      this.ships.push(Cruiser(24, 17, D.LEFT));
      this.ships.push(MineLayer(27, 16, D.LEFT));
      this.ships.push(Destroyer(25, 15, D.LEFT));
      this.ships.push(RadarBoat(26, 14, D.LEFT));
      this.ships.push(Cruiser(24, 13, D.LEFT));
      this.ships.push(Destroyer(25, 12, D.LEFT));
      this.ships.push(MineLayer(27, 11, D.LEFT));
      this.ships.push(Torpedo(26, 10, D.LEFT));

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
