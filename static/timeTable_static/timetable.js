'use strict'
let canvas = $("#myCanvas")[0];
let w = canvas.width;
let h = canvas.height;
let n = 100; // number of pts on circle
let multN = 2; 
let context = canvas.getContext('2d');
let radius = Math.min(w/4,h/4);
let cx = w/2;
let cy = h/2;

// draw a circle
function drawCircle() {
    context.beginPath();
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.stroke();
}

let circle = [{x:cx, y:cy}]

// mark points on circle
function markCircle(n) {

    circle = new Array() // clear old content
    let theta = 0;
    let step = Math.PI * 2 / n;

    function m_h() {
	if (n--) {
	    circle[circle.length] = {x:cx+radius*Math.cos(theta),
				     y:cy+radius*Math.sin(theta)};
	    theta += step;
	    m_h(); // mark the next one
	}
    }

    m_h();
}

function connect(from, to) {
    context.moveTo(circle[from].x, circle[from].y);
    context.lineTo(circle[to].x, circle[to].y);

}

function drawPattern(n, multN) {
    context.beginPath();    
    for (let i=0; i<n; ++i) {
	connect(i, (i*multN) %n);
    }
    context.stroke();        
}

$( document ).ready(function() {
    drawCircle();
    markCircle(n);    
});

$("#draw").click(function() {
    context.clearRect(0,0,w,h);
    console.log(multN);
    drawCircle();
    drawPattern(n,multN);
})

$("#mult_up").click(function() {
    multN++;
})

$("#mult_down").click(function() {
    multN--;
})
