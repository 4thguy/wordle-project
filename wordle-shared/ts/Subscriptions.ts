import type { Event } from '../interfaces/Event';

export class Subscriptions {
	private events: Map<any, Set<Function>> = new Map();

	private static singleton: Subscriptions = new Subscriptions();

	public static getSingleton(): Subscriptions {
		return Subscriptions.singleton;
	}

	public subscribeToEvent(name: any, fn: Function): void {
		if (!this.events.has(name)) {
			this.events.set(name, new Set());
		}
		const eventSubscriptions = this.events.get(name);
		eventSubscriptions?.add(fn);
	}

	public unsubscribeFromEvent(name: any, fn: Function): void {
		const eventSubscriptions = this.events.get(name);
		if (eventSubscriptions) {
			eventSubscriptions?.delete(fn);
		}
	}

	public onEvent(event: Event): void {
		const eventSubscriptions = this.events.get(event.name);
		if (eventSubscriptions) {
			eventSubscriptions.forEach((fn: Function) => {
				fn(event);
			});
		}
	}
}
