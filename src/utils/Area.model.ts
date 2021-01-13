import { Tag } from '../constants';

export class Area {
	constructor(public readonly id: number,
				public readonly occupiedBy: Tag) {
	}
}
