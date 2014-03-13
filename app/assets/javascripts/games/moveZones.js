DrawRotationZone = function (ship, ctx){

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

	if(ship.facing == D.Right) {}
	else if(ship.facing == D.Up) {}
	else if(ship.facing == D.Left) {}
	else if(ship.facing == D.Down) {}


	if( ship.turnSpeed == 1 || ship.turnSpeed == 2)
	{
		// Draw left
		var lShip = new Ship(ship.x + lXOffset, ship.y + lYOffset, ship.length, ship.speed, lFace, ship.radarzone, ship.cannonzone, ship.health, ship.armor, ship.turnSpeed, ship.turnIndex)

		lShip.Draw(ctx, 'translucentYellow', false)
		// Draw right
		var lShip = new Ship(ship.x + rXOffset, ship.y + rYOffset, ship.length, ship.speed, rFace, ship.radarzone, ship.cannonzone, ship.health, ship.armor, ship.turnSpeed, ship.turnIndex)

		rShip.Draw(ctx, 'translucentYellow', false)
	}
	if(ship.turnSpeed == 2)
	{
		if(ship.facing == D.Right) var bFace = D.Left
		else if(ship.facing == D.Up) var bFace = D.Down
		else if(ship.facing == D.Left) var bFace = D.Right
		else if(ship.facing == D.Down) var bFace = D.Up
		// Draw behind

	}

      	
}