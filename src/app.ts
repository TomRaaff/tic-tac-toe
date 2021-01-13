import { attachGameClickHandlers, attachRestartClickHandler } from './io';

/*
	todo:
		- submit as starting repo for other projects
 */
export function start() {
	console.log('Lets play tic tac toe!');
	attachGameClickHandlers();
	attachRestartClickHandler();
}

start();
