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
	}

	var color = "rgb(255,255,0)"

	if( ship.turnSpeed == 1 || ship.turnSpeed == 2)
	{
		// Get points for left turn zone
		var lShip = new Ship(ship.x + lXOffset, ship.y + lYOffset, ship.length, ship.speed, lFace, ship.radarzone, ship.cannonzone, ship.health, ship.armor, ship.turnSpeed, ship.turnIndex)

		var lPoint1 = lShip.points[2];
		var lPoint2 = lShip.points[3];
		var lPoint3 = lShip.points[4];

		// Get points for right turn zone
		var rShip = new Ship(ship.x + rXOffset, ship.y + rYOffset, ship.length, ship.speed, rFace, ship.radarzone, ship.cannonzone, ship.health, ship.armor, ship.turnSpeed, ship.turnIndex)

		var rPoint1 = rShip.points[2];
		var rPoint2 = rShip.points[3];
		var rPoint3 = rShip.points[4];
	}

	if(ship.turnSpeed == 2)
	{
		// Get points for turn around zone
		var bShip = new Ship(ship.x + bXOffset, ship.y + bYOffset, ship.length, ship.speed, bFace, ship.radarzone, ship.cannonzone, ship.health, ship.armor, ship.turnSpeed, ship.turnIndex)

		var bPoint1 = bShip.points[2];
		var bPoint2 = bShip.points[3];
		var bPoint3 = bShip.points[4];
	}

	drawTriangle(lPoint1, lPoint2, lPoint3, ctx, color)
	drawTriangle(rPoint1, rPoint2, rPoint3, ctx, color)
	if(ship.turnSpeed == 2) {drawTriangle(bPoint1, bPoint2, bPoint3, ctx, color)}

      	
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



