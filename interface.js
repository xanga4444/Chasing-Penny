var ctx = canvas_grid.getContext('2d');
var width  = canvas_grid.width;
var height = canvas_grid.height;
var cell  = 12;
var step = 3;
var columns   = width/cell;
var rows   = height/cell;


function obj(xposition, yposition, color) {


	this.xposition = xposition;
	this.yposition = yposition;
	this.color = color;
	

	this.fillCell = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.xposition, this.yposition, cell, cell)
	}


	this.clearCell = function() {
		ctx.clearRect(this.xposition, this.yposition, cell, cell)
	}

	this.fillCell();

}


function movingObj(xposition, yposition, color) {


	object = new obj(xposition, yposition, color);


	object.cellUp = function() {
		this.clearCell();
		this.yposition -= step;
		this.fillCell();
	}


	object.cellDown = function() {
		this.clearCell();
		this.yposition += step;
		this.fillCell();
	}


	object.cellLeft = function() {
		this.clearCell();
		this.xposition -= step;
		this.fillCell();
	}


	object.cellRight = function() {
		this.clearCell();
		this.xposition += step;
		this.fillCell();
	}

	return object

}


function collide(obj1, obj2) {
	
	if (obj1.xposition+cell>obj2.xposition && obj1.xposition<obj2.xposition+cell) {
		if (obj1.yposition+cell>obj2.yposition && obj1.yposition<obj2.yposition+cell) {	
			console.log(true)
		}
	}
}


function keyBinding(event) {
	switch (event.keyCode) {
        case 37: a.cellLeft(); break // LEFT
        case 38: a.cellUp(); break // UP
        case 39: a.cellRight(); break // RIGHT
        case 40: a.cellDown(); break // DOWN
    }
    collide(a, b)
}


a = new movingObj(0, 0, '#abffab');

window.addEventListener("keydown", keyBinding, true)

walls = []
for (i = 0; i < 64; i++) {
	wallColumn = Math.floor((Math.random() * columns) + 1)
	wallRow = Math.floor((Math.random() * rows) + 1)
	walls.push(new obj(wallColumn*cell, wallRow*cell, '#333333'));
} 

