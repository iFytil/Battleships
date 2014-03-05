Environment = function (context) {
    
  Ocean = function () {
    context.rect(0, 0, WIDTH, WIDTH);
    var gradient = context.createLinearGradient(WIDTH / 2, 0, WIDTH / 2, WIDTH);
    gradient.addColorStop(0, '#66A3D2');
    gradient.addColorStop(1, '#0B61A4');
    context.fillStyle = gradient;
    context.fill();
  };

  Coral = function () {
    var c = $('#game-data').data("coral");
    for (var i = 10; i < 20; i++) {
      for (var j = 3; j < 27; j++) {
        if (c[j + i * 10] == 1) {
          context.beginPath();
          context.rect(i * SQ_WIDTH, j * SQ_WIDTH, SQ_WIDTH, SQ_WIDTH);
          context.fillStyle = 'orange';
          context.fill();
        }
      }
    }
  };

  Grid = function () {
    for (var i = 0; i < N; i++) {
      context.beginPath();
      context.moveTo(SQ_WIDTH + i * SQ_WIDTH, 0);
      context.lineTo(SQ_WIDTH + i * SQ_WIDTH, WIDTH);
      context.lineWidth = 1;
      context.strokeStyle = '#254055';
      context.stroke();
    }
    for (var i = 0; i < N; i++) {
      context.beginPath();
      context.moveTo(0, SQ_WIDTH + i * SQ_WIDTH);
      context.lineTo(WIDTH, SQ_WIDTH + i * SQ_WIDTH);
      context.lineWidth = 1;
      context.strokeStyle = '#254055';
      context.stroke();
    }
  };

  this.Draw = function () {
    Ocean();
    Coral();
    Grid();
  }
};
