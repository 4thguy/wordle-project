import { Config } from 'wordle-shared/config/Config';
import { Database } from 'wordle-data/database';
import { TimingLogic } from './TimingLogic';

export class DictionaryLogic {
	// Cached word
	private static cachedWord: string = '';
	// Cached word ID
	private static cachedWordId: number = 0;
	// Cached date
	private static cachedDate: string = '';
	// Cache timeout
	private static timingLogic: TimingLogic = new TimingLogic();

	/**
	 * Get today's word.
	 * Generates a new word if the cached word ID does not match today's word ID.
	 * Caches the word and sets a timeout to clear the cache at the end of the day.
	 *
	 * @returns The word for today.
	 */
	public static getTodaysWord(): string {
		if (!DictionaryLogic.cachedWord) {
			DictionaryLogic.generateCaches();
		}
		return DictionaryLogic.cachedWord;
	}

	/**
	 * Determines whether a guess is in the game dictionary.
	 *
	 * @param guess - The guess to check.
	 * @returns True if the guess is in the dictionary.
	 */
	public static async isGuessInDictionary(guess: string): Promise<boolean> {
		return Database.checkWord(guess.toLocaleUpperCase())
			.then((result) => {
				return result.word ?? false;
			})
			.catch((error) => {
				return false;
			});
	}

	/**
	 * Get today's word ID.
	 * Generates a new word ID if the cached date does not match today's date.
	 *
	 * @returns Today's word ID.
	 */
	public static getTodaysWordId(): number {
		if (!DictionaryLogic.cachedWordId) {
			DictionaryLogic.generateCaches();
		}
		return DictionaryLogic.cachedWordId;
	}

	/**
	 * Checks if the provided word ID matches today's word ID.
	 *
	 * @param wordId - The word ID to validate.
	 * @returns True if the word ID is valid for today.
	 */
	public static isWordIdValid(wordId: number): boolean {
		return DictionaryLogic.getTodaysWordId() === wordId;
	}

	/**
	 * Generates caches for today's word, word ID, and date.
	 */
	private static async generateCaches(): Promise<void> {
		DictionaryLogic.generateDate();
		DictionaryLogic.generateWordId();
		await DictionaryLogic.generateWord();
		console.log('Cache set!');
		console.log("Today's word id is " + DictionaryLogic.cachedWordId);
		console.log("Today's word is " + DictionaryLogic.cachedWord);
		DictionaryLogic.timingLogic.setTimeouts(() => {
			DictionaryLogic.clearCache();
			DictionaryLogic.generateCaches();
		}, 'DictionaryLogic.generateCaches');
	}

	/**
	 * Generates the current date.
	 *
	 * @returns The current date in YYYY-MM-DD format.
	 */
	private static generateDate(): string {
		const d = new Date();
		const currentDate = d.toISOString().split('T')[0];
		DictionaryLogic.cachedDate = currentDate;
		return DictionaryLogic.cachedDate;
	}

	/**
	 * Generates the word ID for today.
	 *
	 * @returns Today's word ID.
	 */
	private static generateWordId(): number {
		DictionaryLogic.cachedWordId = parseInt(DictionaryLogic.cachedDate.split('-').join(''));
		return DictionaryLogic.cachedWordId;
	}

	/**
	 * Generates a pseudorandom word based on the cached word ID.
	 *
	 * @returns The word for today.
	 */
	private static generateWord(): Promise<string> {
		return Database.getWord(DictionaryLogic.cachedWordId.toString(), Config.WordLength.toString())
			.then((result) => {
				DictionaryLogic.cachedWord = result.word;
				return DictionaryLogic.cachedWord;
			})
			.catch((error) => {
				console.error('Error generating word based on word ID: ', DictionaryLogic.cachedWordId);
				return '';
			});
	}

	/**
	 * Clears the cached word, word ID, and date, and cancels the cache timeout.
	 */
	private static clearCache(): void {
		DictionaryLogic.cachedWord = '';
		DictionaryLogic.cachedWordId = 0;
		DictionaryLogic.cachedDate = '';
		console.log('Dictionary cache cleared!');
	}
}
