import { ClientLogic as ClientLogicShared } from 'wordle-shared/ts/ClientLogic';
import { Config } from '../config/Config';

export class ClientLogic extends ClientLogicShared {
	protected config = Config;
}
