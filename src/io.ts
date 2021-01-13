import { doNothing, toString } from './utils/utils.js';
import { areaIds, Tag } from './constants.js';
import { play } from './tic-tac-toe.js';
import { Maybe } from './utils/Maybe.js';
import { Area } from './utils/Area.model.js';
import { RenderObject } from './utils/RenderObject.model.js';
import { GameBoard } from './utils/GameBoard.model.js';

export function attachRestartClickHandler(): void {
	document
		.querySelector('button.button')
		?.addEventListener('click', () => {
			clearGameAreas();
		});
}

function clearGameAreas(): void {
	const emptyGameBoard = areaIds.map((id) => new Area(id, Tag.NONE));
	render(new RenderObject(emptyGameBoard, Maybe.empty()));
}

export function attachGameClickHandlers(): void {
	areaIds.forEach((id) => document.getElementById(toString(id))
									?.addEventListener('click', () => {
										render(play(id, readGameBoard()));
									}));
}

export function readGameBoard(): GameBoard {
	return areaIds.map((id) => new Area(id,
										readGameArea(id).fold(() => Tag.NONE,
															  (innerText: Tag) => innerText)));
}

function readGameArea(id: number): Maybe<Tag> {
	return Maybe.of(document.getElementById(toString(id))?.innerText as Tag);
}

function render(renderObj: RenderObject): void {
	renderObj.gameBoard.fold(doNothing, renderBoard);
	renderObj.msg.fold(clearMessage, renderMessage);
}

function renderBoard(gameBoard: GameBoard): GameBoard {
	gameBoard.forEach((area) => changeInnerTextOf(toString(area.id), area.occupiedBy));
	return gameBoard;
}

function clearMessage() {
	return renderMessage('');
}

function renderMessage(msg: string) {
	changeInnerTextOf('messageBoard', msg);
}

function changeInnerTextOf(id: string, text: string): void {
	const el = document.getElementById(id);
	(el) ? el.innerText = text : doNothing();
}
