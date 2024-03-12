<template>
	<div class="buttons buttons--qwerty" @click="onPressButton">
		<div class="button button--a" :class="getLetterStatusClass('A')">A</div>
		<div class="button button--b" :class="getLetterStatusClass('B')">B</div>
		<div class="button button--c" :class="getLetterStatusClass('C')">C</div>
		<div class="button button--d" :class="getLetterStatusClass('D')">D</div>
		<div class="button button--e" :class="getLetterStatusClass('E')">E</div>
		<div class="button button--f" :class="getLetterStatusClass('F')">F</div>
		<div class="button button--g" :class="getLetterStatusClass('G')">G</div>
		<div class="button button--h" :class="getLetterStatusClass('H')">H</div>
		<div class="button button--i" :class="getLetterStatusClass('I')">I</div>
		<div class="button button--j" :class="getLetterStatusClass('J')">J</div>
		<div class="button button--k" :class="getLetterStatusClass('K')">K</div>
		<div class="button button--l" :class="getLetterStatusClass('L')">L</div>
		<div class="button button--m" :class="getLetterStatusClass('M')">M</div>
		<div class="button button--n" :class="getLetterStatusClass('N')">N</div>
		<div class="button button--o" :class="getLetterStatusClass('O')">O</div>
		<div class="button button--p" :class="getLetterStatusClass('P')">P</div>
		<div class="button button--q" :class="getLetterStatusClass('Q')">Q</div>
		<div class="button button--r" :class="getLetterStatusClass('R')">R</div>
		<div class="button button--s" :class="getLetterStatusClass('S')">S</div>
		<div class="button button--t" :class="getLetterStatusClass('T')">T</div>
		<div class="button button--u" :class="getLetterStatusClass('U')">U</div>
		<div class="button button--v" :class="getLetterStatusClass('V')">V</div>
		<div class="button button--w" :class="getLetterStatusClass('W')">W</div>
		<div class="button button--x" :class="getLetterStatusClass('X')">X</div>
		<div class="button button--y" :class="getLetterStatusClass('Y')">Y</div>
		<div class="button button--z" :class="getLetterStatusClass('Z')">Z</div>
		<div class="button button--enter">ENTER</div>
		<div class="button button--backspace">DEL</div>
		<div class="button button--line-break button--line-break-1"></div>
		<div class="button button--line-break button--line-break-2"></div>
	</div>
</template>

<style lang="scss">
@import '../variables';

@mixin buttons($buttons) {
	@for $i from 1 through length($buttons) {
		$button: nth($buttons, $i);

		.button--#{$button} {
			order: $i;
		}
	}
}

.buttons {
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	align-content: center;

	&--alphabetical {
		$alphabetical: a b c d e f g h i j line-break-1 k l m n o p q r s line-break-2 enter t u v w x y
			z backspace;
		@include buttons($alphabetical);
	}

	&--qwerty {
		$qwerty: q w e r t y u i o p line-break-1 a s d f g h j k l line-break-2 enter z x c v b n m
			backspace;
		@include buttons($qwerty);
	}
}

.button {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	align-content: center;
	height: #{$fontSize * 1.5};
	font-size: $fontSize;
	padding: 0 #{calc($fontSize / 2)};
	margin: $buttonSpace;
	border: $borderWidth solid transparent;
	border-radius: $buttonRadius;
	cursor: pointer;
	will-change: color, background-color, border-color;
	transition: all $transitionDuration ease-out #{$transitionDuration * 5};
	transition-property: color, background-color, border-color;

	&--line-break {
		flex-basis: 100%;
		height: 0;
		border: 0;
	}

	&--enter,
	&--backspace {
		margin: 0 #{calc($fontSize / 4)};
	}

	&,
	&--default {
		color: var(--bs-body-color);
		background-color: var(--bs-body-bg);
		border-color: var(--bs-body-color);
	}

	&--unused {
		color: var(--bs-danger);
		background-color: var(--bs-danger-bg-subtle);
		border-color: var(--bs-danger-border-subtle);
	}

	&--used {
		color: var(--bs-info);
		background-color: var(--bs-info-bg-subtle);
		border-color: var(--bs-info-border-subtle);
	}
}
</style>

<script lang="ts">
import { Subscriptions } from '@/ts/Subscriptions';
import { LetterResult } from 'wordle-shared/enums/LetterResult';
import { GameEvents } from '@/enums/GameEvents';
import type { Word } from 'wordle-shared/interfaces/Word';
import type { Letter } from 'wordle-shared/interfaces/Letter';
import type { Event } from '@/interfaces/Event';

export default {
	data() {
		return {
			letters: new Map<string, LetterResult>(),
		};
	},
	mounted: function () {
		const subscriptions = Subscriptions.getSingleton();
		subscriptions.subscribeToEvent(GameEvents.GuessSubmitted, this.onGuessSubmitted.bind(this));
		subscriptions.subscribeToEvent(GameEvents.GuessCorrect, this.onGuessCorrect.bind(this));
		subscriptions.subscribeToEvent(GameEvents.GuessIncorrect, this.onGuessIncorrect.bind(this));
		subscriptions.subscribeToEvent(GameEvents.GameOver, this.onGameOver.bind(this));
	},
	methods: {
		processGuess(word: Word): void {
			word.forEach((letter: Letter) => {
				this.letters.set(letter.data, letter.status);
			});
		},
		onGuessSubmitted(event: Event): void {},
		onGuessCorrect(event: Event): void {
			const word = event.data as Word;
			this.processGuess(word);
		},
		onGuessIncorrect(event: Event): void {
			const word = event.data as Word;
			this.processGuess(word);
		},
		onGameOver(event: Event): void {},
		onPressButton(event: MouseEvent) {
			// Access event.target to get the clicked element
			const clickedButton = event.target as HTMLElement;
			if (clickedButton.children.length === 0) {
				const event = {
					data: clickedButton.innerText,
				} as Event;
				this.$emit('button-clicked', event);
			}
		},
		getLetterStatusClass(letter: string): string {
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

			return `button--${letterStatus}`;
		},
	},
};
</script>
