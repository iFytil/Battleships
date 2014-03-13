Point = function (x, y) {
  this.x = x;
  this.y = y;
};

// relative to stern coordinates
// b = backward offset
Range = function (x,y,back, width, length,facing) {
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

Ship = function (ship, radar, cannon) {

  // 'facing' indicates ship direction: D.Left D.Right D.Up D.Down

  var t = SQ_WIDTH / 2;

  this.data = ship

  this.length     = ship.shiptype.size;
  this.x          = ship.location_x
  this.y          = ship.location_y
  this.turnSpeed  = ship.shiptype.turn_speed;
  this.turnIndex  = ship.shiptype.turn_index;
  this.speed      = ship.shiptype.speed;
  this.sternx     = (this.x) * SQ_WIDTH; // bow tip coordinates
  this.sterny     = (this.y) * SQ_WIDTH;
  this.facing     = D[ship.direction];
  this.radarzone  = radar;
  this.cannonzone = cannon;
  this.health     = ship.health;
  this.armor      = ship.shiptype.armor;
	
  this.points = new Array(this.length);

  // spacing 
  var s = 4;

  this.Set = function(){

    var dx = 0;
    var dy = 0;
    switch (this.facing) {
    case D.Up:
      dy = -1;
      break;
    case D.Down:
      dy = 1;
      break;
    case D.Left:
      dx = -1;
      break;
    case D.Right:
      dx = 1;
      break;
    }
    for (var i = 0; i < this.length; i++) {
      this.points.push(new Point(this.x+i*dx, this.y+i*dy))
    }
  }
  this.Set();

  this.highlighted = false;
  this.Draw = function (ctx, color, damage) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = (this.highlighted) ? 'yellow' : color
      ctx.fillStyle = color;

      for (each in this.points) {
        var pt = this.points[each];
        ctx.fillRect(pt.x*SQ_WIDTH, pt.y*SQ_WIDTH, SQ_WIDTH, SQ_WIDTH);
      }

      // Paint damaged squares black
      if(damage && false)
      {
        for(var i = 0; i < this.length; i++){
            if(parseInt(this.health.charAt(i)) != this.armor)
            {
              var grayLevel = parseInt(this.health.charAt(i))/this.armor;

              var x = Math.floor(grayLevel*255);
              ctx.fillStyle = "rgb("+x+","+x+","+x+")";

              if(i == this.length-1)
              {
                  ctx.beginPath();
                  ctx.moveTo(this.points[2].x, this.points[2].y);
                  ctx.lineTo(this.points[3].x, this.points[3].y);
                  ctx.lineTo(this.points[4].x, this.points[4].y);
                  ctx.closePath();
                  ctx.fill();
              } 
              else{
                  if (this.facing == D.Right) 
                  {
                    ctx.beginPath();
                    ctx.moveTo(this.points[0].x + i*SQ_WIDTH, this.points[0].y);
                    ctx.lineTo(this.points[1].x + i*SQ_WIDTH, this.points[1].y);
                    ctx.lineTo(this.points[1].x + (i+1)*SQ_WIDTH-s, this.points[1].y);
                    ctx.lineTo(this.points[0].x + (i+1)*SQ_WIDTH-s, this.points[0].y);
                    ctx.closePath();
                    ctx.fill();
                  } 
                  else if (this.facing == D.Left) 
                  {
                    ctx.beginPath();
                    ctx.moveTo(this.points[0].x - i*SQ_WIDTH, this.points[0].y);
                    ctx.lineTo(this.points[1].x - i*SQ_WIDTH, this.points[1].y);
                    ctx.lineTo(this.points[1].x - (i+1)*SQ_WIDTH+s, this.points[1].y);
                    ctx.lineTo(this.points[0].x - (i+1)*SQ_WIDTH+s, this.points[0].y);
                    ctx.closePath();
                    ctx.fill();
                  } 
                  else if (this.facing == D.Up) 
                  {
                    ctx.beginPath();
                    ctx.moveTo(this.points[0].x, this.points[0].y - i*SQ_WIDTH);
                    ctx.lineTo(this.points[1].x, this.points[1].y - i*SQ_WIDTH);
                    ctx.lineTo(this.points[1].x, this.points[1].y - (i+1)*SQ_WIDTH+s);
                    ctx.lineTo(this.points[0].x, this.points[0].y - (i+1)*SQ_WIDTH+s);
                    ctx.closePath();
                    ctx.fill();
                  } 
                  else if (this.facing == D.Down) 
                  {
                    ctx.beginPath();
                    ctx.moveTo(this.points[0].x, this.points[0].y + i*SQ_WIDTH);
                    ctx.lineTo(this.points[1].x, this.points[1].y + i*SQ_WIDTH);
                    ctx.lineTo(this.points[1].x, this.points[1].y + (i+1)*SQ_WIDTH-s);
                    ctx.lineTo(this.points[0].x, this.points[0].y + (i+1)*SQ_WIDTH-s);
                    ctx.closePath();
                    ctx.fill();
                  }
              }
            }
        }
      }
      this.radarzone.Draw(ctx, 'yellow');
      this.cannonzone.Draw(ctx, 'orange');
  }

};

Base = function (x, y) {

  var x0 = x * SQ_WIDTH;
  var y0 = y * SQ_WIDTH;

  this.Draw = function (ctx, color) {
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
      var radar = new Range(ship.location_x, ship.location_y, type.radar_back, type.radar_w, type.radar_l, D[ship.direction])
      var cannon = new Range(ship.location_x, ship.location_y, type.cannon_back, type.cannon_w, type.cannon_l, D[ship.direction])
      this.ships.push(new Ship(ship, radar, cannon))
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

  this.Draw = function (ctx, color) {
    for (var i = 0; i < this.ships.length; i++) {
        this.ships[i].Draw(ctx, color, true);
    }
    base.Draw(ctx, color);
  };

};
