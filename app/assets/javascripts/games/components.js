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
    if (facing == D.Right) 
    {
      this.x = bx-b;
      this.y = by-Math.floor(this.h/2);
    } 
    else if (facing == D.Left) 
    {
      this.x = bx+b-this.w+1;
      this.y = by-Math.floor(this.h/2);
    } 
    else if (facing == D.Up) 
    {
      this.x = bx-Math.floor(this.h/2);
      this.y = by-b;
    } 
    else if (facing == D.Down) 
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

  // 'facing' indicates ship direction: D.Left D.Right D.Up D.Down

  var t = SQ_WIDTH / 2;
  this.sternx = (x) * SQ_WIDTH; // bow tip coordinates
  this.sterny = (y) * SQ_WIDTH;
  
  
  
  this.radar = radar;

  this.points = new Array();

  // spacing 
  var s = 4;

  if (facing == D.Right) {
	  this.points.push(new Point(this.sternx+s,this.sterny+s));
      this.points.push(new Point(this.sternx+s,this.sterny+SQ_WIDTH-s));
      this.points.push(new Point(this.sternx+(length-1)*SQ_WIDTH,this.sterny+SQ_WIDTH-s));
      this.points.push(new Point(this.sternx+(length)*SQ_WIDTH-t,this.sterny+t));
      this.points.push(new Point(this.sternx+(length-1)*SQ_WIDTH,this.sterny+s));
  } else if (facing == D.Left) {
	  this.points.push(new Point(this.sternx+SQ_WIDTH-s,this.sterny+s));
      this.points.push(new Point(this.sternx+SQ_WIDTH-s,this.sterny+SQ_WIDTH-s));
      this.points.push(new Point(this.sternx-(length-2)*SQ_WIDTH,this.sterny+SQ_WIDTH-s));
      this.points.push(new Point(this.sternx-(length-1)*SQ_WIDTH+t,this.sterny+t));
      this.points.push(new Point(this.sternx-(length-2)*SQ_WIDTH,this.sterny+s));
  } else if (facing == D.Up) {
	  this.points.push(new Point(this.sternx+s,this.sterny+SQ_WIDTH-s));
      this.points.push(new Point(this.sternx+SQ_WIDTH-s,this.sterny+SQ_WIDTH-s));
      this.points.push(new Point(this.sternx+SQ_WIDTH-s,this.sterny-(length-2)*SQ_WIDTH));
      this.points.push(new Point(this.sternx+t,this.sterny-(length-1)*SQ_WIDTH+t));
      this.points.push(new Point(this.sternx+s,this.sterny-(length-2)*SQ_WIDTH));
  } else if (facing == D.Down) {
      this.points.push(new Point(this.sternx+s,this.sterny+s));
      this.points.push(new Point(this.sternx+SQ_WIDTH-s,this.sterny+s));
      this.points.push(new Point(this.sternx+SQ_WIDTH-s,this.sterny+(length-1)*SQ_WIDTH));
      this.points.push(new Point(this.sternx+t,this.sterny+(length)*SQ_WIDTH-t));
      this.points.push(new Point(this.sternx+s,this.sterny+(length-1)*SQ_WIDTH));
  }

  this.Forward = function (a) {
    if (facing == D.Right) {
        for (var i = 0; i < 5; i++) {
            this.points[i].x += SQ_WIDTH * a;
        }
    } else if (facing == D.Left) {
        for (var i = 0; i < 5; i++) {
            this.points[i].x -= SQ_WIDTH * a;
        }
    } else if (facing == D.Up) {
        for (var i = 0; i < 5; i++) {
            this.points[i].y -= SQ_WIDTH * a;
        }
    } else if (facing == D.Down) {
        for (var i = 0; i < 5; i++) {
            this.points[i].y += SQ_WIDTH * a;
        }
    }
  }
  this.Backward = function () {
      if (facing == D.Right) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x -= SQ_WIDTH;
          }
      } else if (facing == D.Left) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x += SQ_WIDTH;
          }
      } else if (facing == D.Up) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y += SQ_WIDTH;
          }
      } else if (facing == D.Down) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y -= SQ_WIDTH;
          }
      }
  }
  this.Left = function () {
      if (facing == D.Right) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y -= SQ_WIDTH;
          }
      } else if (facing == D.Left) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y += SQ_WIDTH;
          }
      } else if (facing == D.Up) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x -= SQ_WIDTH;
          }
      } else if (facing == D.Down) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x += SQ_WIDTH;
          }
      }
  }
  this.Right = function () {
      if (facing == D.Right) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y += SQ_WIDTH;
          }
      } else if (facing == D.Left) {
          for (var i = 0; i < 5; i++) {
              this.points[i].y -= SQ_WIDTH;
          }
      } else if (facing == D.Up) {
          for (var i = 0; i < 5; i++) {
              this.points[i].x += SQ_WIDTH;
          }
      } else if (facing == D.Down) {
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

TorpedoBoat = function (x, y, facing) {
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

Fleet = function (turn) {
  this.ships = new Array();

  var all_ships = $('#game-data').data("ships")

  for (each in all_ships) {
    var ship = all_ships[each];
    if (ship.turn == turn) {
      this.ships.push(ShipType[ship.shiptype_id](ship.location_x, ship.location_y, D[ship.direction]))
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
