Environment = function (context, n, w, sqw) {

    // generate coral pattern
    var c = new Array();
    for (var i = 0; i < 10 * 24; i++) {
        c[i] = 0;
    }
    for (var j = 0; j<24; j++) {
        var r = Math.floor(Math.random() * (10 * 24));
        if(c[r]==0)
			c[r] = 1;
		else
			j--;
    }
    
    Ocean = function () {
        context.rect(0, 0, w, w);
        var gradient = context.createLinearGradient(w / 2, 0, w / 2, w);
        gradient.addColorStop(0, '#66A3D2');
        gradient.addColorStop(1, '#0B61A4');
        context.fillStyle = gradient;
        context.fill();
    };
    Coral = function () {
        for (var i = 10; i < 20; i++) {
            for (var j = 3; j < 27; j++) {
                if (c[j + i * 10] == 1) {
                    context.beginPath();
                    context.rect(i * sqw, j * sqw, sqw, sqw);
                    context.fillStyle = 'orange';
                    context.fill();
                }
            }
        }
    };
    Grid = function () {
        for (var i = 0; i < n; i++) {
            context.beginPath();
            context.moveTo(sqw + i * sqw, 0);
            context.lineTo(sqw + i * sqw, w);
            context.lineWidth = 1;
            context.strokeStyle = '#254055';
            context.stroke();
        }
        for (var i = 0; i < n; i++) {
            context.beginPath();
            context.moveTo(0, sqw + i * sqw);
            context.lineTo(w, sqw + i * sqw);
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
