<template>
	<Page>
		<key-board />
	</Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';
import KeyBoard from './components/KeyBoard.vue';

export default Vue.extend({
	components: {
		KeyBoard,
	},
	computed: {
		message() {
			return 'Wordle Native Test';
		},
	},
});
</script>

<style scoped lang="scss">
@import '@nativescript/theme/scss/variables/blue';
</style>
