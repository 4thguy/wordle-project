import type { LetterResult } from 'wordle-shared/enums/LetterResult';

export interface Letter {
	data: string;
	status: LetterResult;
}
