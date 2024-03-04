import type { HttpMethod } from '../enums/HttpMethod';

export interface ApiRequestOptions {
	method: HttpMethod;
	headers: { [key: string]: string };
	body?: any;
}
