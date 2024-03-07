import { Config } from 'wordle-shared/config/Config';
import { HTTP } from 'wordle-shared/ts/HTTP';
import type { Endpoints } from 'wordle-shared/config/Endpoints';
import type { Guess } from 'wordle-shared/interfaces/Guess';

export class API {
	/**
	 * Build the URL for the API
	 * @param endpoint
	 * @returns URL
	 */
	private static buildUrl(endpoint: Endpoints) {
		return Config.wordleIpAddress + ':' + Config.wordleServerPort + endpoint;
	}

	/**
	 * Fetch the config from the API
	 * @returns Config
	 */
	public static async fetchConfig(): Promise<Config> {
		return HTTP.GET(this.buildUrl(Config.Endpoints.CONFIG));
	}

	/**
	 * Submit a guess to the API
	 * @param guess
	 * @param wordId
	 * @returns Guess
	 */
	public static async submitGuess(guess: string, wordId: number): Promise<Guess> {
		const url = this.buildUrl(Config.Endpoints.GUESS);
		const data = {
			guess: guess,
			wordId: wordId,
		};

		return HTTP.POST<Guess>(url, data);
	}
}
