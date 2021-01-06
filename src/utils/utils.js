// (Function) -> Function
function log(fn) {
	return function innerLog(...args) {
		console.log(fn.name, '( ', ...args, ' ) -> ', fn(...args));
		return fn(...args);
	}
}

// (number) -> string
function toString(num) {
	return num.toString();
}

// () -> void
function doNothing() {
}

export {log, toString, doNothing};
