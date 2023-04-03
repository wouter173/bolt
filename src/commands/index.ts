import { handle as ballHandle, definition as ballDef } from './8ball';
import { handle as daysHandle, definition as daysDef } from './dayssince';
import { handle as motdHandle, definition as motdDef } from './motd';
import { handle as daysChannelHandle, definition as daysChannelDef } from './dayssincechannel';

export const definitions = { '8ball': ballDef, days: daysDef, motd: motdDef, dayssincechannel: daysChannelDef };
export const handles = { '8ball': ballHandle, days: daysHandle, motd: motdHandle, dayssincechannel: daysChannelHandle };
