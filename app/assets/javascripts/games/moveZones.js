DrawRotationZone = function (ship, ctx){

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

	if( ship.turnSpeed == 1 || ship.turnSpeed == 2)
	{
		// Get points for left turn zone
		lShip.x += lXOffset;
		lShip.y += lYOffset;
		lShip.facing = lFace;
		lShip.Set();

		var lPoint = lShip.points[length-1];

		// Get points for right turn zone
		rShip.x += rXOffset;
		rShip.y += rYOffset;
		rShip.facing = rFace;
		rShip.Set();

		var rPoint = rShip.points[length-1];
	}

	if(ship.turnSpeed == 2)
	{
		// Get points for turn around zone
		bShip.x += bXOffset;
		bShip.y += bYOffset;
		bShip.facing = bFace;
		bShip.Set();

		var bPoint = bShip.points[length-1]
	}

	// Draw rotate zone
	ctx.beginPath()
    ctx.rect(lPoint.x*SQ_WIDTH + SQ_WIDTH/4, lPoint.y*SQ_WIDTH + SQ_WIDTH/4, SQ_WIDTH/2, SQ_WIDTH/2);
    ctx.rect(rPoint.x*SQ_WIDTH + SQ_WIDTH/4, rPoint.y*SQ_WIDTH + SQ_WIDTH/4, SQ_WIDTH/2, SQ_WIDTH/2);
	if(ship.turnSpeed == 2) {ctx.rect(bPoint.x*SQ_WIDTH + SQ_WIDTH/4, bPoint.y*SQ_WIDTH + SQ_WIDTH/4, SQ_WIDTH/2, SQ_WIDTH/2);}
	ctx.strokeStyle = "rgb(255,255,255)"
	ctx.fillStyle = "rgb(0,0,255)"
	ctx.stroke()
	ctx.fill()
	ctx.closePath()
      	
}

DrawTranslationZone = function(ship, ctx){
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

	// Get points for left move zone
	lShip.x += lXOffset;
	lShip.y += lYOffset;
	lShip.Set();

	var lPoint = lShip.points[length-1];

	// Get points for right turn zone
	rShip.x += rXOffset;
	rShip.y += rYOffset;
	rShip.Set();

	var rPoint = rShip.points[length-1];

	// Get points for backwards move zone
	bShip.x += bXOffset;
	bShip.y += bYOffset;
	bShip.Set();

	var bPoint = bShip.points[length-1];

	// Draw left, right, backwards zones
	ctx.beginPath()
	ctx.strokeStyle = "rgb(255,255,255)"
	ctx.fillStyle = "rgb(0,0,255)"
	ctx.rect(lPoint.x*SQ_WIDTH + SQ_WIDTH/4, lPoint.y*SQ_WIDTH + SQ_WIDTH/4, SQ_WIDTH/2, SQ_WIDTH/2);
    ctx.rect(rPoint.x*SQ_WIDTH + SQ_WIDTH/4, rPoint.y*SQ_WIDTH + SQ_WIDTH/4, SQ_WIDTH/2, SQ_WIDTH/2);
    ctx.rect(bPoint.x*SQ_WIDTH + SQ_WIDTH/4, bPoint.y*SQ_WIDTH + SQ_WIDTH/4, SQ_WIDTH/2, SQ_WIDTH/2);

	// Get points for and draw forward move zone
	for(var i = 0; i < ship.speed; i++)
	{
		fShip.x += fXOffset;
		fShip.y += fYOffset;
		fShip.Set();

		var fPoint = fShip.points[length-1];

    	ctx.rect(fPoint.x*SQ_WIDTH + SQ_WIDTH/4, fPoint.y*SQ_WIDTH + SQ_WIDTH/4, SQ_WIDTH/2, SQ_WIDTH/2);
	}

	ctx.stroke()
	ctx.fill()
	ctx.closePath()
}



