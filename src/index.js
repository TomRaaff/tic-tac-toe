import { attachClickHandlers } from './io.js';

/*
	todo:
		- implement in TS
		- add better testing
		- submit as starting repo for other projects
 */
export function start() {
	console.log('Lets play tic tac toe!');
	attachClickHandlers();
}

start();
