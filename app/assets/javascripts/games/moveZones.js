RotationZone = function (ship){

	if(ship.facing == D.Right) {
		var lFace = D.Up; 
		var lXOffset = ship.turnIndex; 
		var lYOffset = ship.turnIndex

		var rFace = D.Down; 
		var rXOffset = ship.turnIndex; 
		var rYOffset = -ship.turnIndex
	}
	else if(ship.facing == D.Up) {
		var lFace = D.Left; 
		var lXOffset = ship.turnIndex; 
		var lYOffset = -ship.turnIndex;

		var rFace = D.Right; 
		var rXOffset = -ship.turnIndex; 
		var rYOffset = -ship.turnIndex;
	}
	else if(ship.facing == D.Left) {
		var lFace = D.Down; 
		var lXOffset = -ship.turnIndex; 
		var lYOffset = -ship.turnIndex;

		var rFace = D.Up; 
		var rXOffset = -ship.turnIndex; 
		var rYOffset = ship.turnIndex
	}
	else if(ship.facing == D.Down) {
		var lFace = D.Right; 
		var lXOffset = -ship.turnIndex; 
		var lYOffset = ship.turnIndex;

		var rFace = D.Left;
		var rXOffset = ship.turnIndex; 
		var rYOffset = ship.turnIndex;
	}

	if( ship.turnSpeed == 2 )
	{
		if(ship.facing == D.Right) {
			var bFace = D.Left;
			var bXOffset = ship.turnIndex * 2;
			var bYOffset = 0;
		}
		else if(ship.facing == D.Up) {
			var bFace = D.Down;
			var bXOffset = 0;
			var bYOffset = -ship.turnIndex * 2;
		}
		else if(ship.facing == D.Left) {
			var bFace = D.Right
			var bXOffset = -ship.turnIndex * 2;
			var bYOffset = 0;
		}
		else if(ship.facing == D.Down) {
			var bFace = D.Up
			var bXOffset = 0;
			var bYOffset = ship.turnIndex * 2;
		}

		var bShip = ship.Duplicate();
	}

	var lShip = ship.Duplicate();
	var rShip = ship.Duplicate();

	var length = ship.length;

	this.array = new Array();

	if( ship.turnSpeed == 1 || ship.turnSpeed == 2)
	{
		// Get points for left turn zone
		lShip.x += lXOffset;
		lShip.y += lYOffset;
		lShip.facing = lFace;
		lShip.Set();

		var lPoint = lShip.points[length-1];

		this.array.push(new Point(lPoint.x, lPoint.y))

		// Get points for right turn zone
		rShip.x += rXOffset;
		rShip.y += rYOffset;
		rShip.facing = rFace;
		rShip.Set();

		var rPoint = rShip.points[length-1];

		this.array.push(new Point(rPoint.x, rPoint.y))
	}

	if(ship.turnSpeed == 2)
	{
		// Get points for turn around zone
		bShip.x += bXOffset;
		bShip.y += bYOffset;
		bShip.facing = bFace;
		bShip.Set();

		var bPoint = bShip.points[length-1]

		this.array.push(new Point(bPoint.x, bPoint.y))
	}

	// Draw rotate zone
	this.Draw = function(ctx)
	{
		ctx.beginPath()
	    for(var i = 0; i < this.array.length; i++){ctx.rect(this.array[i].x*SQ_WIDTH + SQ_WIDTH/4, this.array[i].y*SQ_WIDTH + SQ_WIDTH/4, SQ_WIDTH/2, SQ_WIDTH/2);}
		ctx.strokeStyle = "rgb(255,255,255)"
		ctx.fillStyle = "white"
		ctx.stroke()
		ctx.fill()
		ctx.closePath()
	}
      	
    this.GetPoints = function()
  	{
		return this.array
	}
}

