var ctx = canvas_grid.getContext('2d');
var width  = canvas_grid.width;
var height = canvas_grid.height;
var cell  = 12;
var step = 4;
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


function movingObj(xposition, yposition, color, [LEFT, UP, RIGHT, DOWN]) {


	object = new obj(xposition, yposition, color);


	object.move = function(DIRECTION) {

		if (!validMovement(DIRECTION)) {
			return
		}
		
		object.clearCell();

		switch (DIRECTION) {
			case LEFT: object.xposition -= step; break // LEFT
			case UP: object.yposition -= step; break // UP
			case RIGHT: object.xposition += step; break // RIGHT
			case DOWN: object.yposition += step; break // DOWN
		}

		object.fillCell();
	}


	function validMovement(DIRECTION) {

		for (i = 0; i < 64; i++) {
			if (collide(walls[i], DIRECTION)) {
				return false
			}
		}
		return true
	}


	object.keyBinding = function(event) {
		
		DIRECTION = event.keyCode;
		object.move(DIRECTION);

	}
	window.addEventListener("keydown", object.keyBinding, true)


	function collide(obj, DIRECTION) {

		x1 = object.xposition;
		x2 = obj.xposition;
		y1 = object.yposition;
		y2 = obj.yposition;

		switch (DIRECTION) {
			case LEFT: x1 -= step; break // LEFT
			case UP: y1 -= step; break // UP
			case RIGHT: x1 += step; break // RIGHT
			case DOWN: y1 += step; break // DOWN
		}

		if (x1+cell>x2 && x1<x2+cell) {
			if (y1+cell>y2 && y1<y2+cell) {	
				return true
			}
		}

		return false
	}

	return object

}


walls = []
for (i = 0; i < 64; i++) {
	wallColumn = Math.floor((Math.random() * columns) + 1)
	wallRow = Math.floor((Math.random() * rows) + 1)
	walls.push(new obj(wallColumn*cell, wallRow*cell, '#333333'));
} 

b = new movingObj(100, 100, '#abffab', [65, 87, 68, 83]);
a = new movingObj(0, 0, '#abffab', [37, 38, 39, 40]);
a.move(39)
a.move(39)
a.move(39)
a.move(39)
a.move(39)
a.move(39)
a.move(39)