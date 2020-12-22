import {toString} from "./utils.js";
import {areaIds} from './constants.js';
import {play, winner} from './tic-tac-toe.js';

// NOT idempotent because of areaIds and document.getElementById
// () -> void
function attachClickHandlers() {
	areaIds.forEach((id) => document.getElementById(toString(id))
									.addEventListener('click', () => {
										const gameBoard = play(id);
										const msg = getMessage(winner(gameBoard));
										render(gameBoard, msg);
									}));
}

function getMessage(winner) {
	if (winner === 'X') {
		return 'Great job! You won!';
	}
	if (winner === 'O') {
		return 'Oh no! You lost!';
	}
	return undefined;
}

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

// (GameBoard) -> GameBoard
function render(gameBoard, message) {
	renderMessage(message);
	return renderBoard(gameBoard);
}

// (GameBoard) -> GameBoard
function renderBoard(gameBoard) {
	gameBoard.filter((area) => area.occupiedBy !== 'none')
			 .forEach((area) => document.getElementById(area.id).innerText = area.occupiedBy);
	return gameBoard;
}

// (string) -> void
function renderMessage(msg) {
	if (msg === undefined) msg = ' ';
	document.getElementsByClassName("messageBoard")[0].innerText = msg;
}

export {readGameBoard, render, attachClickHandlers};
