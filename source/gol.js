function Cell(checkboxElement) {
	this.checkboxElement = checkboxElement;
}
Cell.prototype.isDead = function() {return !this.checkboxElement.checked};
Cell.prototype.die = function() {this.checkboxElement.checked = false;}
Cell.prototype.live = function() {this.checkboxElement.checked = true;}

function generateCheckboxes(width, height) {
	let checkboxWrapper = document.querySelector("#checkboxes");

	let cells = [];

	for (let y = 0; y < height; y++) {
		let row = [];

		for (let x = 0; x < width; x++) {
			let checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			row.push(new Cell(checkbox));
			checkboxWrapper.appendChild(checkbox);
		}

		cells.push(row);
		checkboxWrapper.appendChild(document.createElement("br"));
	}

	return cells;
}

function playPause() {
	if (window.intervalId === null) {
		window.intervalId = window.setInterval(tick, 1000);
	} else if (window.intervalId !== null) {
		window.clearInterval(window.intervalId);
		window.intervalId = null;
	}
}
window.addEventListener("keydown", function(e) {
	if (e.key.toLowerCase() == "p") {
		playPause();
	}
});

function getCell(x, y) {
	return window.cells[y][x];
}

function getCellNeighbors(x, y) {
	return [getCell(x-1, y-1), getCell(x, y-1), getCell(x+1, y-1), getCell(x-1, y), getCell(x+1, y), getCell(x-1, y+1), getCell(x, y+1), getCell(x+1, y+1)];
}

function tick() {
	for (let j = 1; j < cells.length -1; j++) {
		for (let i = 1; i < cells[j].length -1; i++) {
			let cell = cells[j][i];
			let neighbors = getCellNeighbors(i, j);
			let livingNeighborCount = 0;

			for (let h = 0; h < neighbors.length; h++) {
				if (!neighbors[h].isDead()) {
					livingNeighborCount++;
				}
			}

			if (livingNeighborCount < 2 || livingNeighborCount > 3) {
				cell.die();
			}

			if (livingNeighborCount === 3) {
				cell.live();
			}
		}
	}
}

function main() {
	window.cells = generateCheckboxes(83, 31);
	window.intervalId = null;
}

main();
