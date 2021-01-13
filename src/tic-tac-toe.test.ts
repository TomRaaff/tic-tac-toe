import { describe, it } from '@jest/globals';
import { isWinningCombination, play, winner } from './tic-tac-toe';
import { Tag, winningCombinations } from './constants';
import { createGameBoard, createMultipleGameboardsFor } from './utils/testing-utils/create-gameboards';

function fail() {
	expect(false).toBe(true);
}

// todo: mock de randomgenerator? Dan kan je een specifiek antwoord verwachten
describe('tic-tac-toe', () => {
	describe('play', () => {
		it('should add "X"  to the right location on the gameboard', () => {
			const emptyGameBoard = createGameBoard([], []);
			const expected = { id: 11, occupiedBy: 'X' };
			const result = play(11, emptyGameBoard);
			const resultArea = result.gameBoard.fold(() => fail(),
													 (board) => board.find((area) => area.id === expected.id));
			expect(resultArea).toEqual(expected);
		});
		it('should add a single "O" to a random location on the gameboard', () => {
			const emptyGameBoard = createGameBoard([], []);
			const renderObject = play(11, emptyGameBoard);
			const allOs = renderObject.gameBoard.fold(() => fail(),
													  (board) => board.filter((area) => area.occupiedBy === 'O'));
			expect(allOs.length).toEqual(1);
			expect(allOs[0].id).not.toBe(11);
		});
		describe('when area is already taken', () => {
			it('should return an empty GameBoard and give an unavailable message', () => {
				const emptyGameBoard = createGameBoard([11], [12]);
				const renderObject = play(11, emptyGameBoard);
				renderObject.gameBoard.fold(() => expect(true).toBe(true),
											() => fail());
				renderObject.msg.fold(() => fail(),
									  (msg) => expect(typeof msg).toEqual('string'));
			});
		});
	});

	describe('winner', () => {
		it('should have "X" win in all winning situations', () => {
			const player = Tag.PLAYER;
			const gameBoards = createMultipleGameboardsFor(player, winningCombinations);
			gameBoards.forEach((gameBoard) => {
				expect(winner(gameBoard)).toBe(player);
			});
		});

		it('should have "O" win in all winning situations', () => {
			const player = Tag.CPU;
			const gameBoards = createMultipleGameboardsFor(player, winningCombinations);
			gameBoards.forEach((gameBoard) => {
				expect(winner(gameBoard)).toBe(player);
			});
		});

		it('should return "undetermined" when there is no winner', () => {
			const tieCombinations = [
				[11, 13, 22, 31, 33],
				[12, 21, 23, 32],
				[11, 13, 22, 31]
			];
			const gameBoardsForNone = createMultipleGameboardsFor(Tag.PLAYER, tieCombinations, true);
			gameBoardsForNone.forEach(gameBoard => {
				expect(winner(gameBoard)).toBe('undetermined');
			});
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
