DrawRotationZone = function (ship){

	if(ship.facing == D.Right) {
		var lFace = D.Up; 
		var lXOffset = ship.turnIndex; 
		var lYOffset = -ship.turnIndex

		var rFace = D.Down; 
		var rXOffset = ship.turnIndex; 
		var rYOffset = ship.turnIndex
	}
	else if(ship.facing == D.Up) {
		var lFace = D.Left; 
		var lXOffset = ship.turnIndex; 
		var lYOffset = ship.turnIndex;

		var rFace = D.Right; 
		var rXOffset = -ship.turnIndex; 
		var rYOffset = ship.turnIndex;
	}
	else if(ship.facing == D.Left) {
		var lFace = D.Down; 
		var lXOffset = -ship.turnIndex; 
		var lYOffset = ship.turnIndex;

		var rFace = D.Up; 
		var rXOffset = -ship.turnIndex; 
		var rYOffset = -ship.turnIndex
	}
	else if(ship.facing == D.Down) {
		var lFace = D.Right; 
		var lXOffset = -ship.turnIndex; 
		var lYOffset = -ship.turnIndex;

		var rFace = D.Left;
		var rXOffset = ship.turnIndex; 
		var rYOffset = -ship.turnIndex;
	}

	var color = "rgba(255,255,0,0.1)";

	if( ship.turnSpeed == 1 || ship.turnSpeed == 2)
	{
		// Draw left
		var lShip = new Ship(ship.x + lXOffset, ship.y + lYOffset, ship.length, ship.speed, lFace, ship.radarzone, ship.cannonzone, ship.health, ship.armor, ship.turnSpeed, ship.turnIndex)

		lShip.Draw(ctx, color, false)

		// Draw left turn radius


		// Draw right
		var rShip = new Ship(ship.x + rXOffset, ship.y + rYOffset, ship.length, ship.speed, rFace, ship.radarzone, ship.cannonzone, ship.health, ship.armor, ship.turnSpeed, ship.turnIndex)

		rShip.Draw(ctx, color, false)

		// Draw right turn radius

	}
	if(ship.turnSpeed == 2)
	{
		if(ship.facing == D.Right) {
			var bFace = D.Left;
			var bXOffset = ship.turnIndex * 2;
			var bYOffset = 0;
		}
		else if(ship.facing == D.Up) {
			var bFace = D.Down;
			var bXOffset = 0;
			var bYOffset = ship.turnIndex * 2;
		}
		else if(ship.facing == D.Left) {
			var bFace = D.Right
			var bXOffset = -ship.turnIndex * 2;
			var bYOffset = 0;
		}
		else if(ship.facing == D.Down) {
			var bFace = D.Up
			var bXOffset = 0;
			var bYOffset = -ship.turnIndex * 2;
		}

		// Draw behind
		var bShip = new Ship(ship.x + bXOffset, ship.y + bYOffset, ship.length, ship.speed, bFace, ship.radarzone, ship.cannonzone, ship.health, ship.armor, ship.turnSpeed, ship.turnIndex)

		bShip.Draw(ctx, color, false)

		// Draw turn around radius

	}
      	
}

