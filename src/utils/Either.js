// todo: type this
class Left {
	constructor(value) {
		this.value = value;
	}

	isLeft() { return true; }
	isRight() { return false; }
	map(fn) { return this; }
	flatMap(fn) { return this;}
	fold(ifLeft, fn) { return ifLeft(this.value); }
	static of(value) {
		return new Left(value);
	}
}

class Right {
	constructor(value) {
		this.value = value;
	}

	get() { return value; }
	isLeft() { return false; }
	isRight() { return true; }
	map(fn) { return Right.of(fn(this.value)); }
	flatMap(fn) { return fn(this.value); }
	fold(ifLeft, fn) { return fn(this.value); }
	static of(value) {
		return new Right(value);
	}
}

class Either {
	constructor(leftOrRight) {
		this.value = leftOrRight;
	}
	get() { return this.value.get(); }
	isLeft() { return this.value.isLeft(); }
	isRight() { return this.value.isRight(); }
	map(fn) { return this.value.map(fn); }
	flatMap(fn) { return this.value.flatMap(fn); }
	fold(ifLeft, fn) { return this.value.fold(ifLeft, fn); }
	static of(val) { return new Either(Right.of(val)); }
	static ofLeft(val) { return new Either(Left.of(val)); }
}

export { Left, Right, Either };
