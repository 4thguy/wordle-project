import { Config } from 'wordle-shared/config/Config';
import { HTTP } from 'wordle-shared/ts/HTTP';
import type { Endpoints } from 'wordle-shared/config/Endpoints';
import type { Guess } from 'wordle-shared/interfaces/Guess';

export class API {
	private static config = Config;

	/**
	 * Build the URL for the API
	 * @param endpoint
	 * @returns URL
	 */
	private static buildUrl(endpoint: Endpoints) {
		return API.config.wordleIpAddress + ':' + API.config.wordleServerPort + endpoint;
	}

	/**
	 * Fetch the config from the API
	 * @returns API.config
	 */
	public static async fetchConfig(): Promise<Config> {
		return HTTP.GET(this.buildUrl(API.config.Endpoints.CONFIG));
	}

	/**
	 * Submit a guess to the API
	 * @param guess
	 * @param wordId
	 * @returns Guess
	 */
	public static async submitGuess(guess: string, wordId: number): Promise<Guess> {
		const url = this.buildUrl(API.config.Endpoints.GUESS);
		const data = {
			guess: guess,
			wordId: wordId,
		};

		return HTTP.POST<Guess>(url, data);
	}
}
