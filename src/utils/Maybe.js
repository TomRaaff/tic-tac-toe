class Some {
	constructor(val) {
		this.val = val;
	}
	map(fn) { return new Some(fn(this.val)); }
	flatMap(fn) { return fn(this.val); }
	fold(ifEmpty, fn) { return fn(this.val);}
}

class None {
	map(fn) { return this; }
	flatMap(fn) { return this; }
	fold(ifEmpty, fn) { return ifEmpty(); }
}

class Maybe {
	constructor(val) {
		const value = (val instanceof Maybe)
			? val.fold(() => undefined,
					   (value) => value)
			: val;
		this.val = (value) ? new Some(value) : new None();
	}
	map(fn) { return this.val.map(fn); }
	flatMap(fn) { return this.val.flatMap(fn); }
	fold(ifEmpty, fn) { return this.val.fold(ifEmpty, fn); }
	static of(val) { return new Maybe(val); }
	static empty() { return new Maybe(); }
}

export { Maybe }
