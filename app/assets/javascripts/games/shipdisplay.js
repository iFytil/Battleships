ShipDisplay = function(){

  this.map = {
    Cruiser: 0,
    Destroyer: 1,
    TorpedoBoat: 2,
    RadarBoat: 3,
    RadarBoatExtended: 3,
    MineLayer: 4,
    KamikazeBoat: 5
  }

  // arrays of images
  this.green = Array();
  this.blue = Array();
  for(var i=0;i<6;i++){
    this.green[i] = new Image();
    this.blue[i] = new Image();
  }
  
  this.ship = new Image();

  this.Set = function(color,current) {
    var stripped = current.replace(/\s+/g, '');
    if (color == Color.Green){
      this.ship = this.green[this.map[stripped]];
    }else if (color == Color.Blue){
      this.ship = this.blue[this.map[stripped]];
    }
  }

  this.Draw = function(current, color) {

    var x = current.x*SQ_WIDTH;
    var y = current.y*SQ_WIDTH;
    var dir = current.facing;

    this.Set(color,current.name);

    if(dir == Dir.Up){
      ctx.save();
      ctx.translate(x+SQ_WIDTH,y+SQ_WIDTH);
      ctx.rotate(-90*Math.PI/180);
      ctx.drawImage(this.ship,0,-this.ship.height);
      ctx.restore();
    }else if(dir == Dir.Down){
      ctx.save();
      ctx.translate(x,y);
      ctx.rotate(90*Math.PI/180);
      ctx.drawImage(this.ship,0,-this.ship.height);
      ctx.restore();
    }else if(dir == Dir.Left){
      ctx.save();
      ctx.translate(x+SQ_WIDTH,y);
      ctx.rotate(180*Math.PI/180);
      ctx.drawImage(this.ship,0,-this.ship.height);
      ctx.restore();
    }else{
      ctx.drawImage(this.ship, x, y);
    }
  };

  // green
  this.green[0].src = "/assets/green/cruiser.png";
  this.green[1].src = "/assets/green/destroyer.png";
  this.green[2].src = "/assets/green/torpedo.png";
  this.green[3].src = "/assets/green/radar.png";
  this.green[4].src = "/assets/green/mine.png";
  this.green[5].src = "/assets/green/kamikaze.png";

  // blue
  this.blue[0].src = "/assets/blue/cruiser.png";
  this.blue[1].src = "/assets/blue/destroyer.png";
  this.blue[2].src = "/assets/blue/torpedo.png";
  this.blue[3].src = "/assets/blue/radar.png";
  this.blue[4].src = "/assets/blue/mine.png";
  this.blue[5].src = "/assets/blue/kamikaze.png";

}
