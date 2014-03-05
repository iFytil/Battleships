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
  
  this.Draw = function (context, color,sqw) {
    context.beginPath();
    context.moveTo(this.x*sqw, this.y*sqw);
    context.lineTo(this.x*sqw+this.w*sqw, this.y*sqw);
    context.lineTo(this.x*sqw+this.w*sqw, this.y*sqw+this.h*sqw);
    context.lineTo(this.x*sqw, this.y*sqw+this.h*sqw);
    context.closePath();
    context.lineWidth = 2;
    context.strokeStyle = color;
    context.stroke();
  }
  

};

Ship = function (x, y, speed, radar, length, facing, sqsize) {

  // 'facing' indicates ship direction: D.LEFT D.RIGHT D.UP D.DOWN

  var t = sqsize / 2;
  var bowx = (x) * sqsize + t; // bow tip coordinates
  var bowy = (y) * sqsize + t;
  
  this.radar = radar;

  this.points = new Array();

  // spacing 
  var s = 4;

  if (facing == D.RIGHT) {
      this.points.push(new Point(bowx - t, bowy - t + s));
      this.points.push(new Point(bowx, bowy));
      this.points.push(new Point(bowx - t, bowy + t - s));
      this.points.push(new Point(bowx - t - (length - 1) * sqsize + s, bowy + t - s));
      this.points.push(new Point(bowx - t - (length - 1) * sqsize + s, bowy - t + s));
  } else if (facing == D.LEFT) {
      this.points.push(new Point(bowx + t, bowy + t - s));
      this.points.push(new Point(bowx, bowy));
      this.points.push(new Point(bowx + t, bowy - t + s));
      this.points.push(new Point(bowx + t + (length - 1) * sqsize - s, bowy - t + s));
      this.points.push(new Point(bowx + t + (length - 1) * sqsize - s, bowy + t - s));
  } else if (facing == D.UP) {
      this.points.push(new Point(bowx - t + s, bowy + t));
      this.points.push(new Point(bowx, bowy));
      this.points.push(new Point(bowx + t - s, bowy + t));
      this.points.push(new Point(bowx + t - s, bowy + t + (length - 1) * sqsize - s));
      this.points.push(new Point(bowx - t + s, bowy + t + (length - 1) * sqsize - s));
  } else if (facing == D.DOWN) {
      this.points.push(new Point(bowx - t + s, bowy - t));
      this.points.push(new Point(bowx, bowy));
      this.points.push(new Point(bowx + t - s, bowy - t));
      this.points.push(new Point(bowx + t - s, bowy - t - (length - 1) * sqsize + s));
      this.points.push(new Point(bowx - t + s, bowy - t - (length - 1) * sqsize + s));
  }

  this.Forward = function (a) {
    if (facing == D.RIGHT) {
        for (var i = 0; i < 5; i++) {
            this.points[i].x += sqsize * a;
        }
    } else if (facing == D.LEFT) {
        for (var i = 0; i < 5; i++) {
            this.points[i].x -= sqsize * a;
        }
    } else if (facing == D.UP) {
        for (var i = 0; i < 5; i++) {
            this.points[i].y -= sqsize * a;
        }
    } else if (facing == D.DOWN) {
        for (var i = 0; i < 5; i++) {
            this.points[i].y += sqsize * a;
        }
    }
  }
  this.Backward = function () {
      if (facing == D.RIGHT) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x -= sqsize;
          }
      } else if (facing == D.LEFT) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x += sqsize;
          }
      } else if (facing == D.UP) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y += sqsize;
          }
      } else if (facing == D.DOWN) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y -= sqsize;
          }
      }
  }
  this.Left = function () {
      if (facing == D.RIGHT) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y -= sqsize;
          }
      } else if (facing == D.LEFT) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y += sqsize;
          }
      } else if (facing == D.UP) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x -= sqsize;
          }
      } else if (facing == D.DOWN) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x += sqsize;
          }
      }
  }
  this.Right = function () {
      if (facing == D.RIGHT) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y += sqsize;
          }
      } else if (facing == D.LEFT) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y -= sqsize;
          }
      } else if (facing == D.UP) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x += sqsize;
          }
      } else if (facing == D.DOWN) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x -= sqsize;
          }
      }
  }


    this.highlighted = false;
    this.Draw = function (context, color) {
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        context.lineTo(this.points[1].x, this.points[1].y);
        context.lineTo(this.points[2].x, this.points[2].y);
        context.lineTo(this.points[3].x, this.points[3].y);
        context.lineTo(this.points[4].x, this.points[4].y);
        context.closePath();
        context.lineWidth = 2;
        if (this.highlighted)
            context.strokeStyle = 'yellow';
        else
            context.strokeStyle = color;
        context.stroke();
        context.fillStyle = color;
        context.fill();
        
        this.radar.Draw(context, 'yellow',sqsize);
    }


};


