import { DictionaryLogic } from "./DictionaryLogic";
import { LetterResult } from "wordle-shared/enums/LetterResult";
import { ValidationResult } from "wordle-shared/enums/ValidationResult";
import type { Word } from "wordle-shared/interfaces/Word";
import type { Letter } from "wordle-shared/interfaces/Letter";
import type { Guess } from "wordle-shared/interfaces/Guess";

export class ServerLogic {
    private static gradeGuess(guess: string): Word {
        const currentWord = DictionaryLogic.getTodaysWord();

        const word: Word = [];
        guess
            .split('')
            .forEach((guessLetter: string, i: number) => {
                const targetLetter = currentWord[i];
                const guessLetterStatus = guessLetter === targetLetter
                    ? LetterResult.CORRECT_POSITION
                    : currentWord.indexOf(guessLetter) > -1
                        ? LetterResult.CORRECT_LETTER
                        : LetterResult.INCORRECT_LETTER
                const letter: Letter = {
                    data: guessLetter,
                    status: guessLetterStatus,
                }
                word.push(letter);
            });

        return word;
    }

    public static validateGuess(guess: string, wordId: number): Guess {
        if (!DictionaryLogic.isWordIdValid(wordId)) {
            return {
                validationResult: ValidationResult.EXPIRED,
            };
        }

        if (!DictionaryLogic.isGuessInDictionary(guess)) {
            return {
                validationResult: ValidationResult.NOT_IN_DICTIONARY,
            };
        }

        return {
            validationResult: ValidationResult.IN_DICTIONARY,
            word: this.gradeGuess(guess),
        };
    }
}