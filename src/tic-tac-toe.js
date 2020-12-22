import {readGameBoard, render} from "./io.js";
import {winningCombinations} from "./constants.js";

// (number) -> void
export function play(areaId) {
	const gameBoard = readGameBoard();

	if (isAvailable(areaId, gameBoard)) {
		// (number) -> GameBoard
		const submitPlayerMove = fillGameBoard(gameBoard, 'X');
		const playerFilledBoard = submitPlayerMove(areaId);
		if ('X' === winner(playerFilledBoard)) {
			render(playerFilledBoard);
			congratulate();
		} else {
			const submitComputerMove = fillGameBoard(playerFilledBoard, 'O');
			const computerFilledBoard = submitComputerMove(pickRandomAvailableAreaId(playerFilledBoard));
			render(computerFilledBoard);
			if ('O' === winner(computerFilledBoard) || winner(computerFilledBoard) === 'none') boo();
		}
	} else {
		renderMessage('Area', areaId, 'is NOT available. Pick again.');
	}
}

// (number, GameBoard) -> Area
function findArea(id, gameBoard) {
	return gameBoard.reduce((acc, cur) => (cur.id === id) ? cur : acc, {id: 0});
}

// (number, GameBoard) -> boolean
function isAvailable(areaId, gameBoard) {
	return findArea(areaId, gameBoard).occupiedBy === 'none';
}

// (GameBoard, string) -> (number) -> GameBoard
function fillGameBoard(gameBoard, playerTag) {
	return function fillBoard(areaId) {
		return gameBoard.map((area) => {
			return {
				...area,
				occupiedBy: (areaId === area.id) ? playerTag : area.occupiedBy
			}
		});
	}
}

// (GameBoard) -> number
function pickRandomAvailableAreaId(gameBoard) {
	const randomIndex = Math.floor(Math.random() * gameBoard.length);
	const area = gameBoard[randomIndex];
	return (area.occupiedBy === 'none') ? area.id : pickRandomAvailableAreaId(gameBoard);
}

// (number[], number[]) => boolean
export function isWinningCombination(winningCombi, playerEntries) {
	return winningCombi.map((areaLocation) => playerEntries.includes(areaLocation))
					   // all elements of array should be true to be a winner;
					   .reduce((acc, cur) => (acc) ? cur : acc, true);
}

// (GameBoard) -> 'X' | 'O' | 'none' | 'undetermined'
export function winner(gameBoard) {
	const xLocations = gameBoard.filter((area) => area.occupiedBy === 'X')
								.map((area) => area.id);
	const oLocations = gameBoard.filter((area) => area.occupiedBy === 'O')
								.map((area) => area.id);
	const isXWinner = winningCombinations.map((combi) => isWinningCombination(combi, xLocations))
										 .filter((isWinning) => (isWinning))
										 .length > 0;
	if (isXWinner) return 'X';

	const isOWinner = winningCombinations.map((combi) => isWinningCombination(combi, oLocations))
										 .filter((isWinning) => isWinning)
		.length > 0;
	if (isOWinner) return 'O';
	return 'undetermined';
}


// contains side-effect
// () -> void
function congratulate() {
	renderMessage('Congratulations! You won!');
}

// contains side-effect
// () -> void
function boo() {
	renderMessage('Booo.... You lost...');
}

// contains side-effect
// (string) -> void
function renderMessage(msg) {
	window.alert(msg);
	console.log(msg);
}
