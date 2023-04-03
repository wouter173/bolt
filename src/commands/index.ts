import { handle as ballHandle, definition as ballDef } from './8ball';
import { handle as daysHandle, definition as daysDef } from './dayssince';
import { handle as motdHandle, definition as motdDef } from './motd';

export const definitions = { '8ball': ballDef, days: daysDef, motd: motdDef };
export const handles = { '8ball': ballHandle, days: daysHandle, motd: motdHandle };
