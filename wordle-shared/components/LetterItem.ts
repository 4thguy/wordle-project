import { LetterResult } from '../enums/LetterResult';

export default {
	props: {
		letterItem: {
			type: Object,
			default: null,
		},
	},
	computed: {
		getInnerHTML(): string {
			if (!this.letterItem) {
				return '&nbsp;';
			}
			return this.letterItem.data;
		},
		getDefaultStatusClass(): string {
			return 'default';
		},
		getLetterStatusClass(): string {
			let letterStatus = this.getDefaultStatusClass;

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
