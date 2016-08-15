var mainCanvas = document.getElementById("myCanvas");
var mainContext = mainCanvas.getContext('2d');
var mousePos = {
    x:0,
    y:0
};
var circles = [];

function Circle(radius, speed, width, xPos, yPos) {
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.xPos = xPos;
    this.yPos = yPos;
    this.opacity = 0.05 + Math.random() * 9;

    this.counter = 0;

    var signHelper = Math.floor(Math.random() * 2);

    if (signHelper == 1) {
        this.sign = -1;
    } else {
        this.sign = 1;
    }
}

document.onmousemove = handleMouseMove;

function handleMouseMove(event) {
    var dot, eventDoc, doc, body, pageX, pageY;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    mousePos = {
        x: event.pageX,
        y: event.pageY
    };
}


Circle.prototype.update = function() {

    this.counter += this.sign * this.speed;

    mainContext.beginPath();

    //if mouse is close to x y pos of circle
    if ((mousePos.x > (this.xPos - 100)) && (mousePos.x < (this.xPos + 100))){
        if (mousePos.x > (this.xPos - 100)){

        }
        if (mousePos.x < (this.xPos + 100)){
            mainContext.moveTo(mousePos.x, mousePos.y);
        }
        //console.log(mousePos);
        mainContext.moveTo(mousePos.x, mousePos.y);
        mainContext.lineTo(this.xPos, this.yPos);
        mainContext.stroke();
    }else{
        mainContext.arc(this.xPos + Math.cos(this.counter / 100) * this.radius,
        this.yPos + Math.sin(this.counter / 100) * this.radius,
        this.width,
        0,
        Math.PI * 2,
        false);
    }
    mainContext.closePath();
    mainContext.fillStyle = 'rgba(185, 211, 238,' + this.opacity + ')';
    mainContext.fill();
};

function drawCircles() {
    for (var i = 0; i < 1; i++) {
        var randomX = Math.round(0 + Math.random() * 500);
        var randomY = Math.round(0 + Math.random() * 500);
        var speed = 0.2 + Math.random() * 3;
        var size = 50;//+ Math.random() * 100;
        var circle = new Circle(100, speed, size, randomX, randomY);
        circles.push(circle);
    }
    draw();
}
drawCircles();

function draw() {
    mainContext.clearRect(0, 0, 500, 500);

    for (var i = 0; i < circles.length; i++) {
        var myCircle = circles[i];
        myCircle.update();
    }
    requestAnimationFrame(draw);
}
