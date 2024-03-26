<template>
	<div class="buttons">
		<div
			v-for="l in letters"
			:key="l[0]"
			:class="['button', `button--${l[0]}`, `button--${getLetterStatusClass(l[1])}`]"
			:style="{ order: getButtonOrder(l[0]) }"
			v-text="l[0]"
			@click="onPressButton(l[0])"
		/>
		<div
			v-for="b in buttons"
			:key="b"
			:class="['button', `button--${b}`]"
			:style="{ order: getButtonOrder(b) }"
			v-text="b"
			@click="onPressButton(b)"
		/>
		<div
			v-for="i in 2"
			:key="i"
			:class="['button', 'button--line-break', `button--line-break-${i}`]"
			:style="{ order: getButtonOrder(`line-break-${i}`) }"
		/>
	</div>
</template>

<style scoped lang="scss">
@import '../variables';

.buttons {
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	align-content: center;
	text-transform: uppercase;
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
import KeyBoard from 'wordle-shared/components/KeyBoard';

export default {
	mixins: [KeyBoard],
};
</script>
