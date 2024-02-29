import { Config } from 'wordle-shared/Config';
import { HttpMethod } from '@/enums/HttpMethod';
import type { Endpoints } from 'wordle-shared/Endpoints';
import type { Guess } from 'wordle-shared/interfaces/Guess';
import type { ApiRequestOptions } from '@/interfaces/HttpRequestOptions';

export class API {
	/**
	 * Send a request to the API
	 * @param url
	 * @param options
	 * @returns ApiResponse of type T
	 */
	private static async request<T>(url: string, options: ApiRequestOptions): Promise<T> {
		return new Promise((resolve, reject) => {
			fetch(url, options)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.then((responseData) => {
					resolve(responseData); // Resolve with response data
				})
				.catch((error) => {
					reject(error); // Reject with error
				});
		});
	}

	/**
	 * Send a GET request to the API
	 * @param url
	 * @returns ApiResponse of type T
	 */
	public static async GET<T>(url: string): Promise<T> {
		const options: ApiRequestOptions = {
			method: HttpMethod.GET,
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return this.request<T>(url, options);
	}

	/**
	 * Send a POST request to the API
	 * @param url
	 * @param data
	 * @returns ApiResponse of type T
	 */
	public static async POST<T>(url: string, data: any): Promise<T> {
		const options: ApiRequestOptions = {
			method: HttpMethod.POST,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};
		return this.request<T>(url, options);
	}

	/**
	 * Build the URL for the API
	 * @param endpoint
	 * @returns URL
	 */
	private static buildUrl(endpoint: Endpoints) {
		return Config.ApiBaseUrl + endpoint;
	}

	/**
	 * Fetch the config from the API
	 * @returns Config
	 */
	public static async fetchConfig(): Promise<Config> {
		return this.GET(this.buildUrl(Config.Endpoints.CONFIG));
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

		return this.POST<Guess>(url, data);
	}
}
