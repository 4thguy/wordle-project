<template>
	<Page>
		<Keyboard />
	</Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';
import Keyboard from './components/Keyboard.vue';

export default Vue.extend({
	components: {
		Keyboard,
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
