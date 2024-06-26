import { ClientLogic as ClientLogicShared } from 'wordle-shared/ts/ClientLogic';
import { StatsLogic } from './StatsLogic';
import { Config } from '@/config/Config';

export class ClientLogic extends ClientLogicShared {
	protected statsLogic = StatsLogic;
	protected config = Config;
}
