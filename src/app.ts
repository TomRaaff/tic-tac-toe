// @ts-ignore
import {attachGameClickHandlers, attachRestartClickHandler} from './io.js';

/*
	todo:
		- implement in TS
		- implement eslint (eslint-config-airbnb)
		- submit as starting repo for other projects
 */
export function start() {
	console.log('Lets play tic tac toe!');
	attachGameClickHandlers();
	attachRestartClickHandler();
}

start();
