<template>
	<div
		:class="['letter', getLoadingStatusClass()]"
		@animationiteration="onAnimationIteration"
		@animationend="onAnimationEnd"
	/>
</template>

<style lang="scss" scoped>
@import '../variables';
@import '../../node_modules/animate.css/source/flippers/flip.css';
@import '../../node_modules/animate.css/source/fading_exits/fadeOut.css';

.letter {
	&--loading {
		flex: none !important;
		animation-name: flip;
		animation-duration: 1s;
		animation-play-state: running;
		animation-timing-function: ease-in-out;
		animation-direction: alternate;
		animation-iteration-count: infinite;
	}

	&--dismissing {
		flex: none !important;
		animation-name: fadeOut;
		animation-duration: 1s;
		animation-play-state: running;
		animation-timing-function: ease-out;
		animation-direction: normal;
		animation-iteration-count: 1;
	}
}
</style>

<script lang="ts">
export enum ElementMode {
	LOAD,
	DISMISS,
}

export default {
	props: {
		mode: {
			type: Number,
			default: ElementMode.LOAD,
		},
	},
	data() {
		return {
			activeMode: this.mode,
		};
	},
	methods: {
		onAnimationIteration(): void {
			this.$emit('loading-animation-iteration');
			if (this.activeMode !== this.mode) {
				this.activeMode = this.mode;
			}
		},
		onAnimationEnd(): void {
			this.$emit('dismiss-animation-end');
		},
		getLoadingStatusClass(): string {
			let letterStatus;
			switch (this.activeMode) {
				case ElementMode.DISMISS: {
					letterStatus = 'dismissing';
					break;
				}
				case ElementMode.LOAD:
				default: {
					letterStatus = 'loading';
					break;
				}
			}

			return `letter--${letterStatus}`;
		},
	},
};
</script>
