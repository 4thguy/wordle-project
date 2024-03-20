import { Endpoints } from './Endpoints';

let location = '';

try {
	location = '//' + window.location.hostname;
}
catch {
	location = '//localhost';
}

export class Config {
	public static WordLength = 5;
	public static MaxTries = 5;
	public static wordleIpAddress = location;
	public static wordleServerPort = 3000;
	public static WordId = -1;
	public static Endpoints = {
		...Endpoints,
	};
}
