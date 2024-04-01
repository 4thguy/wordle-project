<template>
	<FlexboxLayout
		flexDirection="row"
		justifyContent="center"
		flexWrap="nowrap"
		alignItems="center"
		class="word"
	>
		<template v-if="word">
			<letter-item v-for="(letter, i) in word" :key="i" :letter-item="letter" />
			<letter-item v-for="i in wordLength - word.length" :key="i" />
		</template>
		<template v-else>
			<letter-item v-for="index in wordLength" :key="index" />
		</template>
	</FlexboxLayout>
</template>

<style scoped lang="scss">
@import '@nativescript/theme/scss/variables/blue';
</style>

<script lang="ts">
import LetterItem from './LetterItem.vue';

export default {
	props: {
		word: {
			type: Object,
		},
		wordLength: {
			type: Number,
			required: true,
		},
	},
	components: {
		LetterItem,
	},
};
</script>
