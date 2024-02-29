import type { ValidationResult } from '../enums/ValidationResult';
import type { Word } from './Word';

export interface Guess {
	validationResult: ValidationResult;
	word?: Word;
}
