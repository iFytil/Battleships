Visibility = function(ranges) {
    
  this.ranges = ranges;
    
  // start with complete invisibility
  this.field = new Array();

  this.Set=function()
  {
    //start off blank
    for (var i = 0; i < N*N; i++) 
    {
      this.field[i] = 1; //blocked
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
          this.field[y+N*x] = 0;
        }
      }
    }
  }

  this.Set();
       
  this.Draw = function(ctx,color)
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
