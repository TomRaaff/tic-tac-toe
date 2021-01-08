import {Maybe} from "./Maybe.js";

// {gameBoard: Maybe<GameBoard, msg: Maybe<string>}
export class RenderObject {
	// (GameBoard|Maybe<GameBoard>, string|Maybe<string>) -> RenderObject
	constructor(gameBoard, msg) {
		this.gameBoard = Maybe.of(gameBoard) || Maybe.empty();
		this.msg = Maybe.of(msg) || Maybe.empty();
	}
}
