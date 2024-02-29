import { Config } from 'wordle-shared/Config';
import type { ApiResponse } from '@/interfaces/ApiResponse';
import type { Endpoints } from 'wordle-shared/Endpoints';
import type { Guess } from 'wordle-shared/interfaces/Guess';

export class API {
	private static async GET<T>(url: string): Promise<ApiResponse<T>> {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
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

	private static async POST<T>(url: string, data: any): Promise<T> {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
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

	private static buildUrl(endpoint: Endpoints) {
		return Config.ApiBaseUrl + endpoint;
	}

	public static async fetchConfig(): Promise<any> {
		return this.GET(this.buildUrl(Config.Endpoints.CONFIG));
	}

	public static async submitGuess(guess: string, wordId: number): Promise<Guess> {
		const url = this.buildUrl(Config.Endpoints.GUESS);
		const data = {
			guess: guess,
			wordId: wordId,
		};

		return this.POST<Guess>(url, data);
	}
}
