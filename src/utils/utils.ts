function log(fn: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown {
	return function innerLog(...args: unknown[]) {
		console.log(fn.name, '( ', ...args, ' ) -> ', fn(...args));
		return fn(...args);
	};
}

function toString(num: number): string {
	return num.toString();
}

function doNothing(): void {
}

export { log, toString, doNothing };
