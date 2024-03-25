<template>
	<FlexboxLayout
		ref="keyboard"
		@layoutChanged="onLayoutChange"
		flexDirection="row"
		justifyContent="center"
		flexWrap="wrap"
		alignItems="center"
		class="buttons buttons--qwerty"
	>
		<Button
			v-for="l in letters"
			ref="squareButton"
			:key="l"
			:class="['button', `button--${l}`, getLetterStatusClass(l)]"
			:order="getButtonOrder(l)"
			:text="l"
			@tap="onPressButton(l)"
		/>
		<Button
			class="button button--enter"
			:order="getButtonOrder('ENTER')"
			text="ENTER"
			@tap="onPressButton('ENTER')"
		/>
		<Button
			class="button button--backspace"
			:order="getButtonOrder('DEL')"
			text="DEL"
			@tap="onPressButton('DEL')"
		/>
		<Label
			class="button button--line-break button--line-break-1"
			:order="getButtonOrder('LINE-BREAK-1')"
			width="100%"
			text=""
		/>
		<Label
			class="button button--line-break button--line-break-2"
			:order="getButtonOrder('LINE-BREAK-2')"
			width="100%"
			text=""
		/>
	</FlexboxLayout>
</template>

<script lang="ts">
import { Application } from '@nativescript/core';
import { KeyboardLayouts } from '~/data/KeyboardLayouts';

export default {
	name: 'Keyboard',
	data() {
		return {
			letters: KeyboardLayouts.LETTERS,
		};
	},
	methods: {
		onPressButton(l: string): void {
			console.log(l);
		},
		getButtonOrder(s: string): number {
			return KeyboardLayouts.QWERTY.indexOf(s.toLocaleLowerCase()) ?? -1;
		},
		getLetterStatusClass(s: string): string {
			return s;
		},
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
