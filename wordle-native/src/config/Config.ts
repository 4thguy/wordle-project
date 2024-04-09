import { Config as BaseConfig } from 'wordle-shared/config/Config';
import { Subscriptions } from 'wordle-shared/ts/Subscriptions';
import { API } from 'wordle-shared/ts/API';
import { AppEvents } from '@/enums/AppEvents';
import type { Event } from 'wordle-shared/interfaces/Event';

export class Config extends BaseConfig {
	private static API = API;

	public static Ready: boolean;

	private static subscriptions = Subscriptions.getSingleton();

	public static setAPI(config: any): void {
		Config.API = config;
	}

	private static onConfigFetched(response: any) {
		this.WordLength = response.WordLength;
		this.MaxTries = response.MaxTries;
		this.Endpoints = response.Endpoints;
		this.WordId = response.WordId;
		this.Ready = true;
		this.subscriptions.onEvent({
			name: AppEvents.ConfigUpdated,
			data: response,
		});
	}

	public static requestConfig(): void {
		Config.API.fetchConfig()
			.then(async (response: any) => {
				this.onConfigFetched(response);
			})
			.catch((error: any) => {
				this.subscriptions.onEvent({
					name: AppEvents.ServerError,
					data: error,
				} as Event);
			});
	}
}
