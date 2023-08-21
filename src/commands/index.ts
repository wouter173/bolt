import { handle as ballHandle, definition as ballDef } from './8ball';
import { handle as daysHandle, definition as daysDef } from './dayssince';
import { handle as motdHandle, definition as motdDef } from './motd';
import { handle as daysChannelHandle, definition as daysChannelDef } from './dayssincechannel';
import { handle as duoHandle, definition as duoDef } from './duo';
import { handle as monthsHandle, definition as monthsDef } from './months';
import { handle as weeknrHandle, definition as weeknrDef } from './weeknr';
import { handle as zorgtoeslagHandle, definition as zorgtoeslagDef } from './zorgtoeslag';

export const definitions = {
	'8ball': ballDef,
	days: daysDef,
	motd: motdDef,
	dayssincechannel: daysChannelDef,
	duo: duoDef,
	months: monthsDef,
	weeknr: weeknrDef,
	zorgtoeslag: zorgtoeslagDef,
};
export const handles = {
	'8ball': ballHandle,
	days: daysHandle,
	motd: motdHandle,
	dayssincechannel: daysChannelHandle,
	duo: duoHandle,
	months: monthsHandle,
	weeknr: weeknrHandle,
	zorgtoeslag: zorgtoeslagHandle,
};
