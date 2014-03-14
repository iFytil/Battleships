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
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.closePath();
    ctx.stroke();
  }
  

};

Ship = function (ship, radar, cannon, torpedo) {

  // 'facing' indicates ship direction: D.Left D.Right D.Up D.Down

  var t = SQ_WIDTH / 2;

  this.data = ship

  this.length     = ship.shiptype.size;
  this.x          = ship.location_x
  this.y          = ship.location_y
  this.turnSpeed  = ship.shiptype.turn_speed;
  this.turnIndex  = ship.shiptype.turn_index;
  this.speed      = ship.shiptype.speed;
  this.facing     = D[ship.direction];
  this.radarzone  = radar;
  this.cannonzone = cannon;
  this.health     = ship.health;
  this.armor      = ship.shiptype.armor;
  this.torpedozone= torpedo;  

  this.points = new Array();

  // spacing 
  var s = 4;

  this.Set = function() {
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
      this.points[i] = new Point(this.x+i*dx, this.y+i*dy)
    }
  }
  this.Set();

  this.highlighted = false;

  this.Draw = function (ctx, color, damage) {

      ctx.beginPath()
      ctx.fillStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeStyle = (this.highlighted && this.data.turn==pid) ? 'black' : color
      for (each in this.points) {
        var pt = this.points[each];
        ctx.rect(pt.x*SQ_WIDTH, pt.y*SQ_WIDTH, SQ_WIDTH, SQ_WIDTH);
      }
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

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
      this.radarzone.Draw(ctx, 'yellow');
  }

  // Duplicate!
  this.Duplicate = function(){
    return new Ship(ship, radar, cannon, torpedo);
  }


};

Base = function (x, y) {

  var x0 = x * SQ_WIDTH;
  var y0 = y * SQ_WIDTH;
  
  // visibiltiy
  this.radarzone = new Range(x,y,-1, 3, 12,D.Down);

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
      var torpedo = new Range(ship.location_x, ship.location_y, type.size, 1, 10, D[ship.direction])

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

  this.Draw = function (ctx, color) {

      for (var i = 0; i < this.ships.length; i++) {
          this.ships[i].Draw(ctx, color, true);
      }
      this.base.Draw(ctx, color);
      this.base.radarzone.Draw(ctx, color);
  };

};
