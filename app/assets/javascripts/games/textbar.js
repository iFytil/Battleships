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
};
