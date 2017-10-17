var NUM_CIRCLES = 12;
var circleDiameter;
var circleRadius;
var rVal;
var gVal;
var bVal;

function setup() {
    createCanvas(480, 600);
    circleDiameter = width/NUM_CIRCLES;
    circleRadius = circleDiameter/2;
}
function draw() {
    var isShifted = false;
    var y = height;
    rVal = 255;
    gVal = 0;
    bVal = 0;
    while (y >= 0) {
        var x;
        if (isShifted) {
            x = circleRadius;
        } else {
            x = 0;
        }
        while (x <= width) {
            if ((mouseX-x)*(mouseX-x)+(mouseY-y)*(mouseY-y)<circleRadius*circleRadius) {
            fill(color(127, 191, 255));
            stroke(color(127, 191, 255));
            } else {
            fill(color(rVal, gVal, bVal));
            stroke(color(rVal, gVal, bVal));
            }
            ellipse(x, y, circleDiameter, circleDiameter);
            x += circleDiameter;
        }
        rVal -= 2;
        gVal += 7;
        bVal += 1;
        y -= circleRadius;
        isShifted = !isShifted;
    }
}