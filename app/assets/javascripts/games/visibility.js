Visibility = function(n,ranges) {
    
  this.ranges = ranges;
    
  // start with complete invisibility
  var c = new Array();

  this.Set=function()
  {
    //start off blank
    for (var i = 0; i < n*n; i++) 
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
          c[y+n*x] = 0;
        }
      }
    }
  }

  this.Set();
       
  this.Draw = function(context,color,sqw)
  {
    for (var i =0; i < n; i++) 
      {
        for (var j = 0; j < n; j++) 
        {
          if (c[j + i * n] == 1) 
          {
            context.beginPath();
            context.rect(i * sqw, j * sqw, sqw, sqw);
            context.fillStyle = color;
            context.fill();
          }
        }
      } 
  }
}
