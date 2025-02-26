import { Tag, winningCombinations } from './constants';
import { Maybe } from './utils/Maybe';
import RenderObject from './utils/RenderObject.model';
import { GameBoard } from './utils/GameBoard.model';
import Area from './utils/Area.model';

function findArea(id: number, gameBoard: GameBoard): Maybe<Area> {
	return Maybe.of(gameBoard.find(((area) => area.id === id)));
}

function fillGameBoard(gameBoard: GameBoard, playerTag: Tag, areaId: number): GameBoard {
	return gameBoard.map((area) => ({
		...area,
		occupiedBy: (area.id === areaId) ? playerTag : area.occupiedBy,
	}));
}

function pickRandomAvailableAreaId(gameBoard: GameBoard): number {
	const randomIndex = Math.floor(Math.random() * gameBoard.length);
	const area = gameBoard[randomIndex];
	return (area.occupiedBy === Tag.NONE) ? area.id : pickRandomAvailableAreaId(gameBoard);
}

export function isWinningCombination(winningCombi: number[], playerEntries: number[]): boolean {
	// all elements of winningCombi array should be true to be a winner;
	return winningCombi.map((areaLocation) => playerEntries.includes(areaLocation))
					   .reduce((acc, cur) => {
						   if (acc) {
							   return cur;
						   }
						   return acc;
					   }, true);
}

function checkWinner(gameBoard: GameBoard): (a: string) => boolean {
	return function isPlayerWinner(player: string) {
		const playerEntries = gameBoard.filter((area) => area.occupiedBy === player)
									   .map((area) => area.id);
		return winningCombinations.map((combi) => isWinningCombination(combi, playerEntries))
								  .filter((isWinning) => (isWinning))
			.length > 0;
	};
}

export function getWinner(gameBoard: GameBoard): Tag {
	const isWinner = checkWinner(gameBoard);
	if (isWinner(Tag.PLAYER)) return Tag.PLAYER;
	if (isWinner(Tag.CPU)) return Tag.CPU;
	return Tag.UNDETERMINED;
}

function getMessage(winner: Tag): Maybe<string> {
	if (winner === Tag.PLAYER) {
		return Maybe.of('Great job! You won!');
	}
	if (winner === Tag.CPU) {
		return Maybe.of('Oh no! You lost!');
	}
	return Maybe.empty();
}

function playerMove(areaId: number, gameBoard: GameBoard): GameBoard {
	return fillGameBoard(gameBoard, Tag.PLAYER, areaId);
}

function cpuMove(gameBoard: GameBoard): GameBoard {
	const randomArea = pickRandomAvailableAreaId(gameBoard);
	return fillGameBoard(gameBoard, Tag.CPU, randomArea);
}

function isAvailable(areaId: number, gameBoard: GameBoard): boolean {
	return findArea(areaId, gameBoard).fold(() => false,
		(area: Area) => area.occupiedBy === Tag.NONE);
}

export function play(areaId: number, gameBoard: GameBoard): RenderObject {
	if (isAvailable(areaId, gameBoard)) {
		const playerGameBoard = playerMove(areaId, gameBoard);
		if (Tag.PLAYER === getWinner(playerGameBoard)) {
			return new RenderObject(playerGameBoard,
				getMessage(getWinner(playerGameBoard)));
		}
		const cpuGameBoard = cpuMove(playerGameBoard);
		return new RenderObject(cpuGameBoard,
			getMessage(getWinner(cpuGameBoard)));
	}
	return new RenderObject(Maybe.empty(), 'Area is not available. Pick a different one');
}
