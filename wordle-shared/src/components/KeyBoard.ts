import { LetterResult } from 'wordle-shared/enums/LetterResult';
import { GameEvents } from 'wordle-shared/enums/GameEvents';
import { Subscriptions } from 'wordle-shared/ts/Subscriptions';
import { KeyboardLayouts } from 'wordle-shared/data/KeyboardLayouts';
import type { Word } from 'wordle-shared/interfaces/Word';
import type { Letter } from 'wordle-shared/interfaces/Letter';
import type { Event } from 'wordle-shared/interfaces/Event';

interface KeyBoardInterface {
	letters: Map<string, LetterResult>;
	buttons: string[];
	onGuessSubmitted(event: Event): void;
	onGuessCorrect(event: Event): void;
	onGuessIncorrect(event: Event): void;
	onGameOver(event: Event): void;
	processGuess(word: Word): void;
	onPressButton(l: string): void;
	getButtonOrder(s: string): number;
	getLetterStatusClass(letter: string): string;
	$emit(event: string, payload?: any): this;
}

export default {
	data() {
		return {
			letters: new Map<string, LetterResult>(
				KeyboardLayouts.LETTERS.map((l: string) => {
					return [l, LetterResult.DEFAULT];
				}),
			),
			buttons: KeyboardLayouts.BUTTONS,
		};
	},
	mounted(this: KeyBoardInterface) {
		const subscriptions = Subscriptions.getSingleton();
		subscriptions.subscribeToEvent(GameEvents.GuessSubmitted, this.onGuessSubmitted.bind(this));
		subscriptions.subscribeToEvent(GameEvents.GuessCorrect, this.onGuessCorrect.bind(this));
		subscriptions.subscribeToEvent(GameEvents.GuessIncorrect, this.onGuessIncorrect.bind(this));
		subscriptions.subscribeToEvent(GameEvents.GameOver, this.onGameOver.bind(this));
	},
	methods: {
		processGuess(this: KeyBoardInterface, word: Word): void {
			word.forEach((letter: Letter) => {
				this.letters.set(letter.data, letter.status);
			});
		},
		onPressButton(this: KeyBoardInterface, l: string): void {
			const event = {
				data: l,
			} as Event;
			this.$emit('button-clicked', event);
		},
		onGuessSubmitted(event: Event): void {},
		onGuessCorrect(this: KeyBoardInterface, event: Event): void {
			const word = event.data as Word;
			this.processGuess(word);
		},
		onGuessIncorrect(this: KeyBoardInterface, event: Event): void {
			const word = event.data as Word;
			this.processGuess(word);
		},
		onGameOver(event: Event): void {},
		getButtonOrder(s: string): number {
			return (KeyboardLayouts.QWERTY.indexOf(s.toLocaleLowerCase()) ?? -2) + 1;
		},
		getLetterStatusClass(this: KeyBoardInterface, letter: string): string {
			const ls = this.letters.get(letter) ?? LetterResult.DEFAULT;
			let letterStatus;
			switch (ls) {
				case LetterResult.CORRECT_POSITION:
				case LetterResult.CORRECT_LETTER: {
					letterStatus = 'used';
					break;
				}
				case LetterResult.INCORRECT_LETTER: {
					letterStatus = 'unused';
					break;
				}
				case LetterResult.DEFAULT:
				default: {
					letterStatus = 'default';
					break;
				}
			}

			return letterStatus;
		},
	},
};
