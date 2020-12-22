import {readGameBoard, render} from "./io.js";
import {winningCombinations} from "./constants.js";

// (number) -> GameBoard
export function play(areaId) {
	const gameBoard = readGameBoard();

	if (isAvailable(areaId, gameBoard)) {
		// (number) -> GameBoard
		const submitPlayerMove = fillGameBoard(gameBoard, 'X');
		const playerFilledBoard = submitPlayerMove(areaId);
		if ('X' === winner(playerFilledBoard)) {
			return playerFilledBoard;
		}
		// (number) -> GameBoard
		const submitComputerMove = fillGameBoard(playerFilledBoard, 'O');
		const randomArea = pickRandomAvailableAreaId(playerFilledBoard);
		return submitComputerMove(randomArea);
	} else {
		// todo: convert to Either<GameBoard, NotAvailable>
		const notAvailableMsg = 'Area ' + areaId + ' is NOT available. Pick again.';
		return render(gameBoard, notAvailableMsg);
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
	// all elements of winningCombi array should be true to be a winner;
	return winningCombi.map((areaLocation) => playerEntries.includes(areaLocation))
					   .reduce((acc, cur) => (acc) ? cur : acc, true);
}

// (GameBoard) -> (string) -> boolean
function checkWinner(gameBoard) {
	return function isPlayerWinner(player) {
		const locations = gameBoard.filter((area) => area.occupiedBy === player)
								   .map((area) => area.id);
		return winningCombinations.map((combi) => isWinningCombination(combi, locations))
								  .filter((isWinning) => (isWinning))
			.length > 0;
	}
}

// (GameBoard) -> 'X' | 'O' | 'undetermined'
export function winner(gameBoard) {
	const isWinner = checkWinner(gameBoard);
	if (isWinner('X')) return 'X';
	if (isWinner('O')) return 'O';
	return 'undetermined';
}
