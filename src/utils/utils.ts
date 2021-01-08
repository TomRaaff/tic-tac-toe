function log(fn: (...args: any) => any): (...args: any) => any {
	return function innerLog(...args: any) {
		console.log(fn.name, '( ', ...args, ' ) -> ', fn(...args));
		return fn(...args);
	}
}

function toString(num: number): string {
	return num.toString();
}

function doNothing(): void {
}

export {log, toString, doNothing};
