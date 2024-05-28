import type { ProgressTracker } from '@/enums/ProgressTracker';
import type { Letter } from 'wordle-shared/interfaces/Letter';

export class ProgressTrackerLogic {
	// The property name for the progress tracker object in local storage.
	private static progressTrackerProperty: string = btoa('progressTracker');

	/**
	 * Get the current progress object from local storage.
	 * @returns the current progress object.
	 */
	public static GetProgressTrackerObject(): ProgressTracker {
		const encoded = localStorage.getItem(ProgressTrackerLogic.progressTrackerProperty);
		const local = atob(encoded ?? '');
        let progressTracker: ProgressTracker = {
            date: this.GetDate(),
            wordItems: [],
        }
		if (local) {
			const parsedPT = JSON.parse(local);
			progressTracker = {
				...parsedPT,
			};
            const lastUpdate = new Date(progressTracker.date);
            const today = ProgressTrackerLogic.GetDate();
            // If the last update was not today, flush the words
            if (lastUpdate.valueOf() !== today.valueOf()) {
                progressTracker.wordItems = [];
                ProgressTrackerLogic.SetProgressTrackerObject(progressTracker);
            }
		}
		return progressTracker;
	}

	/**
	 * Save the progress tracker object to local storage.
	 * @param progressTracker the progress tracker object to save to local storage.
	 */
	private static SetProgressTrackerObject(progressTracker: ProgressTracker): void {
		const local = JSON.stringify(progressTracker);
		const encoded = btoa(local);
		localStorage.setItem(ProgressTrackerLogic.progressTrackerProperty, encoded);
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
	 * Update the progress in the progress object
	 */
	public static UpdateProgressTrackerStats(word: Letter[]): void {
		const progressTracker = ProgressTrackerLogic.GetProgressTrackerObject();
        progressTracker.wordItems.push(word);
        ProgressTrackerLogic.SetProgressTrackerObject(progressTracker);
	}
}