import {doNothing, toString} from "./utils/utils.js";
import {areaIds, tags} from './constants.js';
import {play} from './tic-tac-toe.js';
import {Maybe} from "./utils/Maybe.js";

function attachRestartClickHandler() {
	document
		.querySelector("button.button")
		.addEventListener("click", () => {
			clearGameAreas();
		});
}

function clearGameAreas() {
	const emptyGameBoard = areaIds.map(id => ({id, occupiedBy: ''}));
	render({
			   gameBoard: Maybe.of(emptyGameBoard),
			   msg: Maybe.empty()
		   });
}

// NOT idempotent because of areaIds and document.getElementById
// () -> void
function attachGameClickHandlers() {
	areaIds.forEach((id) => document.getElementById(toString(id))
									.addEventListener('click', () => {
										render(play(id, readGameBoard()));
									}));
}

// NOT idempotent because of readGameArea(id)
// () -> [ {id: number, occupiedBy: string} ]
function readGameBoard() {
	return areaIds.map((id) => {
		return {
			id: id,
			occupiedBy: readGameArea(id).fold(() => tags.NONE,
											  (innerText) => innerText)
		}
	});
}

// (number) -> Maybe<string>
function readGameArea(id) {
	return Maybe.of(document.getElementById(id)?.innerText);
}

// (RenderObj<{gameBoard, msg}>) -> void
function render(renderObj) {
	renderObj.gameBoard.fold(doNothing, renderBoard);
	renderObj.msg.fold(clearMessage, renderMessage);
}

// (GameBoard) -> GameBoard
function renderBoard(gameBoard) {
	gameBoard.filter((area) => area.occupiedBy !== tags.NONE)
			 .forEach((area) => document.getElementById(area.id).innerText = area.occupiedBy);
	return gameBoard;
}

// NOT idempotent because of document.querySelector()
// (string) -> void
function renderMessage(msg) {
	document.querySelector(".messageBoard").innerText = msg;
}

function clearMessage() {
	return renderMessage('');
}


export {readGameBoard, attachGameClickHandlers, attachRestartClickHandler};