Cruiser = function (x, y, facing, sqsize) {
    var r = new RadarRange(x, y,3, 10, 3,facing);
    return new Ship(x, y, 10, r, 5, facing, sqsize);
};
Destroyer = function (x, y, facing, sqsize) {
    var r = new RadarRange(x, y,2, 8, 3,facing);
    return new Ship(x, y, 8, r, 4, facing, sqsize);
};

Torpedo = function (x, y, facing, sqsize) {
    var r = new RadarRange(x, y,1, 6, 3,facing);
    return new Ship(x, y, 9, r, 3, facing, sqsize);
};

MineLayer = function (x, y, facing, sqsize) {
    var r = new RadarRange(x, y,3, 6, 5,facing);
    return new Ship(x, y, 6, r, 2, facing, sqsize);
};

RadarBoat = function (x, y, facing, sqsize) {
    var r = new RadarRange(x, y,1, 12, 3,facing);
    return new Ship(x, y, 3, r, 3, facing, sqsize);
};


Base = function (x, y, sqsize) {

    var x0 = x * sqsize;
    var y0 = y * sqsize;

    var points = new Array();
    points.push(new Point(x0, y0));
    points.push(new Point(x0 + sqsize, y0));
    points.push(new Point(x0 + sqsize, y0 + sqsize * 10));
    points.push(new Point(x0, y0 + sqsize * 10));
    /*points.push(new Point(10,50));
  points.push(new Point(20,50));
  points.push(new Point(20,100));
  points.push(new Point(10,100));*/

    this.Draw = function (context, color) {
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        context.lineTo(points[1].x, points[1].y);
        context.lineTo(points[2].x, points[2].y);
        context.lineTo(points[3].x, points[3].y);
        context.closePath();
        context.lineWidth = 2;
        context.strokeStyle = color;
        context.stroke();
        context.fillStyle = color;
        context.fill();
    }


};

Fleet = function (side, sqsize) {
  this.ships = new Array();

  if (side == D.LEFT) 
  {
    this.ships.push(Destroyer(4, 10, D.RIGHT, sqsize));
    this.ships.push(Torpedo(3, 11, D.RIGHT, sqsize));
    this.ships.push(Cruiser(5, 12, D.RIGHT, sqsize));
    this.ships.push(MineLayer(2, 13, D.RIGHT, sqsize));
    this.ships.push(Destroyer(4, 14, D.RIGHT, sqsize));
    this.ships.push(RadarBoat(3, 15, D.RIGHT, sqsize));
    this.ships.push(Cruiser(5, 16, D.RIGHT, sqsize));
    this.ships.push(Destroyer(4, 17, D.RIGHT, sqsize));
    this.ships.push(MineLayer(2, 18, D.RIGHT, sqsize));
    this.ships.push(Torpedo(3, 19, D.RIGHT, sqsize));

    var base = new Base(0, 10, sqsize);

  } 
  else // side == D.RIGHT
  {
      this.ships.push(Destroyer(25, 19, D.LEFT, sqsize));
      this.ships.push(Torpedo(26, 18, D.LEFT, sqsize));
      this.ships.push(Cruiser(24, 17, D.LEFT, sqsize));
      this.ships.push(MineLayer(27, 16, D.LEFT, sqsize));
      this.ships.push(Destroyer(25, 15, D.LEFT, sqsize));
      this.ships.push(RadarBoat(26, 14, D.LEFT, sqsize));
      this.ships.push(Cruiser(24, 13, D.LEFT, sqsize));
      this.ships.push(Destroyer(25, 12, D.LEFT, sqsize));
      this.ships.push(MineLayer(27, 11, D.LEFT, sqsize));
      this.ships.push(Torpedo(26, 10, D.LEFT, sqsize));

      var base = new Base(29, 10, sqsize);
  }

  this.Select = function (x, y) {
      return false; //true if something gets selected, false if nothing is selected
  };

  this.Draw = function (context, color) {
      for (var i = 0; i < this.ships.length; i++) {
          this.ships[i].Draw(context, color);
      }
      base.Draw(context, 'black');
  };

};
