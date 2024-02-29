export class TimingLogic {
	private cacheTimeout;

	/**
	 * Sets timeouts to clear caches at the end of the day.
	 */
	public setTimeouts(fn: Function): void {
		if (this.cacheTimeout) {
			clearTimeout(this.cacheTimeout);
		}

		const timeUntilEndOfDay = this.getTimeUntilEndOfDay();

		this.cacheTimeout = setTimeout(() => {
			fn();
		}, timeUntilEndOfDay);
	}

	/**
	 * Gets the time until the end of the day in milliseconds.
	 *
	 * @returns Time until the end of the day.
	 */
	private getTimeUntilEndOfDay(): number {
		const now = new Date();
		const endOfDay = new Date(now);
		endOfDay.setUTCHours(24, 0, 0, 0);
		let timeUntilEndOfDay = endOfDay.getTime() - now.getTime();

		if (timeUntilEndOfDay <= 0) {
			endOfDay.setDate(endOfDay.getDate() + 1);
			endOfDay.setUTCHours(0, 0, 0, 0);
			timeUntilEndOfDay = endOfDay.getTime() - now.getTime();
		} 

		return timeUntilEndOfDay;
	}
}
