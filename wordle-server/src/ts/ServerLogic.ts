import { Config } from '../config/Config';
import { DictionaryLogic } from './DictionaryLogic';
import { LetterResult } from 'wordle-shared/enums/LetterResult';
import { ValidationResult } from 'wordle-shared/enums/ValidationResult';
import type { Word } from 'wordle-shared/interfaces/Word';
import type { Letter } from 'wordle-shared/interfaces/Letter';
import type { Guess } from 'wordle-shared/interfaces/Guess';

export class ServerLogic {
	/**
	 * Grades a guess.
	 * @param guess
	 * @returns The graded word.
	 */
	private static gradeGuess(guess: string): Word {
		const currentWord = DictionaryLogic.getTodaysWord();

		const word: Word = [];
		guess.split('').forEach((guessLetter: string, i: number) => {
			const targetLetter = currentWord[i];
			const guessLetterStatus =
				guessLetter === targetLetter
					? LetterResult.CORRECT_POSITION
					: currentWord.indexOf(guessLetter) > -1
						? LetterResult.CORRECT_LETTER
						: LetterResult.INCORRECT_LETTER;
			const letter: Letter = {
				data: guessLetter,
				status: guessLetterStatus,
			};
			word.push(letter);
		});

		return word;
	}

	/**
	 * Validates a guess.
	 * @param guess
	 * @param wordId
	 * @returns A promise that resolves to the result of the guess validation.
	 */
	public static validateGuess(guess: string, wordId: number): Promise<Guess> {
		return new Promise<Guess>((resolve) => {
			if (!DictionaryLogic.isWordIdValid(wordId)) {
				resolve({
					validationResult: ValidationResult.EXPIRED,
				});
			}
			if (guess.length !== Config.WordLength) {
				resolve({
					validationResult: ValidationResult.NOT_IN_DICTIONARY,
				});
			}
			DictionaryLogic.isGuessInDictionary(guess).then((isInDictionary) => {
				if (!isInDictionary) {
					resolve({
						validationResult: ValidationResult.NOT_IN_DICTIONARY,
					});
				} else {
					resolve({
						validationResult: ValidationResult.IN_DICTIONARY,
						word: this.gradeGuess(guess),
					});
				}
			});
		});
	}
}
