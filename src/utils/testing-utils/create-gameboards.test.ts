import {createGameBoard} from "./create-gameboards";
import {describe, it} from "@jest/globals";
import { GameBoard } from '../GameBoard.model';
import { Tag } from '../../constants';

describe('create-gameboards', () => {
	describe('createGameboard', () => {
		it('should create an empty gameboard', () => {
			const result = createGameBoard([], []);
			const expected = [
				{id: 11, occupiedBy: Tag.NONE},
				{id: 12, occupiedBy: Tag.NONE},
				{id: 13, occupiedBy: Tag.NONE},
				{id: 21, occupiedBy: Tag.NONE},
				{id: 22, occupiedBy: Tag.NONE},
				{id: 23, occupiedBy: Tag.NONE},
				{id: 31, occupiedBy: Tag.NONE},
				{id: 32, occupiedBy: Tag.NONE},
				{id: 33, occupiedBy: Tag.NONE},
			] as GameBoard;
			expect(result).toEqual(expected);
		});
		it('should create a gameboard with "X" included', () => {
			const result = createGameBoard([11, 22, 33], []);
			const expected = [
				{id: 11, occupiedBy: Tag.PLAYER},
				{id: 12, occupiedBy: Tag.NONE},
				{id: 13, occupiedBy: Tag.NONE},
				{id: 21, occupiedBy: Tag.NONE},
				{id: 22, occupiedBy: Tag.PLAYER},
				{id: 23, occupiedBy: Tag.NONE},
				{id: 31, occupiedBy: Tag.NONE},
				{id: 32, occupiedBy: Tag.NONE},
				{id: 33, occupiedBy: Tag.PLAYER},
			] as GameBoard;
			expect(result).toEqual(expected);
		});
		it('should create a gameboard with "O" included', () => {
			const result = createGameBoard([],[11, 22, 33]);
			const expected = [
				{id: 11, occupiedBy: Tag.CPU},
				{id: 12, occupiedBy: Tag.NONE},
				{id: 13, occupiedBy: Tag.NONE},
				{id: 21, occupiedBy: Tag.NONE},
				{id: 22, occupiedBy: Tag.CPU},
				{id: 23, occupiedBy: Tag.NONE},
				{id: 31, occupiedBy: Tag.NONE},
				{id: 32, occupiedBy: Tag.NONE},
				{id: 33, occupiedBy: Tag.CPU},
			] as GameBoard;
			expect(result).toEqual(expected);
		});
		it('should create a gameboard with "X" and "O" included', () => {
			const result = createGameBoard([12, 13, 23],[11, 22, 33]);
			const expected = [
				{id: 11, occupiedBy: Tag.CPU},
				{id: 12, occupiedBy: Tag.PLAYER},
				{id: 13, occupiedBy: Tag.PLAYER},
				{id: 21, occupiedBy: Tag.NONE},
				{id: 22, occupiedBy: Tag.CPU},
				{id: 23, occupiedBy: Tag.PLAYER},
				{id: 31, occupiedBy: Tag.NONE},
				{id: 32, occupiedBy: Tag.NONE},
				{id: 33, occupiedBy: Tag.CPU},
			] as GameBoard;
			expect(result).toEqual(expected);
		});
	});
});
