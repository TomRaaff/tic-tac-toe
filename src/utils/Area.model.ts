import { Tag } from '../constants.js';

export class Area {
	constructor(public readonly id: number,
				public readonly occupiedBy: Tag) {
	}
}