TranslationZone = function(ship){
	if(ship.facing == D.Right) {
		var lXOffset = 0; 
		var lYOffset = -1;

		var rXOffset = 0;
		var rYOffset = 1;

		var bXOffset = -1;
		var bYOffset = 0;

		var fXOffset = 1;
		var fYOffset = 0;
	}
	else if(ship.facing == D.Up) {
		var lXOffset = -1;
		var lYOffset = 0;

		var rXOffset = 1; 
		var rYOffset = 0;

		var bXOffset = 0;
		var bYOffset = 1;

		var fXOffset = 0;
		var fYOffset = -1;
	}
	else if(ship.facing == D.Left) {
		var lXOffset = 0; 
		var lYOffset = 1;

		var rXOffset = 0; 
		var rYOffset = -1;

		var bXOffset = 1;
		var bYOffset = 0;

		var fXOffset = -1;
		var fYOffset = 0;
	}
	else if(ship.facing == D.Down) {
		var lXOffset = -1; 
		var lYOffset = 0;

		var rXOffset = 1; 
		var rYOffset = 0;

		var bXOffset = 0;
		var bYOffset = -1;

		var fXOffset = 0;
		var fYOffset = 1;
	}

	var lShip = ship.Duplicate();
	var rShip = ship.Duplicate();
	var bShip = ship.Duplicate();
	var fShip = ship.Duplicate();

	var length = ship.length;

	this.array = new Array();

	// Get points for left move zone
	lShip.x += lXOffset;
	lShip.y += lYOffset;
	lShip.Set();

	var lPoint = lShip.points[0];

	this.array.push(new Point(lPoint.x, lPoint.y))

	// Get points for right turn zone
	rShip.x += rXOffset;
	rShip.y += rYOffset;
	rShip.Set();

	var rPoint = rShip.points[0];

	this.array.push(new Point(rPoint.x, rPoint.y))

	// Get points for backwards move zone
	bShip.x += bXOffset;
	bShip.y += bYOffset;
	bShip.Set();

	var bPoint = bShip.points[0];
	
	this.array.push(new Point(bPoint.x, bPoint.y))

	// Get points for forward move zone
	for(var i = 0; i < ship.speed; i++)
	{
		fShip.x += fXOffset;
		fShip.y += fYOffset;
		fShip.Set();

		var fPoint = fShip.points[0];

		this.array.push(new Point(fPoint.x, fPoint.y))
	}

	// Draw points for move zone
	this.Draw = function(ctx)
	{
		ctx.beginPath()
		ctx.strokeStyle = "rgb(255,255,255)"
		ctx.fillStyle = "white"//"rgb(0,0,255)"
		for(var i = 0; i < this.array.length; i++){ctx.rect(this.array[i].x*SQ_WIDTH + SQ_WIDTH/4, this.array[i].y*SQ_WIDTH + SQ_WIDTH/4, SQ_WIDTH/2, SQ_WIDTH/2);}
		ctx.stroke()
		ctx.fill()
		ctx.closePath()
	}

	this.GetPoints = function()
  	{
  		return this.array;
  	}
}

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

    this.pointTL = new Point(this.x, this.y)
    this.pointTR = new Point(this.x+this.w, this.y)
    this.pointBL = new Point(this.x, this.y+this.h)
    this.pointBR = new Point(this.x+this.w, this.y+this.h)
  }

  this.Set(x,y);
    
  this.Draw = function (ctx, color) {
    ctx.beginPath();
    ctx.moveTo(this.pointTL.x*SQ_WIDTH, this.pointTL.y*SQ_WIDTH);
    ctx.lineTo(this.pointTR.x*SQ_WIDTH, this.pointTR.y*SQ_WIDTH);
    ctx.lineTo(this.pointBR.x*SQ_WIDTH, this.pointBR.y*SQ_WIDTH);
    ctx.lineTo(this.pointBL.x*SQ_WIDTH, this.pointBL.y*SQ_WIDTH);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.closePath();
    ctx.stroke();
  }
  
  this.GetPoints = function()
  {
  	this.array = new Array()

  	for(var i = 0; i < this.h; i++)
  	{
  		for(var j = 0; j < this.w; j++)
  		{
  			this.array.push(new Point(this.pointTL.x + j, this.pointTL.y + i))
  		}
  	}

  	return this.array
  }
};

