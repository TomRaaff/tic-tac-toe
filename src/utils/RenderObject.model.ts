// @ts-ignore
import {Maybe} from "./Maybe";
import { GameBoard } from './GameBoard.model';

export class RenderObject {
	public readonly gameBoard: Maybe<GameBoard>;
	public readonly msg: Maybe<string>;
	constructor(gameBoard: GameBoard | Maybe<GameBoard>,
				msg: string | Maybe<string>) {
		this.gameBoard = (gameBoard instanceof Maybe) ? gameBoard : Maybe.of(gameBoard);
		this.msg = (msg instanceof Maybe) ? msg : Maybe.of(msg);
	}
}
