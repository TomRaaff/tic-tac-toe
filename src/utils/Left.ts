export default class Left<L> {
	private constructor(private readonly value: L) {}

	isLeft() { return true; }

	isRight() { return false; }

	map(fn: (l:L) => Left<any>) { return this; }

	flatMap(fn: (l:L) => any) { return this; }

	fold(ifLeft: (l:L) => any, fn: Function) { return ifLeft(this.value); }

	static of<L>(value: L) {
		return new Left(value);
	}
}
