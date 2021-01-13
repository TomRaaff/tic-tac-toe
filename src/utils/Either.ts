class Left<L> {
	constructor(private readonly value: L) {}
	isLeft() { return true; }
	isRight() { return false; }
	map(fn: (l:L) => Left<any>) { return this; }
	flatMap(fn: (l:L) => any) { return this;}
	fold(ifLeft: (l:L) => any, fn: Function) { return ifLeft(this.value); }
	static of<L>(value: L) {
		return new Left(value);
	}
}

class Right<R> {
	constructor(private readonly value: R) {}
	isLeft() { return false; }
	isRight() { return true; }
	map(fn: (r: R) => Right<any>) { return Right.of(fn(this.value)); }
	flatMap(fn: (r: R) => any) { return fn(this.value); }
	fold(ifLeft: Function, fn: (r: R) => any) { return fn(this.value); }
	static of<R>(value: R) {
		return new Right(value);
	}
}

class Either<L,R> {
	constructor(private readonly value: Left<L> | Right<R>) {}
	isLeft() { return this.value.isLeft(); }
	isRight() { return this.value.isRight(); }
	map(fn: (a: L|R) => any) { return this.value.map(fn); }
	flatMap(fn: (a: L|R) => any) { return this.value.flatMap(fn); }
	fold(ifLeft: (l:L) => any, fn: (r: R) => any) { return this.value.fold(ifLeft, fn); }
	static of<R>(val: R) { return new Either(Right.of(val)); }
	static ofLeft<L>(val: L) { return new Either(Left.of(val)); }
}

export { Left, Right, Either };
