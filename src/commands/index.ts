import { handle as ballHandle, definition as ballDef } from './8ball';
import { handle as daysHandle, definition as daysDef } from './dayssince';

export const definitions = { '8ball': ballDef, days: daysDef };
export const handles = { '8ball': ballHandle, days: daysHandle };
