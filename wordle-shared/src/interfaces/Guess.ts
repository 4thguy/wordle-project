import type { ValidationResult } from 'wordle-shared/enums/ValidationResult';
import type { Word } from 'wordle-shared/interfaces/Word';

export interface Guess {
	validationResult: ValidationResult;
	word?: Word;
}
