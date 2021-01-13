import { Tag } from '../constants';

export default class Area {
	constructor(public readonly id: number,
				public readonly occupiedBy: Tag) {
	}
}
