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

	var color = "rgb(255,255,0)"

	if( ship.turnSpeed == 1 || ship.turnSpeed == 2)
	{
		// Get points for left turn zone
		lShip.x += lXOffset;
		lShip.y += lYOffset;
		lShip.facing = lFace;
		lShip.Set();

		var lPoint1 = lShip.points[2];
		var lPoint2 = lShip.points[3];
		var lPoint3 = lShip.points[4];

		// Get points for right turn zone
		rShip.x += rXOffset;
		rShip.y += rYOffset;
		rShip.facing = rFace;
		rShip.Set();

		var rPoint1 = rShip.points[2];
		var rPoint2 = rShip.points[3];
		var rPoint3 = rShip.points[4];
	}

	if(ship.turnSpeed == 2)
	{
		// Get points for turn around zone
		bShip.x += bXOffset;
		bShip.y += bYOffset;
		bShip.facing = bFace;
		bShip.Set();

		var bPoint1 = bShip.points[2];
		var bPoint2 = bShip.points[3];
		var bPoint3 = bShip.points[4];
	}

	// Draw rotate zone
	drawTriangle(lPoint1, lPoint2, lPoint3, ctx, color)
	drawTriangle(rPoint1, rPoint2, rPoint3, ctx, color)
	if(ship.turnSpeed == 2) {drawTriangle(bPoint1, bPoint2, bPoint3, ctx, color)}
      	
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

	// Get points for left move zone
	lShip.x += lXOffset;
	lShip.y += lYOffset;
	lShip.Set();

	var lPoint1 = lShip.points[2];
	var lPoint2 = lShip.points[3];
	var lPoint3 = lShip.points[4];

	// Get points for right turn zone
	rShip.x += rXOffset;
	rShip.y += rYOffset;
	rShip.Set();

	var rPoint1 = rShip.points[2];
	var rPoint2 = rShip.points[3];
	var rPoint3 = rShip.points[4];

	// Get points for backwards move zone
	bShip.x += bXOffset;
	bShip.y += bYOffset;
	bShip.Set();

	var bPoint1 = bShip.points[2];
	var bPoint2 = bShip.points[3];
	var bPoint3 = bShip.points[4];

	var color = "rgb(255,255,0)"

	// Draw left, right, backwards zones
	drawTriangle(lPoint1, lPoint2, lPoint3, ctx, color)
	drawTriangle(rPoint1, rPoint2, rPoint3, ctx, color)
	drawTriangle(bPoint1, bPoint2, bPoint3, ctx, color)

	// Get points for and draw forward move zone
	for(var i = 0; i < ship.speed; i++)
	{
		fShip.x += fXOffset;
		fShip.y += fYOffset;
		fShip.Set();

		var fPoint1 = fShip.points[2];
		var fPoint2 = fShip.points[3];
		var fPoint3 = fShip.points[4];

		drawTriangle(fPoint1, fPoint2, fPoint3, ctx, color)
	}
}

function drawTriangle(point1, point2, point3, ctx, color)
{
	ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.lineTo(point3.x, point3.y);
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
}



