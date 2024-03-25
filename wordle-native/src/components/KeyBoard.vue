<template>
	<FlexboxLayout
		ref="keyboard"
		@layoutChanged="onLayoutChange"
		flexDirection="row"
		justifyContent="center"
		flexWrap="wrap"
		alignItems="center"
		class="buttons buttons"
	>
		<Button
			v-for="l in letters"
			ref="squareButton"
			:key="l[0]"
			:class="['button', `button--${l[0]}`, `button--${getLetterStatusClass(l[1])}`]"
			:order="getButtonOrder(l[0])"
			:text="l[0]"
			@tap="onPressButton(l[0])"
		/>
		<Button
			v-for="b in buttons"
			ref="squareButton"
			:key="b"
			:class="['button', `button--${b}`]"
			:order="getButtonOrder(b)"
			:text="b"
			@tap="onPressButton(b)"
		/>
		<Label
			v-for="i in 2"
			:key="i"
			:class="['button', 'button--line-break', `button--line-break-${i}`]"
			:order="getButtonOrder(`line-break-${i}`)"
			width="100%"
			text=""
		/>
	</FlexboxLayout>
</template>

<script lang="ts">
import { Application } from '@nativescript/core';
import KeyBoard from 'wordle-shared/components/KeyBoard';

export default {
	mixins: [KeyBoard],
	methods: {
		makeButtonsSquare() {
			this.$nextTick(() => {
				try {
					this.$refs.squareButton.forEach((button) => {
						button.nativeView.width = `${button.nativeView.getMeasuredHeight()}px`;
					});
				} catch (error) {
					console.log('error');
				}
			});
		},
		onLayoutChange() {},
	},
	mounted() {
		this.makeButtonsSquare();
		Application.on(Application.orientationChangedEvent, this.onLayoutChange);
	},
	beforeDestroy() {
		Application.off(Application.orientationChangedEvent, this.onLayoutChange);
	},
};
</script>

<style scoped lang="scss">
.button {
	text-transform: uppercase;
	background: red;
	margin: 0;
	&--line-break {
		height: 0;
	}
}
</style>
