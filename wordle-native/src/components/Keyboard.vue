<template>
	<FlexboxLayout
		flexDirection="row"
		justifyContent="center"
		flexWrap="wrap"
		alignItems="center"
		class="buttons buttons--qwerty"
		@click="onPressButton"
	>
		<Button
			v-for="l in letters"
			:class="['button', `button--${l}`, getLetterStatusClass(l)]"
			:order="getButtonOrder(l)"
			:text="l"
		/>
		<Button class="button button--enter" :order="getButtonOrder('ENTER')" text="ENTER" />
		<Button class="button button--backspace" :order="getButtonOrder('DEL')" text="DEL" />
		<Label
			class="button button--line-break button--line-break-1"
			:order="getButtonOrder('LINE-BREAK-1')"
			width="100%"
			text=""
		/>
		<Label
			class="button button--line-break button--line-break-2"
			:order="getButtonOrder('LINE-BREAK-1')"
			width="100%"
			text=""
		/>
	</FlexboxLayout>
</template>

<script lang="ts">
const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i).toLowerCase());
const alphabetical = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'line-break-1',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	'line-break-2',
	'enter',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	'del',
];
const qwerty = [
	'q',
	'w',
	'e',
	'r',
	't',
	'y',
	'u',
	'i',
	'o',
	'p',
	'line-break-1',
	'a',
	's',
	'd',
	'f',
	'g',
	'h',
	'j',
	'k',
	'l',
	'line-break-2',
	'enter',
	'z',
	'x',
	'c',
	'v',
	'b',
	'n',
	'm',
	'del',
];

export default {
	name: 'Keyboard',
	data() {
		return {
			letters: letters,
		};
	},
	methods: {
		onPressButton(): void {},
		getButtonOrder(s: string): number {
			return qwerty.indexOf(s.toLocaleLowerCase()) ?? -1;
		},
		getLetterStatusClass(s: string): string {
			return s;
		},
	},
};
</script>

<style scoped>
.button {
	text-transform: uppercase;
}
</style>
