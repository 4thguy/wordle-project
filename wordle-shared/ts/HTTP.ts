import { HttpMethod } from '../enums/HttpMethod';
import type { ApiRequestOptions } from '../interfaces/HttpRequestOptions';

export class HTTP {
	private static timesToRetry = 3;
	private static retryMinDelay = 1000;
	private static retryMaxDelay = 5000;

	private static defaultHeaders = {
		'Content-Type': 'application/json',
	};

	/**
	 * Send a GET request to the API
	 * @param url
	 * @returns ApiResponse of type T
	 */
	public static async GET<T>(url: string): Promise<T> {
		const options: ApiRequestOptions = {
			method: HttpMethod.GET,
			headers: this.defaultHeaders,
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
			headers: this.defaultHeaders,
			body: JSON.stringify(data),
		};
		return this.request<T>(url, options);
	}

	/**
	 * Send a request to the API
	 * @param url
	 * @param options
	 * @returns ApiResponse of type T
	 */
	private static async request<T>(
		url: string,
		options: ApiRequestOptions,
		timesToRetry: number = this.timesToRetry,
	): Promise<T> {
		console.log('Connecting to ' + url);
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
					if (timesToRetry > 0) {
						// Retry the request
						setTimeout(() => {
							this.request(url, options, timesToRetry - 1)
								.then((response: any) => {
									resolve(response);
								})
								.catch((error) => {
									reject(error);
								});
						}, this.getRetryDelay());
						return;
					} else {
						reject(error); // Reject with error
					}
				});
		});
	}

	/**
	 * Get a random delay for retrying the request
	 * @returns number between retryMinDelay and retryMaxDelay
	 */
	private static getRetryDelay(): number {
		return Math.floor(
			Math.random() * (this.retryMaxDelay - this.retryMinDelay) + this.retryMinDelay,
		);
	}
}
