var sprites = {
    mole_appear: {sx:-114, sy:-140, w:33, h:35, frames:7},
    mole_disappear: {sx:-131, sy:-172, w:40, h:32, frames:8},
    mole_hit: {sx:-260, sy:-30, w:34, h:40, frames:3},
    mole_wait: {frames: 50}
}

var width = $("#playground").width(),
height  = $("#playground").height(),
countdown = 1000, countup = 0;

window.onload = function() {
    // cache a new image
    var image = new Image();
    image.onload = playGame;
    image.src = "mole.png";
	
}

var Mole = function() {
    
    var nextMode = {"mole_appear": "mole_wait",
		    "mole_wait": "mole_disappear",
		    "mole_disappear": "mole_appear",
		    "mole_hit": "mole_disappear"}
    
    this.mode = "mole_appear";
    this.sprite = sprites[this.mode];
    this.currFrame = 0;
    this.x = Math.random()*(width-this.sprite.w);
    this.y = Math.random()*(height-this.sprite.h);
    
    this.hit = function() {
	this.mode = "mole_hit";
	this.sprite = sprites[this.mode];
	this.elem.css({
	    width: this.sprite.w, height: this.sprite.h,
	    "background-position-x": this.sprite.sx + "px",
	    "background-position-y": this.sprite.sy + "px"
	});
	this.currFrame = 0;
    }

    this.elem = $("<div>").css({
	position: 'absolute',
	left: this.x, top: this.y,
	width: this.sprite.w, height: this.sprite.h,
	background: "url(mole.png)",
	"background-position-x": this.sprite.sx + "px",
	"background-position-y": this.sprite.sy + "px"
    }).appendTo("#container");

    this.step = function() {
	if (this.currFrame < this.sprite.frames) {
	    this.currFrame++;
	    this.elem.css("background-position-x", 
			  "" + (this.sprite.sx
				-this.currFrame*this.sprite.w)
			  +"px");
	} else {
	    this.mode = nextMode[this.mode];
	    this.sprite = sprites[this.mode];
	    if (this.sprite.sx)
		this.elem.css({
		    width: this.sprite.w, height: this.sprite.h,
		    "background-position-x": this.sprite.sx + "px",
		    "background-position-y": this.sprite.sy + "px"
		});
	    if (this.mode == "mole_appear") {
		this.x = Math.random()*(width-this.sprite.w);
		this.y = Math.random()*(height-this.sprite.h);
		this.elem.css({
		    top: this.y, left: this.x
		});
	    }
	    this.currFrame = 0;
	}
    };
}

var theMole = new Mole();
var playGame = function() {

    var Timer = setInterval(function() {
	theMole.step();
	if (--countdown <= 0) gameOver(Timer);
    },50);
}

var gameOver = function(timer) {
    if (timer) clearInterval(timer);
    countup > 15 ? alert("You win! :)") : alert("You let the mole run away :(")
}

$("#container").on("mousedown", "div", function(e) {
    countup++;
    e.preventDefault();
    theMole.hit();
});