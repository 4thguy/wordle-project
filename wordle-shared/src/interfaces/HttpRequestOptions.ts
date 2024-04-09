import type { HttpMethod } from 'wordle-shared/enums/HttpMethod';

export interface ApiRequestOptions {
	method: HttpMethod;
	headers: { [key: string]: string };
	body?: any;
}
