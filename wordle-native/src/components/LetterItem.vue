<template>
	<FlexboxLayout
		flexDirection="row"
		justifyContent="center"
		flexWrap="nowrap"
		alignItems="center"
		:class="['letter', `letter--${getLetterStatusClass}`]"
	>
		<Label :text="getInnerHTML" />
	</FlexboxLayout>
</template>

<style scoped lang="scss">
@import '@nativescript/theme/scss/variables/blue';
</style>

<script lang="ts">
import LetterItem from 'wordle-shared/components/LetterItem';

export default {
	mixins: [LetterItem],
};
</script>
