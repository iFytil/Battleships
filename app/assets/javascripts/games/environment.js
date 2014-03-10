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
    for (var i = 0; i < c.length; i++) {
      if (c[i] == 1) {
        var x = 10 + i%10   // start_x + i%size_x
        var y = 3 + i%24    // start_y + i%size_y
        ctx.beginPath();
        ctx.rect(x * SQ_WIDTH, y * SQ_WIDTH, SQ_WIDTH, SQ_WIDTH);
        ctx.fillStyle = 'orange';
        ctx.fill();
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
