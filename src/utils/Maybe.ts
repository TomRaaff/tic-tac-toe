class Some<T> {
	constructor(private val: T) {}

	map(fn: (t: T) => Maybe<any>) { return new Some(fn(this.val)); }

	flatMap(fn: (t: T) => any) { return fn(this.val); }

	fold(ifEmpty: () => void, fn: (t: T) => any) { return fn(this.val); }
}

class None<T> {
	map(fn: (t: T) => Maybe<any>) { return this; }

	flatMap(fn: (t: T) => any) { return this; }

	fold(ifEmpty: () => void, fn: (t: T) => any) { return ifEmpty(); }
}

class Maybe<T> {
	private val: Some<T> | None<T>;

	constructor(input?: T | undefined) {
		const value: T = (input instanceof Maybe)
			? input.fold(() => undefined,
					   (val: T) => val)
			: input;
		this.val = (value) ? new Some(value) : new None();
	}

	map(fn: (t: T) => Maybe<any>) { return this.val.map(fn); }

	flatMap(fn: (t: T) => any) { return this.val.flatMap(fn); }

	fold(ifEmpty: () => void, fn: (t: T) => any) { return this.val.fold(ifEmpty, fn); }

	static of<T>(val: T | undefined) { return new Maybe(val); }

	static empty<T>() { return new Maybe<T>(); }
}

export { Maybe };
