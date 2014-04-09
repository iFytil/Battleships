Visibility = function(ranges) {
    
  this.ranges = ranges;
    
  // start with complete invisibility
  this.field = new Array();

  this.Set=function()
  {
    for (var i = 0; i < N*N; i++) 
    {
      var y = i%N;
      var x = Math.floor(i/N);
      if (!(y>=10 && y<20 && (x==0 || x==29))) {
        this.field[i] = 1; // Block non-base squares
      } else {
        this.field[i] = 0;
      }
    }
    
    // remove visible squares
    for (var k = 0; k<this.ranges.length; k++) 
    {
      for (var i = 0; i < this.ranges[k].w; i++) 
      {
        for (var j = 0; j < this.ranges[k].h; j++) 
        {
          var x = this.ranges[k].x+i;
          var y = this.ranges[k].y+j;

          if(y>-1 && x>-1&& y<30 && x<30)
            this.field[y+N*x] = 0;
        }
      }
    }
  }

  this.Set();
       
  this.Draw = function(color)
  {
    for (var i =0; i < N; i++) 
      {
        for (var j = 0; j < N; j++) 
        {
          if (this.field[j + i * N] == 1) 
          {
            ctx.beginPath();
            ctx.rect(i * SQ_WIDTH, j * SQ_WIDTH, SQ_WIDTH, SQ_WIDTH);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
          }
        }
      } 
  }
}
