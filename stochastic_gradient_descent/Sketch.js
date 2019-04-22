let data = [];
let m = 1;
let b = 0;

function setup() {
    var cnv = createCanvas(500, 500);
    cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

function draw() {
    background(240);
    drawAxis();
    //print(data);
    for (let i = 0; i < data.length; i++) {
        let x = map(data[i].x, 0, 1, 0, width);
        let y = map(data[i].y, 0, 1, height, 0);
        strokeWeight(1);
        fill(data[i].r, data[i].g, data[i].b);
        stroke(0);
        ellipse(x, y, 10, 10);
    }
    if (data.length > 1) {
        gradientDecent();
        drawLine();
        drawDist();
    }

}

function gradientDecent() {
    lr = 0.05;
    for (var i = 0; i < data.length; i++) {
        var x = data[i].x;
        var y = data[i].y;
        var guess = m * x + b;
        var err = y - guess;
        m = m + (err * x) * lr;
        b = b + (err) * lr;
         
    }

}

function drawDist() {
    // y = mx + b
    var y;
    for (var i = 0; i < data.length; i++) {
        intercept = m * data[i].x + b;
        //print(intercept);

        let x1 = data[i].x;
        let y1 = data[i].y;
        let x2 = data[i].x;
        let y2 = intercept;

        let d = dist(x1, y1, x2, y2);

        x1 = map(x1, 0, 1, 0, width);
        y1 = map(y1, 0, 1, height, 0);
        x2 = map(x2, 0, 1, 0, width);
        y2 = map(y2, 0, 1, height, 0);

        d = d.toFixed(3);

        fill(data[i].r, data[i].g, data[i].b);
        stroke(0);
        textSize(10);
        line(x1, y1, x2, y2);
        //text(d, x1, y1+20);
    }

}

function drawLine() {
    let x1 = 0;
    let y1 = m * x1 + b;
    let x2 = 1;
    let y2 = m * x2 + b;

    x1 = map(x1, 0, 1, 0, width);
    y1 = map(y1, 0, 1, height, 0);
    x2 = map(x2, 0, 1, 0, width);
    y2 = map(y2, 0, 1, height, 0);

    stroke(255, 0, 0);
    strokeWeight(3);
    line(x1, y1, x2, y2);

    s = 'y = ' + m.toFixed(2) + 'x+' + b.toFixed(2);
    textSize(20);
    strokeWeight(1);
    textAlign(CENTER);
    text(s, 100, 100)
}

function mousePressed() {
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 1, 0);
    //let point = createVector(x, y);
    let p = new Point(x, y);
    data.push(p);
    //print(data);
}

function drawAxis() {
    let x1 = 0;
    let y1 = 0;
    let x2 = 1;
    let y2 = 0;

    x1 = map(x1, 0, 1, 0, width);
    y1 = map(y1, 0, 1, height, 0);
    x2 = map(x2, 0, 1, 0, width);
    y2 = map(y2, 0, 1, height, 0);

    stroke(0);
    strokeWeight(4);
    line(x1, y1, x2, y2);

    for (var i = 0; i <= 1; i = i + 0.1) {
        xmarker = map(i, 0, 1, 0, width);
        ymarker = map(0.009, 0, 1, height, 0);
        strokeWeight(4);
        line(xmarker, ymarker, xmarker, ymarker + 10);
    }

    x1 = 0;
    y1 = 0;
    x2 = 0;
    y2 = 1;

    x1 = map(x1, 0, 1, 0, width);
    y1 = map(y1, 0, 1, height, 0);
    x2 = map(x2, 0, 1, 0, width);
    y2 = map(y2, 0, 1, height, 0);

    stroke(0);
    strokeWeight(4);
    line(x1, y1, x2, y2);

    for (var i = 0; i <= 1; i = i + 0.1) {
        xmarker = map(0.0009, 0, 1, 0, width);
        ymarker = map(i, 0, 1, height, 0);
        strokeWeight(4);
        line(xmarker, ymarker, xmarker + 5, ymarker);
    }
}