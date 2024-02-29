<template>
	<template v-if="word">
		<div class="word">
			<template v-for="(letter, i) in word" :key="i">
				<div :class="['letter', getLetterStatusClass(letter.status)]">{{ letter.data }}</div>
			</template>
			<template v-for="i in wordLength - word.length" :key="i">
				<div class="letter letter--default">&nbsp;</div>
			</template>
		</div>
	</template>
	<template v-else>
		<div class="word">
			<template v-for="index in wordLength" :key="index">
				<div class="letter letter--default">&nbsp;</div>
			</template>
		</div>
	</template>
</template>

<style lang="scss">
@import '../variables';

.word {
	display: flex;
	flex-direction: row;
	text-transform: uppercase;

	&:first-child {
		.letter {
			border-top-width: #{$borderWidth * 2};
		}
	}

	&:last-child {
		.letter {
			border-bottom-width: #{$borderWidth * 2};
		}
	}
}

.letter {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	min-width: #{$fontSize * 1.5};
	height: #{$fontSize * 1.5};
	font-size: $fontSize;
	border: $borderWidth solid transparent;
	will-change: color, background-color, border-color;
	transition: all $transitionDuration ease-out;
	transition-property: color, background-color, border-color;

	&:first-child {
		border-left-width: #{$borderWidth * 2};
	}

	&:last-child {
		border-right-width: #{$borderWidth * 2};
	}

	@for $i from 1 through 5 {
		&:nth-child(#{$i}) {
			transition-delay: #{$transitionDuration * $i};
		}
	}

	&,
	&--default {
		color: var(--bs-body-color);
		background-color: var(--bs-body-bg);
		border-color: var(--bs-body-color);
	}

	&--incorrect-letter {
		color: var(--bs-danger);
		background-color: var(--bs-danger-bg-subtle);
		border-color: var(--bs-danger-border-subtle);
	}

	&--correct-letter {
		color: var(--bs-warning);
		background-color: var(--bs-warning-bg-subtle);
		border-color: var(--bs-warning-border-subtle);
	}

	&--correct-position {
		color: var(--bs-success);
		background-color: var(--bs-success-bg-subtle);
		border-color: var(--bs-success-border-subtle);
	}
}
</style>

<script lang="ts">
import { Config } from '@/Config';
import { LetterResult } from 'wordle-shared/enums/LetterResult';

export default {
	props: {
		word: {
			type: Object,
		},
	},
	data() {
		return {
			wordLength: Config.WordLength,
		};
	},
	methods: {
		getLetterStatusClass(status: LetterResult): string {
			let letterStatus;
			switch (status) {
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
					letterStatus = 'default';
					break;
				}
			}

			return `letter--${letterStatus}`;
		},
	},
};
</script>
