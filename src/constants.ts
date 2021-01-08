export const areaIds = [11, 12, 13, 21, 22, 23, 31, 32, 33];
export const winningCombinations = [
	[11, 12, 13],
	[21, 22, 23],
	[31, 32, 33],
	[11, 21, 31],
	[12, 22, 32],
	[13, 23, 33],
	[11, 22, 33],
	[31, 22, 13]
]
export enum Tag {
	PLAYER = 'X',
	CPU = 'O',
	NONE = 'none',
	UNDETERMINED = 'undetermined'
}
