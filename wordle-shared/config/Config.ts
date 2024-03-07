import { Endpoints } from './Endpoints';

export class Config {
	public static WordLength = 5;
	public static MaxTries = 5;
	public static wordleIpAddress = '//localhost';
	public static wordleServerPort = 3000;
	public static WordId = -1;
	public static Endpoints = {
		...Endpoints,
	};
}
