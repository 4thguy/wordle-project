import type { Stats } from '../interfaces/Stats';

export class StatsLogic {
	/**
	 * Get the current stats object from local storage.
	 * @returns the current stats object.
	 */
	public static GetStatsObject(): Stats {
        return {
			currentStreak: 0,
			maxStreak: 0,
			lastUpdate: 0,
			plays: 0,
			wins: 0,
			guessDistribution: {},
		};
	}

	/*
	 * Update the daily stats in the stats object if the last update was not today.
	 */
	public static UpdateDailyStats(): void {}

	/**
	 * Update the win stats in the stats object.
	 */
	public static UpdateWinStats(guessesSubmitted: number): void {}
}
