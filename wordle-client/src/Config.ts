import { Config as BaseConfig } from 'wordle-shared/Config';
import { Subscriptions } from '@/ts/Subscriptions';
import { AppEvents } from './enums/AppEvents';
import { API } from '@/ts/API';
import type { Event } from '@/interfaces/Event';

export class Config extends BaseConfig {
	public static Ready: boolean;

	private static subscriptions = Subscriptions.getSingleton();

	private static onConfigFetched(response: any) {
		if (this.ApiBaseUrl !== response.ApiBaseUrl) {
			// the api location as changed, load config from new location
			this.ApiBaseUrl = response.ApiBaseUrl;
			Config.requestConfig();
		} else {
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
	}

	public static requestConfig(): void {
		API.fetchConfig()
			.then(async (response: any) => {
				this.onConfigFetched(response);
			})
			.catch((error) => {
				this.subscriptions.onEvent({
					name: AppEvents.ServerError,
					data: error,
				} as Event);
			});
	}
}

Config.requestConfig();
