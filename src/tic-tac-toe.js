import {tags, winningCombinations} from "./constants.js";
import {Maybe} from "./utils/Maybe.js";
import {RenderObject} from "./utils/RenderObject.js";
import {log} from "./utils/utils.js";

// (number, GameBoard) -> RenderObject<{gameBoard, msg}>
export function play(areaId, gameBoard) {
	if (isAvailable(areaId, gameBoard)) {
		const playerGameBoard = playerMove(areaId, gameBoard);
		if (tags.PLAYER === winner(playerGameBoard)) {
			return new RenderObject(playerGameBoard,
									getMessage(winner(playerGameBoard)));
		}
		const cpuGameBoard = cpuMove(playerGameBoard);
		return new RenderObject(cpuGameBoard,
								getMessage(winner(cpuGameBoard)));
	} else {
		return new RenderObject(Maybe.empty(),'Area is not available. Pick a different one');
	}
}

// (number, GameBoard) -> GameBoard
function playerMove(areaId, gameBoard) {
	return fillGameBoard(gameBoard, tags.PLAYER, areaId);
}

// (GameBoard) -> GameBoard
function cpuMove(gameBoard) {
	const randomArea = pickRandomAvailableAreaId(gameBoard);
	return fillGameBoard(gameBoard, tags.CPU, randomArea);
}

// (number, GameBoard) -> boolean
function isAvailable(areaId, gameBoard) {
	return findArea(areaId, gameBoard).fold(() => false,
											(area) => area.occupiedBy === tags.NONE);
}

// (number, GameBoard) -> Maybe<{id, occupiedBy}>
function findArea(id, gameBoard) {
	return Maybe.of(gameBoard.find((area => area.id === id)));
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
function winner(gameBoard) {
	const isWinner = checkWinner(gameBoard);
	if (isWinner(tags.PLAYER)) return tags.PLAYER;
	if (isWinner(tags.CPU)) return tags.CPU;
	return tags.UNDETERMINED;
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
