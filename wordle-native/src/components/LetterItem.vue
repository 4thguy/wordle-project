<template>
	<FlexboxLayout
		flexDirection="row"
		justifyContent="center"
		flexWrap="nowrap"
		alignItems="center"
		:class="['letter', `letter--${getLetterStatusClass()}`]"
	>
		<Label :text="getInnerText()" />
	</FlexboxLayout>
</template>

<style scoped lang="scss">
.letter {
	text-transform: uppercase;
	background: red;
	margin: 0;
}
</style>

<script lang="ts">
import LetterItem from 'wordle-shared/components/LetterItem';

export default {
	mixins: [LetterItem],
};
</script>
