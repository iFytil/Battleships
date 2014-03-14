Textbar = function(ctx){
  
  // top left corner
  this.x = WIDTH;
  this.y = 0;
  
  this.message = "Look here for notifications!";
  
  this.ctx = ctx;

	this.Message = function(text){
		this.message = text;
	}
  
  this.Draw = function(){
 
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, WIDTH, WIDTH+BAR_WIDTH, WIDTH+TEXT_BAR_WIDTH);
    
    // title
    ctx.fillStyle = '#24262A';
    ctx.textAlign = 'center';
    ctx.font = 'bold 16pt Calibri';
    ctx.fillText(this.message, (WIDTH+BAR_WIDTH)/2, HEIGHT+25);
    
  };
};
