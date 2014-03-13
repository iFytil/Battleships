Environment = function (ctx) {

  var Coral = {
    c: GAME_DATA.coral,

    draw: function() {
      for (var i = 0; i < this.c.length; i++) {
        if (this.c[i] == 1) {
          var x = 10 + i%10   // start_x + i%size_x
          var y = 3 + i%24    // start_y + i%size_y
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
      this.h = SQ_WIDTH;
      this.w = SQ_WIDTH;

      this.draw = function(){
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#254055";
        ctx.strokeRect(this.x, this.y, this.w, this.w);
        ctx.fillStyle = "#66A3D2";
        ctx.fillRect(this.x, this.y, this.w, this.w);
      }

      this.over = function() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.w, this.w);
      }

      this.eleAtPoint = function(ex,ey){
        return ex < this.x + this.w && ex > this.x && ey > this.y && ey < this.y + this.h
      }
    }
  };

  Grid.init()
  Grid.draw()

  this.draw = function () {
    Grid.draw();
    Coral.draw();
  }

  this.Hover = function(ex,ey) {
    Grid.over(ex,ey)
  }
};
