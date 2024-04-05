import { Config as BaseConfig } from 'wordle-shared/config/Config';
import { Subscriptions } from 'wordle-shared/ts/Subscriptions';
import { AppEvents } from '@/enums/AppEvents';
import { API } from 'wordle-shared/ts/API';
import type { Event } from 'wordle-shared/interfaces/Event';

export class Config extends BaseConfig {
	public static Ready: boolean;

	private static subscriptions = Subscriptions.getSingleton();

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
		API.fetchConfig()
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

Config.requestConfig();
