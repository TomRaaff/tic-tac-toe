import {tags, winningCombinations} from "./constants.js";
import {Either} from "./utils/Either.js";

// (number) -> Either[NotAvailableMsg, GameBoard]
export function play(areaId, gameBoard) {
	return whenAvailable(areaId, gameBoard)
		.map((gameBoard) => {
			const playerFilledBoard = fillGameBoard(gameBoard, tags.PLAYER, areaId);
			if ('X' === winner(playerFilledBoard)) {
				return playerFilledBoard;
			}
			const randomArea = pickRandomAvailableAreaId(playerFilledBoard);
			return fillGameBoard(playerFilledBoard, tags.CPU, randomArea);
		});
}

// todo: REVIEW
//		this used to be a string. I refactored it to return an Either so I could
//		remove an if-statement in the play-function. Not sure if it is an improvement.
// (number, GameBoard) -> Either[NotAvailableMsg, GameBoard]
function whenAvailable(areaId, gameBoard) {
	const isAvailable = findArea(areaId, gameBoard).occupiedBy === tags.NONE;
	return (isAvailable) ? Either.of(gameBoard) : Either.ofLeft('Area is not available. Pick a different one');
}

// (number, GameBoard) -> Area
function findArea(id, gameBoard) {
	return gameBoard.reduce((acc, cur) => (cur.id === id) ? cur : acc, {id: 0});
}

// (GameBoard, string, number) -> GameBoard
function fillGameBoard(gameBoard, playerTag, areaId) {
	return gameBoard.map((area) => {
		return {
			...area,
			occupiedBy: (areaId === area.id) ? playerTag : area.occupiedBy
		}
	});
}

// (GameBoard) -> number
function pickRandomAvailableAreaId(gameBoard) {
	const randomIndex = Math.floor(Math.random() * gameBoard.length);
	const area = gameBoard[randomIndex];
	return (area.occupiedBy === tags.NONE) ? area.id : pickRandomAvailableAreaId(gameBoard);
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
	if (isWinner(tags.PLAYER)) return tags.PLAYER;
	if (isWinner(tags.CPU)) return tags.CPU;
	return tags.UNDETERMINED;
}
