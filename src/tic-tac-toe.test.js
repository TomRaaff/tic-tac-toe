import {describe, it} from "@jest/globals";
import {isWinningCombination, winner} from './tic-tac-toe.js';
import {areaIds, winningCombinations} from "./constants.js";

// () -> 'X' | 'O' | 'none';
function generateOption(player) {
	let options = ['X', 'O', 'none'];
	options = (player) ? options : options.filter((option) => option !== player);
	const randomIndex = Math.floor(Math.random() * options.length);
	return options[randomIndex];
}

// (string, num[], boolean) -> GameBoard
function createGameboardFor(player, combination, excludePlayer) {
	return areaIds.map((areaId) => {
		return {
			id: areaId,
			occupiedBy: (combination.includes(areaId)) ? player : generateOption((excludePlayer) ? undefined : player)
		}
	});
}

// (string, number[][], boolean) -> GameBoard[]
export function createAllWinningGameboardsFor(player, combinations, excludePlayer = false) {
	return combinations.map((combination) => createGameboardFor(player, combination, excludePlayer));
}

describe('tic-tac-toe', () => {
	describe('winner', () => {
		it('should have "X" win in all winning situations', () => {
			const player = 'X';
			const gameBoards = createAllWinningGameboardsFor(player, winningCombinations);
			gameBoards.forEach((gameBoard) => {
				expect(winner(gameBoard)).toBe(player);
			});
		});

		it('should have "O" win in all winning situations', () => {
			const player = 'O';
			const gameBoards = createAllWinningGameboardsFor(player, winningCombinations);
			gameBoards.forEach((gameBoard) => {
				expect(winner(gameBoard)).toBe(player);
			});
		});

		it('should return "undetermined" when there is no winner', () => {
			const tieingCombinations = [
				[11, 13, 22, 31, 33],
				[12, 21, 23, 32],
				[11, 13, 22, 31]
			]
			const gameBoardForNone = createAllWinningGameboardsFor('X', tieingCombinations, true);
			expect(winner(gameBoardForNone)).toBe('undetermined');
		});
	});

	describe('isWinningCombination', () => {
		it('should resolve true', () => {
			const combination = [1, 2, 3];
			const input = [2, 3, 1];
			expect(isWinningCombination(combination, input)).toBe(true);
		});
		it('should resolve false', () => {
			const combination = [21, 22, 23];
			const input = [22, 23, 32];
			expect(isWinningCombination(combination, input)).toBe(false);
		});
		it('should resolve false', () => {
			const combination = [1, 2, 4];
			const input = [2, 3, 1];
			expect(isWinningCombination(combination, input)).toBe(false);
		});
	});
});
