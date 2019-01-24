function Cell(checkboxElement) {
	this.checkboxElement = checkboxElement;
	this.dieNext = false;
	this.liveNext = false;

	this.isDead = function() {
		return !this.checkboxElement.checked;
	};

	this.die = function() {
		this.checkboxElement.checked = false;
		this.dieNext = false;
	};

	this.dieNextTick = function() {
		this.dieNext = true;
	};

	this.live = function() {
		this.checkboxElement.checked = true;
		this.liveNext = false;
	};

	this.liveNextTick = function() {
		this.liveNext = true;
	};
}

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
		window.intervalId = window.setInterval(tick, 100);
	} else if (window.intervalId !== null) {
		window.clearInterval(window.intervalId);
		window.intervalId = null;
	}
}

function getCell(x, y) {
	let cell = undefined;

	try {
		cell =  window.cells[y][x];
	} catch (e) {}

	if (cell === undefined) {
		let inp = document.createElement("input");
		inp.type = "checkbox";
		cell = new Cell(inp);
	}

	return cell;
}

function getCellNeighbors(x, y) {
	return [getCell(x-1, y-1), getCell(x, y-1), getCell(x+1, y-1), getCell(x-1, y), getCell(x+1, y), getCell(x-1, y+1), getCell(x, y+1), getCell(x+1, y+1)];
}

function tick() {
	for (let j = 0; j < cells.length; j++) {
		for (let i = 0; i < cells[j].length; i++) {
			let cell = cells[j][i];
			let neighbors = getCellNeighbors(i, j);
			let livingNeighborCount = 0;

			for (let h = 0; h < neighbors.length; h++) {
				if (!neighbors[h].isDead()) {
					livingNeighborCount++;
				}
			}

			if (livingNeighborCount < 2 || livingNeighborCount > 3) {
				cell.dieNextTick();
			}

			if (livingNeighborCount === 3) {
				cell.liveNextTick();
			}
		}
	}


	for (let j = 0; j < cells.length; j++) {
		for (let i = 0; i < cells[j].length; i++) {
			let cell = cells[j][i];

			if (cell.dieNext) {
				cell.die();
			}

			if (cell.liveNext) {
				cell.live();
			}
		}
	}
}

function main() {
	window.cells = generateCheckboxes(83, 28);
	window.intervalId = null;
}

main();//simulate an entry point
