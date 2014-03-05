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
        if (facing == 'right') {
            this.x = bx-b;
            this.y = by-Math.floor(this.h/2);
        } else if (facing == 'left') {
            this.x = bx+b-this.w+1;
            this.y = by-Math.floor(this.h/2);
        } else if (facing == 'up') {
            this.x = bx-Math.floor(this.h/2);
            this.y = by-b;
        } else if (facing == 'down') {
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

    // 'facing' indicates ship direction: 'left' 'right' 'up' 'down'

    var t = sqsize / 2;
    var bowx = (x) * sqsize + t; // bow tip coordinates
    var bowy = (y) * sqsize + t;
    
    this.radar = radar;

    this.points = new Array();

    // spacing 
    var s = 4;

    if (facing == 'right') {
        this.points.push(new Point(bowx - t, bowy - t + s));
        this.points.push(new Point(bowx, bowy));
        this.points.push(new Point(bowx - t, bowy + t - s));
        this.points.push(new Point(bowx - t - (length - 1) * sqsize + s, bowy + t - s));
        this.points.push(new Point(bowx - t - (length - 1) * sqsize + s, bowy - t + s));
    } else if (facing == 'left') {
        this.points.push(new Point(bowx + t, bowy + t - s));
        this.points.push(new Point(bowx, bowy));
        this.points.push(new Point(bowx + t, bowy - t + s));
        this.points.push(new Point(bowx + t + (length - 1) * sqsize - s, bowy - t + s));
        this.points.push(new Point(bowx + t + (length - 1) * sqsize - s, bowy + t - s));
    } else if (facing == 'up') {
        this.points.push(new Point(bowx - t + s, bowy + t));
        this.points.push(new Point(bowx, bowy));
        this.points.push(new Point(bowx + t - s, bowy + t));
        this.points.push(new Point(bowx + t - s, bowy + t + (length - 1) * sqsize - s));
        this.points.push(new Point(bowx - t + s, bowy + t + (length - 1) * sqsize - s));
    } else if (facing == 'down') {
        this.points.push(new Point(bowx - t + s, bowy - t));
        this.points.push(new Point(bowx, bowy));
        this.points.push(new Point(bowx + t - s, bowy - t));
        this.points.push(new Point(bowx + t - s, bowy - t - (length - 1) * sqsize + s));
        this.points.push(new Point(bowx - t + s, bowy - t - (length - 1) * sqsize + s));
    }

    this.Forward = function (a) {
        if (facing == 'right') {
            for (var i = 0; i < 5; i++) {
                this.points[i].x += sqsize * a;
            }
        } else if (facing == 'left') {
            for (var i = 0; i < 5; i++) {
                this.points[i].x -= sqsize * a;
            }
        } else if (facing == 'up') {
            for (var i = 0; i < 5; i++) {
                this.points[i].y -= sqsize * a;
            }
        } else if (facing == 'down') {
            for (var i = 0; i < 5; i++) {
                this.points[i].y += sqsize * a;
            }
        }
    }
    this.Backward = function () {
        if (facing == 'right') {
            for (var i = 0; i < 5; i++) {
                this.points[i].x -= sqsize;
            }
        } else if (facing == 'left') {
            for (var i = 0; i < 5; i++) {
                this.points[i].x += sqsize;
            }
        } else if (facing == 'up') {
            for (var i = 0; i < 5; i++) {
                this.points[i].y += sqsize;
            }
        } else if (facing == 'down') {
            for (var i = 0; i < 5; i++) {
                this.points[i].y -= sqsize;
            }
        }
    }
    this.Left = function () {
        if (facing == 'right') {
            for (var i = 0; i < 5; i++) {
                this.points[i].y -= sqsize;
            }
        } else if (facing == 'left') {
            for (var i = 0; i < 5; i++) {
                this.points[i].y += sqsize;
            }
        } else if (facing == 'up') {
            for (var i = 0; i < 5; i++) {
                this.points[i].x -= sqsize;
            }
        } else if (facing == 'down') {
            for (var i = 0; i < 5; i++) {
                this.points[i].x += sqsize;
            }
        }
    }
    this.Right = function () {
        if (facing == 'right') {
            for (var i = 0; i < 5; i++) {
                this.points[i].y += sqsize;
            }
        } else if (facing == 'left') {
            for (var i = 0; i < 5; i++) {
                this.points[i].y -= sqsize;
            }
        } else if (facing == 'up') {
            for (var i = 0; i < 5; i++) {
                this.points[i].x += sqsize;
            }
        } else if (facing == 'down') {
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


Cruiser = function (x, y, facing, sqsize, gridsize) {
    var r = new RadarRange(x, y,3, 10, 3,facing);
    return new Ship(x, y, 10, r, 5, facing, sqsize);
};
Destroyer = function (x, y, facing, sqsize, gridsize) {
    var r = new RadarRange(x, y,2, 8, 3,facing);
    return new Ship(x, y, 8, r, 4, facing, sqsize);
};

Torpedo = function (x, y, facing, sqsize, gridsize) {
    var r = new RadarRange(x, y,1, 6, 3,facing);
    return new Ship(x, y, 9, r, 3, facing, sqsize);
};

MineLayer = function (x, y, facing, sqsize, gridsize) {
    var r = new RadarRange(x, y,3, 6, 5,facing);
    return new Ship(x, y, 6, r, 2, facing, sqsize);
};

RadarBoat = function (x, y, facing, sqsize, gridsize) {
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

Fleet = function (side, sqsize, gridn) {
    this.ships = new Array();

    if (side == 'left') {
        this.ships.push(Destroyer(4, 10, 'right', sqsize, gridn));
        this.ships.push(Torpedo(3, 11, 'right', sqsize, gridn));
        this.ships.push(Cruiser(5, 12, 'right', sqsize, gridn));
        this.ships.push(MineLayer(2, 13, 'right', sqsize, gridn));
        this.ships.push(Destroyer(4, 14, 'right', sqsize, gridn));
        this.ships.push(RadarBoat(3, 15, 'right', sqsize, gridn));
        this.ships.push(Cruiser(5, 16, 'right', sqsize, gridn));
        this.ships.push(Destroyer(4, 17, 'right', sqsize, gridn));
        this.ships.push(MineLayer(2, 18, 'right', sqsize, gridn));
        this.ships.push(Torpedo(3, 19, 'right', sqsize, gridn));

        var base = new Base(0, 10, sqsize);

    } else // side == 'right'
    {
        this.ships.push(Destroyer(25, 19, 'left', sqsize, gridn));
        this.ships.push(Torpedo(26, 18, 'left', sqsize, gridn));
        this.ships.push(Cruiser(24, 17, 'left', sqsize, gridn));
        this.ships.push(MineLayer(27, 16, 'left', sqsize, gridn));
        this.ships.push(Destroyer(25, 15, 'left', sqsize, gridn));
        this.ships.push(RadarBoat(26, 14, 'left', sqsize, gridn));
        this.ships.push(Cruiser(24, 13, 'left', sqsize, gridn));
        this.ships.push(Destroyer(25, 12, 'left', sqsize, gridn));
        this.ships.push(MineLayer(27, 11, 'left', sqsize, gridn));
        this.ships.push(Torpedo(26, 10, 'left', sqsize, gridn));

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
