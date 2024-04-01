<template>
	<Page>
		<word-item :word-length="5" />
		<key-board />
	</Page>
</template>

<style scoped lang="scss">
@import '@nativescript/theme/scss/variables/blue';
</style>

<script lang="ts">
import Vue from 'nativescript-vue';
import KeyBoard from './components/KeyBoard.vue';
import WordItem from './components/WordItem.vue';

export default Vue.extend({
	components: {
		KeyBoard,
		WordItem,
	},
	computed: {
		message() {
			return 'Wordle Native Test';
		},
	},
});
</script>
