Visibility = function(ranges) {
    
  this.ranges = ranges;
    
  // start with complete invisibility
  var c = new Array();

  this.Set=function()
  {
    //start off blank
    for (var i = 0; i < N*N; i++) 
    {
      c[i] = 1; //blocked
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
          c[y+N*x] = 0;
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
          if (c[j + i * N] == 1) 
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
