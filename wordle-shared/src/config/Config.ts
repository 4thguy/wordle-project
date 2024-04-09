import { Endpoints } from './Endpoints';

let location = '';

try {
	location = '//' + window.location.hostname;
} catch {
	location = 'http://192.168.0.14';
}

export class Config {
	public static WordLength = 5;
	public static MaxTries = 5;
	public static wordleIpAddress = location;
	public static wordleServerPort = 3000;
	public static WordId = -1;
	public static ApiBaseUrl = '';
	public static Endpoints = {
		...Endpoints,
	};
}
