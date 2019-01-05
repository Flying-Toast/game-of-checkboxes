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

function play() {
	if (window.intervalId === null) {
		window.intervalId = window.setInterval(tick, 1000);
	}
}

function pause() {
	if (window.intervalId !== null) {
		window.clearInterval(window.intervalId);
		window.intervalId = null;
	}
}

function tick() {
}

(function main() {
	window.cells = generateCheckboxes(83, 31);
	window.intervalId = null;
	console.log(cells);
})();
