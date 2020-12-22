import {toString} from "./utils/utils.js";
import {areaIds, CPU_TAG, NONE_TAG, PLAYER_TAG} from './constants.js';
import {play, winner} from './tic-tac-toe.js';
import {Maybe} from "./utils/Maybe.js";

// NOT idempotent because of areaIds and document.getElementById
// () -> void
function attachClickHandlers() {
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
	if (winner === PLAYER_TAG) {
		return Maybe.of('Great job! You won!');
	}
	if (winner === CPU_TAG) {
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
						  occupiedBy: el.innerText || NONE_TAG
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
	gameBoard.filter((area) => area.occupiedBy !== NONE_TAG)
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

export {readGameBoard, attachClickHandlers};
