import { Config } from 'wordle-shared/config/Config';
import { HTTP } from 'wordle-shared/ts/HTTP';
import type { Endpoints } from 'wordle-shared/config/Endpoints';
import type { Guess } from 'wordle-shared/interfaces/Guess';

export class API {
	private static Config = Config;
	private static HTTP = HTTP;

	public static setConfig(config: any) {
		API.Config = config;
	}

	public static setHTTP(http: any) {
		API.HTTP = http;
	}

	/**
	 * Build the URL for the API
	 * @param endpoint
	 * @returns URL
	 */
	private static buildUrl(endpoint: Endpoints) {
		return `${API.Config.wordleIpAddress}:${API.Config.wordleServerPort}${endpoint}`;
	}

	/**
	 * Fetch the config from the API
	 * @returns API.config
	 */
	public static async fetchConfig(): Promise<Config> {
		return API.HTTP.GET(this.buildUrl(API.Config.Endpoints.CONFIG));
	}

	/**
	 * Submit a guess to the API
	 * @param guess
	 * @param wordId
	 * @returns Guess
	 */
	public static async submitGuess(guess: string, wordId: number): Promise<Guess> {
		const url = this.buildUrl(API.Config.Endpoints.GUESS);
		const data = {
			guess: guess,
			wordId: wordId,
		};

		return API.HTTP.POST<Guess>(url, data);
	}
}
