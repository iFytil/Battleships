Textbar = function(){
  
  // top left corner
  this.x = WIDTH;
  this.y = 0;
  
  this.message = "Look here for notifications!";

	this.Message = function(text){
		this.message = text;
        var msgstr = document.getElementById("message_stream");
        var newnode = "<div><label>"+ this.message + "</label></div>"
         msgstr.innerHTML = newnode + msgstr.innerHTML;
	}
  
  this.Draw = function(){
 
    //ctx.fillStyle = 'white';
    //ctx.fillRect(0, WIDTH, WIDTH+BAR_WIDTH, WIDTH+TEXT_BAR_WIDTH);
    // title
    //ctx.fillStyle = '#24262A';
    //ctx.textAlign = 'center';
    //ctx.font = 'bold 16pt Calibri';
    //ctx.fillText(this.message, (WIDTH+BAR_WIDTH)/2, HEIGHT+25);
  };
};
