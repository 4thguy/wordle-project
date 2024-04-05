import { Config } from '../config/Config';
import { Subscriptions } from './Subscriptions';
import { API } from './API';
import { StatsLogic } from './StatsLogic';
import { LetterResult } from '../enums/LetterResult';
import { ValidationResult } from '../enums/ValidationResult';
import { GameEvents } from '../enums/GameEvents';
import type { Letter } from '../interfaces/Letter';
import type { Word } from '../interfaces/Word';
import type { Guess } from '../interfaces/Guess';
import type { Event } from '../interfaces/Event';

export class ClientLogic {
	protected statsLogic = StatsLogic;
	protected config = Config;

	private selectedLetters: Word = [];

	private guessesSubmitted: number = 0;

	/**
	 * Validate the word and submit the guess to the server.
	 * @param word the word to validate.
	 */
	public validateGuess(word: Word): void {
		const subscriptions = Subscriptions.getSingleton();
		if (word.length === this.config.WordLength) {
			let guess = '';
			word.forEach((letter: Letter) => {
				guess += letter.data;
			});
			API.submitGuess(guess, this.config.WordId).then((responseData: Guess) => {
				switch (responseData.validationResult) {
					// If the word is in the dictionary, check if the word is correct.
					case ValidationResult.IN_DICTIONARY: {
						this.guessesSubmitted++;
						let guessCorrect = true;
						// Check the correctness of the word
						(responseData.word ?? []).forEach((letter: Letter) => {
							if (letter.status !== LetterResult.CORRECT_POSITION) {
								guessCorrect = false;
								return;
							}
						});
						const gameOver = this.guessesSubmitted >= this.config.MaxTries;
						// Notify the user if the word is correct or incorrect.
						subscriptions.onEvent({
							data: responseData.word,
							name: guessCorrect
								? GameEvents.GuessCorrect
								: gameOver
								? GameEvents.GameOver
								: GameEvents.GuessIncorrect,
						});
						this.statsLogic.UpdateDailyStats();
						if (guessCorrect) {
							this.statsLogic.UpdateWinStats(this.guessesSubmitted);
						}
						break;
					}
					// If the word is not in the dictionary, notify the user.
					case ValidationResult.NOT_IN_DICTIONARY: {
						subscriptions.onEvent({
							name: GameEvents.GuessNotInDictionary,
							data: [],
						});
						break;
					}
					// If the word is expired, notify the user.
					case ValidationResult.EXPIRED: {
						subscriptions.onEvent({
							name: GameEvents.GameExpired,
							data: [],
						});
						break;
					}
					default: {
						break;
					}
				}
				return responseData;
			});
		}
	}

	public updateSelectedLetters(letter: string, tmpWord?: Word): void {
		if (tmpWord) {
			this.selectedLetters = tmpWord;
		}
		letter = letter.toLocaleUpperCase();

		switch (letter) {
			case 'ENTER': {
				if (this.selectedLetters.length === this.config.WordLength) {
					this.validateGuess(this.selectedLetters);
					const event = {
						name: GameEvents.GuessSubmitted,
						data: this.selectedLetters,
					} as Event;
					Subscriptions.getSingleton().onEvent(event);
				}
				break;
			}
			case 'DEL': {
				this.selectedLetters.pop();
				break;
			}
			default: {
				if (this.selectedLetters.length !== this.config.WordLength) {
					if (this.validateLetter(letter)) {
						this.selectedLetters.push({
							data: letter,
							status: LetterResult.DEFAULT,
						});
					}
				}
				break;
			}
		}
	}

	private validateLetter(letter: string): boolean {
		return true;
	}
}
