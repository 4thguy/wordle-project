import { Endpoints } from './Endpoints';

export class Config {
    public static WordLength = 5;
    public static MaxTries = 5;
    public static ApiBaseUrl = '//localhost:3000';
    public static WordId = -1;
    public static Endpoints = {
        ...Endpoints,
    };
}
