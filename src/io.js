import {toString} from "./utils.js";
import { areaIds } from './constants.js';
import { play } from './tic-tac-toe.js';

// NOT referentially transparent. Side-effect in document.getElementById(id)
// () -> [ {id: number, occupiedBy: string} ]
function readGameBoard() {
	return areaIds.map(toString)
				  .map((id) => document.getElementById(id))
				  .map((el) => {
					  return {
						  id: parseInt(el.id),
						  occupiedBy: el.innerText || 'none'
					  }
				  });
}

// (GameBoard) -> void
function render(gameBoard) {
	gameBoard.filter((area) => area.occupiedBy !== 'none')
			 .forEach((area) => document.getElementById(area.id).innerText = area.occupiedBy);
}

// () -> void
function attachClickHandlers() {
	areaIds.forEach((id) => document.getElementById(toString(id))
									.addEventListener('click', () => play(id)));
}

export { readGameBoard, render, attachClickHandlers };
