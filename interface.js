var ctx = canvas_grid.getContext('2d');
var width  = canvas_grid.width;
var height = canvas_grid.height;
var cell  = 20;
var columns   = width/cell;
var rows   = height/cell;


function obj(xposition, yposition) {


	this.xposition = xposition;
	this.yposition = yposition;


	this.fillCell = function() {
		ctx.fillStyle = '#abffab'
		ctx.fillRect(this.xposition*cell, this.yposition*cell, cell, cell)
	}


	this.clearCell = function() {
		ctx.clearRect(this.xposition*cell, this.yposition*cell, cell, cell)
	}


	this.cellUp = function() {
		this.clearCell();
		this.yposition--;
		this.fillCell();
	}


	this.cellDown = function() {
		this.clearCell();
		this.yposition++;
		this.fillCell();
	}


	this.cellLeft = function() {
		this.clearCell();
		this.xposition--;
		this.fillCell();
	}


	this.cellRight = function() {
		this.clearCell();
		this.xposition--;
		this.fillCell();
	}

}


a = new obj(0, 1);

a.fillCell()
a.cellDown()