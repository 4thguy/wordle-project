import type { LetterResult } from '../enums/LetterResult';

export interface Letter {
	data: string;
	status: LetterResult;
}
