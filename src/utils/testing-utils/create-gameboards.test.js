import {createGameBoard} from "./create-gameboards";
import {describe, it} from "@jest/globals";

describe('create-gameboards', () => {
	describe('createGameboard', () => {
		it('should create an empty gameboard', () => {
			const result = createGameBoard([], []);
			const expected = [
				{id: 11, occupiedBy: 'none'},
				{id: 12, occupiedBy: 'none'},
				{id: 13, occupiedBy: 'none'},
				{id: 21, occupiedBy: 'none'},
				{id: 22, occupiedBy: 'none'},
				{id: 23, occupiedBy: 'none'},
				{id: 31, occupiedBy: 'none'},
				{id: 32, occupiedBy: 'none'},
				{id: 33, occupiedBy: 'none'},
			]
			expect(result).toEqual(expected);
		});
		it('should create a gameboard with "X" included', () => {
			const result = createGameBoard([11, 22, 33], []);
			const expected = [
				{id: 11, occupiedBy: 'X'},
				{id: 12, occupiedBy: 'none'},
				{id: 13, occupiedBy: 'none'},
				{id: 21, occupiedBy: 'none'},
				{id: 22, occupiedBy: 'X'},
				{id: 23, occupiedBy: 'none'},
				{id: 31, occupiedBy: 'none'},
				{id: 32, occupiedBy: 'none'},
				{id: 33, occupiedBy: 'X'},
			]
			expect(result).toEqual(expected);
		});
		it('should create a gameboard with "O" included', () => {
			const result = createGameBoard([],[11, 22, 33]);
			const expected = [
				{id: 11, occupiedBy: 'O'},
				{id: 12, occupiedBy: 'none'},
				{id: 13, occupiedBy: 'none'},
				{id: 21, occupiedBy: 'none'},
				{id: 22, occupiedBy: 'O'},
				{id: 23, occupiedBy: 'none'},
				{id: 31, occupiedBy: 'none'},
				{id: 32, occupiedBy: 'none'},
				{id: 33, occupiedBy: 'O'},
			]
			expect(result).toEqual(expected);
		});
		it('should create a gameboard with "X" and "O" included', () => {
			const result = createGameBoard([12, 13, 23],[11, 22, 33]);
			const expected = [
				{id: 11, occupiedBy: 'O'},
				{id: 12, occupiedBy: 'X'},
				{id: 13, occupiedBy: 'X'},
				{id: 21, occupiedBy: 'none'},
				{id: 22, occupiedBy: 'O'},
				{id: 23, occupiedBy: 'X'},
				{id: 31, occupiedBy: 'none'},
				{id: 32, occupiedBy: 'none'},
				{id: 33, occupiedBy: 'O'},
			]
			expect(result).toEqual(expected);
		});
	});
});
