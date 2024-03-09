import type { Stats } from '@/interfaces/Stats';

export class StatsLogic {
	// The property name for the stats object in local storage.
	private static statProperty: string = btoa('stats');

	/**
	 * Get the current stats object from local storage.
	 * @returns the current stats object.
	 */
	private static GetStatsObject(): Stats {
		const encoded = localStorage.getItem(StatsLogic.statProperty);
		const local = atob(encoded ?? '');
		let stats: Stats = {
			currentStreak: 0,
			maxStreak: 0,
			lastUpdate: 0,
			plays: 0,
			wins: 0,
			guessDistribution: {},
		};
		if (local) {
			const parsedStats = JSON.parse(local);
			stats = {
				...stats,
				...parsedStats,
			};
		}
		return stats;
	}

	/**
	 * Save the stats object to local storage.
	 * @param stats the stats object to save to local storage.
	 */
	private static SetStatsObject(stats: Stats): void {
		const local = JSON.stringify(stats);
		const encoded = btoa(local);
		localStorage.setItem(StatsLogic.statProperty, encoded);
	}

	/*
	 * Get the current UTC date.
	 * @returns the current UTC date.
	 */
	private static GetDate(): Date {
		const date = new Date();
		date.setUTCHours(0, 0, 0, 0);
		return date;
	}

	/*
	 * Update the daily stats in the stats object if the last update was not today.
	 */
	public static UpdateDailyStats(): void {
		let stats = StatsLogic.GetStatsObject();
		const lastUpdate = new Date(stats.lastUpdate);
		const today = StatsLogic.GetDate();
		// If the last update was not today, update the streak.
		if (lastUpdate.valueOf() !== today.valueOf()) {
			const yesterday = StatsLogic.GetDate();
			yesterday.setDate(yesterday.getUTCDate() - 1);
			const currentStreak =
				lastUpdate.valueOf() === yesterday.valueOf() ? stats.currentStreak + 1 : 1;
			stats = {
				...stats,
				currentStreak: currentStreak,
				maxStreak: Math.max(stats.maxStreak, currentStreak),
				lastUpdate: today.valueOf(),
				plays: stats.plays + 1,
			};
			StatsLogic.SetStatsObject(stats);
		}
	}

	/**
	 * Update the win stats in the stats object.
	 */
	public static UpdateWinStats(guessesSubmitted: number): void {
		let stats = StatsLogic.GetStatsObject();
		stats.guessDistribution[guessesSubmitted] =
			(stats.guessDistribution[guessesSubmitted] ?? 0) + 1;
		stats = {
			...stats,
			wins: stats.wins + 1,
		};
		StatsLogic.SetStatsObject(stats);
	}
}
