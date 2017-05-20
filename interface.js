var ctx = canvas_grid.getContext('2d')
var width  = canvas_grid.width
var height = canvas_grid.height
var cell  = 20
var columns   = width/cell
var rows   = height/cell


function fillCell(xposition, yposition) {
	ctx.fillStyle = '#abffab'
	ctx.fillRect(xposition*cell, yposition*cell, cell, cell)
}

function clearCell(xposition, yposition) {
	ctx.clearRect(xposition*cell, yposition*cell, cell, cell)
}

// fillCell(0, 2)
// clearCell(0, 2)