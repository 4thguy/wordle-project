<template>
	<div class="statistics">
		<div class="statistics-title">Statistics</div>
		<div class="statistics-numbers">
			<div class="statistics-number-item statistics-number-item--played">
				<div class="statistics-number-item-number">{{ played }}</div>
				<div class="statistics-number-item-description">Played</div>
			</div>
			<div class="statistics-number-item statistics-number-item--percentage">
				<div class="statistics-number-item-number">{{ winPercentage }}</div>
				<div class="statistics-number-item-description">Win %</div>
			</div>
			<div class="statistics-number-item statistics-number-item--current-streak">
				<div class="statistics-number-item-number">{{ currentStreak }}</div>
				<div class="statistics-number-item-description">Current<br />Streak</div>
			</div>
			<div class="statistics-number-item statistics-number-item--max-streak">
				<div class="statistics-number-item-number">{{ maxStreak }}</div>
				<div class="statistics-number-item-description">Max<br />Streak</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import '../variables';

.statistics {
	&-numbers {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
}
</style>

<script lang="ts">
import { AppEvents } from '@/enums/AppEvents';
import { StatsLogic } from '@/ts/StatsLogic';
import { Subscriptions } from '@/ts/Subscriptions';

export default {
	data() {
		return {
			played: 0,
			winPercentage: 0,
			currentStreak: 0,
			maxStreak: 0,
		};
	},
	mounted() {
		const subscriptions = Subscriptions.getSingleton();
		subscriptions.subscribeToEvent(AppEvents.StatsUpdated, this.onStatsUpdated.bind(this));
		this.onStatsUpdated();
	},
	beforeUnmount() {
		const subscriptions = Subscriptions.getSingleton();
		subscriptions.unsubscribeFromEvent(AppEvents.StatsUpdated, this.onStatsUpdated.bind(this));
	},
	methods: {
		onStatsUpdated(event?: Event) {
			const stats = StatsLogic.GetStatsObject();
			const wins = stats.wins;
			this.played = stats.plays;
			this.currentStreak = stats.currentStreak;
			this.maxStreak = stats.maxStreak;
			this.winPercentage =
				wins !== 0 && this.played !== 0 ? Math.round((wins / this.played) * 100) : 0;
		},
	},
};
</script>
