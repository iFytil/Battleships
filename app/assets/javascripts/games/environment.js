Environment = function (ctx) {
    
  Ocean = function () {
    ctx.rect(0, 0, WIDTH, WIDTH);
    var gradient = ctx.createLinearGradient(WIDTH / 2, 0, WIDTH / 2, WIDTH);
    gradient.addColorStop(0, '#66A3D2');
    gradient.addColorStop(1, '#0B61A4');
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  Coral = function () {
    var c = $('#game-data').data("coral");
    for (var i = 10; i < 20; i++) {
      for (var j = 3; j < 27; j++) {
        if (c[j + i * 10] == 1) {
          ctx.beginPath();
          ctx.rect(i * SQ_WIDTH, j * SQ_WIDTH, SQ_WIDTH, SQ_WIDTH);
          ctx.fillStyle = 'orange';
          ctx.fill();
        }
      }
    }
  };

  Grid = function () {
    for (var i = 0; i < N; i++) {
      ctx.beginPath();
      ctx.moveTo(SQ_WIDTH + i * SQ_WIDTH, 0);
      ctx.lineTo(SQ_WIDTH + i * SQ_WIDTH, WIDTH);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#254055';
      ctx.stroke();
    }
    for (var i = 0; i < N; i++) {
      ctx.beginPath();
      ctx.moveTo(0, SQ_WIDTH + i * SQ_WIDTH);
      ctx.lineTo(WIDTH, SQ_WIDTH + i * SQ_WIDTH);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#254055';
      ctx.stroke();
    }
  };

  this.Draw = function () {
    Ocean();
    Coral();
    Grid();
  }
};
