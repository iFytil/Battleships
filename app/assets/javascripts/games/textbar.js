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

  this.write = function() {
    //messages

    document.getElementById("message_stream").innerHTML = ""
    var moves = GAME_DATA.moves;
    var len = GAME_DATA.moves.length;

    for (var i = len-1; i >= 0; i--)
      this.Message(GAME_DATA.moves[i].message);
  }

};
