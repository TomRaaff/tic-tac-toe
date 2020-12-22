function log(fn) {
	return function innerLog(...args) {
		console.log(fn.name, '( ', ...args, ' ) -> ', fn(...args));
		return fn(...args);
	}
}

function toString(num) {
	return num.toString();
}

export {log, toString};
