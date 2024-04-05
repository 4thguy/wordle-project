import { LetterResult } from '../enums/LetterResult';
import type { Letter } from '../interfaces/Letter';

interface LetterItemInterface {
	letterItem: Letter;
	getDefaultStatusClass(): string;
}

export default {
	props: {
		letterItem: {
			type: Object,
			default: null,
		},
	},
	methods: {
		getInnerText(this: LetterItemInterface): string {
			if (!this.letterItem) {
				return ' ';
			}
			return this.letterItem.data;
		},
		getDefaultStatusClass(): string {
			return 'default';
		},
		getLetterStatusClass(this: LetterItemInterface): string {
			let letterStatus = this.getDefaultStatusClass();

			if (this.letterItem) {
				switch (this.letterItem.status) {
					case LetterResult.CORRECT_POSITION: {
						letterStatus = 'correct-position';
						break;
					}
					case LetterResult.CORRECT_LETTER: {
						letterStatus = 'correct-letter';
						break;
					}
					case LetterResult.INCORRECT_LETTER: {
						letterStatus = 'incorrect-letter';
						break;
					}
					case LetterResult.DEFAULT:
					default: {
						// do nothing
						break;
					}
				}
			}

			return letterStatus;
		},
	},
};
