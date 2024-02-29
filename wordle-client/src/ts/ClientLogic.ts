import { Config } from '@/Config';
import { Subscriptions } from './Subscriptions';
import { API } from './API';
import { LetterResult } from 'wordle-shared/enums/LetterResult';
import { ValidationResult } from 'wordle-shared/enums/ValidationResult';
import { GameEvents } from '@/enums/GameEvents';
import { AppEvents } from '@/enums/AppEvents';
import type { Letter } from 'wordle-shared/interfaces/Letter';
import type { Word } from 'wordle-shared/interfaces/Word';
import type { Guess } from 'wordle-shared/interfaces/Guess';
import type { Event } from '@/interfaces/Event';

export class ClientLogic {
	private selectedLetters: Word = [];

	private guesses = 0;

	constructor() {
		const subscriptions = Subscriptions.getSingleton();
		subscriptions.subscribeToEvent(AppEvents.ConfigUpdated, this.onConfigUpdated.bind(this));
	}

	private onConfigUpdated(event: Event): void {}

	public validateGuess(word: Word): void {
		const subscriptions = Subscriptions.getSingleton();
		if (word.length === Config.WordLength) {
			let guess = '';
			word.forEach((letter: Letter) => {
				guess += letter.data;
			});
			API.submitGuess(guess, Config.WordId).then((responseData: Guess) => {
				switch (responseData.validationResult) {
					case ValidationResult.IN_DICTIONARY: {
						let guessCorrect = true;
						if (responseData.word) {
							(responseData.word || []).forEach((letter: Letter) => {
								if (letter.status !== LetterResult.CORRECT_POSITION) {
									guessCorrect = false;
									return;
								}
							});
						}
						subscriptions.onEvent({
							data: responseData.word,
							name: guessCorrect ? GameEvents.GuessCorrect : GameEvents.GuessIncorrect,
						});
						break;
					}
					case ValidationResult.NOT_IN_DICTIONARY: {
						subscriptions.onEvent({
							name: GameEvents.GuessNotInDictionary,
							data: [],
						});
						break;
					}
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
				if (this.selectedLetters.length === Config.WordLength) {
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
				if (this.selectedLetters.length !== Config.WordLength) {
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
