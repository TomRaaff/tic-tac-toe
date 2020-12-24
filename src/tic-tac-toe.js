import {tags, winningCombinations} from "./constants.js";
import {Either} from "./utils/Either.js";
import {Maybe} from "./utils/Maybe";

// todo play moet acties teruggeven. Welke acties moeten hier uit komen? Implementeren zoals React redux systeem?
// todo moet de cpu move in deze functie staan?
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

// todo: terug schrijven naar return boolean voor een if-statement in de play function
// (number, GameBoard) -> Either[NotAvailableMsg, GameBoard]
function whenAvailable(areaId, gameBoard) {
	const area = findArea(areaId, gameBoard);
	if (area) {
		const isAvailable = area.occupiedBy === tags.NONE;
		return (isAvailable) ? Either.of(gameBoard) : Either.ofLeft('Area is not available. Pick a different one');
	}
}


// todo return Maybe
function findArea(id, gameBoard) {
	return gameBoard.find((area => area.id === id));
}

// (GameBoard, string, number) -> GameBoard
function fillGameBoard(gameBoard, playerTag, areaId) {
	return gameBoard.map((area) => {
		return {
			...area,
			occupiedBy: (area.id === areaId) ? playerTag : area.occupiedBy
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
		const playerEntries = gameBoard.filter((area) => area.occupiedBy === player)
									   .map((area) => area.id);
		return winningCombinations.map((combi) => isWinningCombination(combi, playerEntries))
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
