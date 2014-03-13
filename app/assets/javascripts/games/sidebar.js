Button = function(x, y, w, h,text){
	
	this.name = text;
	
	var inactiveColour = 'grey';
	
	this.active = false;
	
	this.Activate = function(){
		this.active = !this.active;
	}
	
	this.Draw = function(ctx,colour){
		
    ctx.fillStyle = colour;
		ctx.fillRect(x, y, w,h, 30);
		
		if(this.active){
			
		}else{
			
		}
	}
	
}

Sidebar = function(ctx){
	
	// top left corner
	this.x = WIDTH;
	this.y = 0;
  
  this.ctx = ctx;
	
	this.buttons = new Array();
  
  var numButtons = 5;
  var spacing = 10;
  var bW = BAR_WIDTH-2*spacing;
  var bH = (WIDTH - 50 -numButtons*spacing)/numButtons;
  
  var x = this.x + spacing;
  var y = this.y + 50 ;
	for (i = 0; i < numButtons; i++) {
    this.buttons.push(new Button(x,y,bW,bH));
    y+=bH+spacing;
  }

	
	this.Draw = function(){
    //ctx.save();
    this.ctx.fillStyle = '#00B25C';
		this.ctx.fillRect(WIDTH, 0, WIDTH+BAR_WIDTH, WIDTH);
		
		// title
		ctx.fillStyle = 'black';
		ctx.font = 'bold 12pt Calibri';
		ctx.fillText('Available', WIDTH+15, 20);
		ctx.fillText('Moves', WIDTH+25, 40);
    
		// buttons
		for (i = 0; i < this.buttons.length; i++) {
			this.buttons[i].Draw(ctx,"orange");
		}

		
    
	};
};
