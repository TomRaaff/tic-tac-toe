import { areaIds, Tag } from '../../constants';
import { GameBoard } from '../GameBoard.model';
import Area from '../Area.model';

function generateOption(player: Tag | undefined): Tag {
	let options = [Tag.PLAYER, Tag.CPU, Tag.NONE];
	options = (player) ? options : options.filter((option) => option !== player);
	const randomIndex = Math.floor(Math.random() * options.length);
	return options[randomIndex];
}

function createGameboardFor(player: Tag, combination: number[], excludePlayer = false): GameBoard {
	return areaIds.map((areaId) => ({
		id: areaId,
		occupiedBy: (combination.includes(areaId))
			? player
			: generateOption((excludePlayer) ? undefined : player),
	}));
}

export function createMultipleGameboardsFor(player: Tag,
	combinations: number[][],
	excludePlayer = false): GameBoard[] {
	return combinations.map((combination) => createGameboardFor(player, combination, excludePlayer));
}

export function createGameBoard(playerEntries: number[], cpuEntries: number[]): GameBoard {
	const xAreas = areaIds.filter((areaId) => playerEntries.includes(areaId))
						  .map((areaId) => new Area(areaId, Tag.PLAYER));
	const oAreas = areaIds.filter((areaId) => cpuEntries.includes(areaId))
						  .map((areaId) => new Area(areaId, Tag.CPU));
	const filledAreas = [...xAreas, ...oAreas];
	const emptyAreas = areaIds.filter((areaId) => !filledAreas.map((area) => area.id)
															  .includes(areaId))
							  .map((areaId) => new Area(areaId, Tag.NONE));
	return [...filledAreas, ...emptyAreas].sort((cur, prev) => cur.id - prev.id);
}
