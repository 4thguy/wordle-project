<template>
	<div class="word">
		<template v-if="word">
			<letter-item v-for="(letter, i) in word" :key="i" :letter-item="letter" />
			<letter-item v-for="i in wordLength - word.length" :key="i" />
		</template>
		<template v-else>
			<letter-item v-for="index in wordLength" :key="index" />
		</template>
	</div>
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
</style>

<script lang="ts">
import LetterItem from '@/components/LetterItem.vue';

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
