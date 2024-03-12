import express, { Request, Response } from 'express';
import { Config } from './config/Config';
import { ServerLogic } from './ts/ServerLogic';
import { DictionaryLogic } from './ts/DictionaryLogic';
import type { Guess } from 'wordle-shared/interfaces/Guess';

const app = express();
app.use(express.json()); // Parse JSON bodies

function onConfigRequested(): Config {
	// if  the config is not spread, the result is empty
	return {
		...Config,
		WordId: DictionaryLogic.getTodaysWordId(),
	};
}

async function onGuessSubmitted(data: any): Promise<Guess> {
	return ServerLogic.validateGuess(data.guess, data.wordId);
}

app.get(Config.Endpoints.ROOT, (req: Request, res: Response) => {
	res.json(onConfigRequested());
});
app.get(Config.Endpoints.CONFIG, (req: Request, res: Response) => {
	res.json(onConfigRequested());
});

app.post(Config.Endpoints.GUESS, (req: Request, res: Response) => {
	onGuessSubmitted(req.body).then((result) => {
		res.json(result);
	});
});

const port = Config.wordleServerPort;
app.listen(port, () => {
	console.log(`Wordle API Server is running on port ${port}`);
});
