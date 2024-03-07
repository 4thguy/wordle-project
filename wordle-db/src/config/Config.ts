import * as publicIp from 'public-ip';
import { Endpoints } from './Endpoints';

export class Config {
	public static Postgres = {
		user: 'superman',
		password: 'batman',
		host: 'localhost',
		database: 'wordle',
		port: 5432,
	};

	public static dbIpAddress = '//localhost';
	public static dbServerPort = 4000;

	public static Endpoints = {
		...Endpoints,
	};
}

await (async () => {
	try {
		const ipAddress = '//' + (await publicIp.publicIpv4());
		Config.dbIpAddress = ipAddress;
	} catch (error) {
		console.error(error);
	}
})();
