<template>
  <div class="modal" id="statisticsModal" tabindex="-1" role="dialog" aria-labelledby="statisticsModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="statisticsModalLabel">Statistics</h5>
        </div>
        <div class="modal-body">
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
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="onClickClose">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../variables';

.modal {
	display: block !important;
}

.statistics {
	&-numbers {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: $grid-gutter-width;
		text-align: center;
		margin: 0 auto;
	}
}
</style>

<script lang="ts">
import { AppEvents } from '@/enums/AppEvents';
import { StatsLogic } from '@/ts/StatsLogic';
import { Subscriptions } from 'wordle-shared/ts/Subscriptions';

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
		onStatsUpdated(event?: Event): void {
			const stats = StatsLogic.GetStatsObject();
			const wins = stats.wins;
			this.played = stats.plays;
			this.currentStreak = stats.currentStreak;
			this.maxStreak = stats.maxStreak;
			this.winPercentage =
				wins !== 0 && this.played !== 0 ? Math.min(100, Math.round((wins / this.played) * 100)) : 0;
		},
		onClickClose(): void {
			this.$emit('close-modal');
		},
	},
};
</script>
