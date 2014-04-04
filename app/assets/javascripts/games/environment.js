Environment = function (ctx) {

  var Coral = {
    c: GAME_DATA.coral,

    draw: function() {
      for (var i = 0; i < this.c.length; i++) {
        if (this.c[i] == 1) {
          var x = 10 + i%10
          var y = 3 + Math.floor(i/10)
          ctx.beginPath();
          ctx.rect(x * SQ_WIDTH, y * SQ_WIDTH, SQ_WIDTH, SQ_WIDTH);
          ctx.fillStyle = '#ff7f50';
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  };

  var Grid = { 

    sq : [],
    dirty : [],
    x : canvas.offsetLeft,
    y : canvas.offsetTop,

    init: function(){
      for(var x = 0.5; x < WIDTH; x += SQ_WIDTH) {
        for(var y = 0.5; y < HEIGHT; y += SQ_WIDTH) {
          var s = new this.square(x,y);
          this.sq.push(s);
        }
      }
    },

    draw: function(){
      for(var i=0; i < this.sq.length; i++) {
        this.sq[i].draw();
      }
      for(var i=0; i < this.dirty.length; i++) {
        this.dirty[i].over();
      }
    },

    differ: function(sq) {
      if (this.dirty.length > 0) {
        return sq.x!=this.dirty[0].x || sq.y!=this.dirty[0].y
      }
      return true;
    },

    clean: function() {
      for(var i=0; i < this.dirty.length; i++)
          this.dirty[i].draw();
      this.dirty = [];
    },

    over: function(ex,ey){
      ex = ex - this.x
      ey = ey - this.y + $(window).scrollTop()
        for(var i=0; i < this.sq.length; i++) {
            if(this.sq[i].eleAtPoint(ex,ey)){
                if (this.differ(this.sq[i])) {
                  this.clean();
                  this.dirty.push(this.sq[i]);
                  this.sq[i].over();
                  break;
                }
            }
         }
    },

    square: function (x,y){
      this.x = x;
      this.y = y;
      this.gx = (x-0.5)/SQ_WIDTH;
      this.gy = (y-0.5)/SQ_WIDTH;
      this.h = SQ_WIDTH;
      this.w = SQ_WIDTH;

      this.draw = function(){
        if(this.isVisible()) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#254055";
          ctx.strokeRect(this.x, this.y, this.w, this.w);
          ctx.fillStyle = "#66A3D2";
          ctx.fillRect(this.x, this.y, this.w, this.w);
        }
      }

      this.over = function() {
        if(this.isVisible()) {
          ctx.fillStyle = "red";
          ctx.fillRect(this.x, this.y, this.w, this.w);
        }
      }

      this.eleAtPoint = function(ex,ey){
        return ex < this.x + this.w && ex > this.x && ey > this.y && ey < this.y + this.h
      }

      this.isVisible = function() {
        return game && !game.V.field[this.gy + 30*this.gx];
      }
    }
  };

  Grid.init()
  Grid.draw()

  this.drawGrid = function () {
    Grid.draw();
  }

  this.drawCoral = function () {
    Coral.draw();
  }

  this.Hover = function(ex,ey) {
    Grid.over(ex,ey)
  }

  this.getSquare = function() {
    if (Grid.dirty.length>0) {
      return new Point((Grid.dirty[0].x-0.5)/SQ_WIDTH, (Grid.dirty[0].y-0.5)/SQ_WIDTH)
    }
    return null;
  }
};
