// @ts-ignore
import {Maybe} from "./Maybe.js";
import { GameBoard } from './GameBoard.model';

export class RenderObject {
	constructor(public readonly gameBoard: GameBoard | Maybe<GameBoard>,
				public readonly msg: string | Maybe<string>) {
		this.gameBoard = Maybe.of(gameBoard) || Maybe.empty();
		this.msg = Maybe.of(msg) || Maybe.empty();
	}
}
