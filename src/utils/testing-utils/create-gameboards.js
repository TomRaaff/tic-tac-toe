import {areaIds, tags} from "../../constants.js";

// (string?) -> 'X' | 'O' | 'none';
function generateOption(player) {
	let options = [tags.PLAYER, tags.CPU, tags.NONE];
	options = (player) ? options : options.filter((option) => option !== player);
	const randomIndex = Math.floor(Math.random() * options.length);
	return options[randomIndex];
}

// (string, num[], boolean?) -> GameBoard
function createGameboardFor(player, combination, excludePlayer = false) {
	return areaIds.map((areaId) => {
		return {
			id: areaId,
			occupiedBy: (combination.includes(areaId)) ? player : generateOption((excludePlayer) ? undefined : player)
		}
	});
}

// (string, number[][], boolean?) -> GameBoard[]
export function createMultipleGameboardsFor(player, combinations, excludePlayer = false) {
	return combinations.map((combination) => createGameboardFor(player, combination, excludePlayer));
}

// (number[], number[]) -> GameBoard
export function createGameBoard(xEntries, oEntries) {
	const xAreas = areaIds.filter((areaId) => xEntries.includes(areaId))
						  .map((areaId) => ({id: areaId, occupiedBy: tags.PLAYER}));
	const oAreas = areaIds.filter((areaId) => oEntries.includes(areaId))
						  .map((areaId) => ({id: areaId, occupiedBy: tags.CPU}));
	const filledAreas = [...xAreas, ...oAreas];
	const emptyAreas = areaIds.filter((areaId) => !filledAreas.map(area => area.id).includes(areaId))
							  .map((areaId) => ({id: areaId, occupiedBy: tags.NONE}));
	return [...filledAreas, ...emptyAreas].sort((cur, prev) => cur.id - prev.id);
}
