<template>
	<div :class="['letter', `letter--${getLetterStatusClass}`]" v-html="getInnerHTML" />
</template>

<style lang="scss">
@import '../variables';

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
import LetterItem from 'wordle-shared/components/LetterItem';

export default {
	mixins: [LetterItem],
};
</script>
