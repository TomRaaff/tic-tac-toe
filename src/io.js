import {toString} from "./utils/utils.js";
import {areaIds, tags} from './constants.js';
import {play, winner} from './tic-tac-toe.js';
import {Maybe} from "./utils/Maybe.js";

function attachRestartClickHandler() {
	document
		.querySelector("button.button")
		.addEventListener("click", () => {
			document.querySelectorAll(".gameArea")
					.forEach((el) => el.innerText = '');
		});
}

// NOT idempotent because of areaIds and document.getElementById
// () -> void
function attachGameClickHandlers() {
	areaIds.forEach((id) => document.getElementById(toString(id))
									.addEventListener('click', () => {
										const startingGameBoard = readGameBoard();
										const gameBoardEither = play(id, startingGameBoard);
										gameBoardEither.fold((msg) => render(startingGameBoard, Maybe.of(msg)),
															 (gameBoard) => render(gameBoard, getMessage(winner(gameBoard))));
									}));
}

// (string) -> Maybe[string]
function getMessage(winner) {
	if (winner === tags.PLAYER) {
		return Maybe.of('Great job! You won!');
	}
	if (winner === tags.CPU) {
		return Maybe.of('Oh no! You lost!');
	}
	return Maybe.empty();
}

// NOT idempotent because of document.getElementById(id)
// () -> [ {id: number, occupiedBy: string} ]
function readGameBoard() {
	return areaIds.map(toString)
				  .map((id) => document.getElementById(id))
				  .map((el) => {
					  return {
						  id: parseInt(el.id),
						  occupiedBy: el.innerText || tags.NONE
					  }
				  });
}

// (GameBoard, Maybe[string]) -> GameBoard
function render(gameBoard, message) {
	renderMessage(message);
	return renderBoard(gameBoard);
}

// (GameBoard) -> GameBoard
function renderBoard(gameBoard) {
	gameBoard.filter((area) => area.occupiedBy !== tags.NONE)
			 .forEach((area) => document.getElementById(area.id).innerText = area.occupiedBy);
	return gameBoard;
}

// NOT idempotent because of document.querySelector()
// (Maybe[string]) -> void
function renderMessage(msg) {
	document.querySelector(".messageBoard")
		.innerText = msg.fold(() => ' ',
							  msg => msg);
}


export {readGameBoard, attachGameClickHandlers, attachRestartClickHandler};
