var ctx = canvas_grid.getContext('2d');
var width  = canvas_grid.width;
var height = canvas_grid.height;
var cell  = 12;
var step = 4;
var columns   = width/cell;
var rows   = height/cell;
var LEFT = [-1, 0];
var UP = [0, -1];
var RIGHT = [1, 0];
var DOWN = [0, 1];
var DIRECTIONS = [LEFT, UP, RIGHT, DOWN]
var HighScore = 0;


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

	var object = new obj(xposition, yposition, color);

	object.move = function(DIRECTION) {

		if (!validMovement(DIRECTION)) {
			return
		}
		
		object.clearCell();

		object.xposition += step*DIRECTION[0];
		object.yposition += step*DIRECTION[1];

		object.fillCell();

	}

	function validMovement(DIRECTION) {
		console.log(DIRECTION, UP, [0,-1]===[0,-1])
		switch (DIRECTION) {
			case LEFT: if (object.xposition<=0) {return false} break;
			case UP: if (object.yposition<=0) {return false} break;
			case RIGHT: if (object.xposition+cell===width) {return false} break;
			case DOWN: if (object.yposition+cell===height) {return false} break;
		}

		for (i = 0; i < 64; i++) {
			if (object.collide(walls[i], DIRECTION)) {
				return false;
			}
		}

		return true;

	}

	object.collide = function(obj, DIRECTION) {

		x1 = object.xposition;
		x2 = obj.xposition;
		y1 = object.yposition;
		y2 = obj.yposition;

		x1 += step*DIRECTION[0];
		y1 += step*DIRECTION[1];

		if (x1+cell>x2 && x1<x2+cell) {
			if (y1+cell>y2 && y1<y2+cell) {	
				return true
			}
		}

		return false
	}

	return object

}


function computerPlayer(xposition, yposition, color) {

	var computerMovingObject = new movingObj(xposition, yposition, color);

	var stepsTaken = 10;

	computerMovingObject.evade = function(target) {
		setInterval(function(){
			if (stepsTaken===10) {
				// DIRECTION = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]

				xDiff = target.xposition - computerMovingObject.xposition
				yDiff = target.yposition - computerMovingObject.yposition
				
				xDiffPrime = Math.abs(xDiff)
				yDiffPrime = Math.abs(yDiff)
				if (xDiffPrime>yDiffPrime) {
					DIRECTION = [xDiff/xDiffPrime, 0]
					for (i = 0; i < 64; i++) {
						if (computerMovingObject.collide(walls[i], DIRECTION)) {
							DIRECTION = [0, yDiff/yDiffPrime]
						}
					}
				}
				else {
					DIRECTION = [0, yDiff/yDiffPrime]
					for (i = 0; i < 64; i++) {
						if (computerMovingObject.collide(walls[i], DIRECTION)) {
							DIRECTION = [xDiff/xDiffPrime, 0]
						}
					}
				}
				
				stepsTaken = 0;
			}
			computerMovingObject.move(DIRECTION)
			if(computerMovingObject.collide(target, DIRECTION)) {
				location.reload();
			}
			stepsTaken++;

		}, 50);
	}
	

	return computerMovingObject

}


function userPlayer(xposition, yposition, color) {

	userMovingObject = new movingObj(xposition, yposition, color);

	userMovingObject.keyBinding = function(event) {

		switch (event.keyCode) {
	        case 37: DIRECTION = LEFT; HighScore++; break // LEFT
		    case 38: DIRECTION = UP; HighScore++; break // UP
		    case 39: DIRECTION = RIGHT; HighScore++; break // RIGHT
		    case 40: DIRECTION = DOWN; HighScore++; break // DOWN
		}
		
		userMovingObject.move(DIRECTION);
	}
	window.addEventListener("keydown", userMovingObject.keyBinding, true)

	return userMovingObject

}


walls = []
for (i = 0; i < 64; i++) {
	wallColumn = Math.floor((Math.random() * columns) + 1)
	wallRow = Math.floor((Math.random() * rows) + 1)
	walls.push(new obj(wallColumn*cell, wallRow*cell, '#333333'));
}

penny = new computerPlayer(0, 0, '#FF0000');
howard = new userPlayer(300, 300, '#0000FF');
penny.evade(howard);
