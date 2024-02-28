import express, { Request, Response } from 'express';
import { Config } from 'wordle-shared/Config';
import { ServerLogic } from './ts/ServerLogic';
import { Guess } from 'wordle-shared/interfaces/Guess';
import { DictionaryLogic } from './ts/DictionaryLogic';

const app = express();
app.use(express.json()); // Parse JSON bodies

function onConfigRequested(): Config {
    // if  the config is not spread, the result is empty
    return {
        ...Config,
        WordId: DictionaryLogic.getTodaysWordId(),
    };
}

function onGuessSubmitted(data: any): Guess {
    return ServerLogic.validateGuess(data.guess, data.wordId);
}

app.get(Config.Endpoints.ROOT, (req: Request, res: Response) => {
    res.json(onConfigRequested());
});
app.get(Config.Endpoints.CONFIG, (req: Request, res: Response) => {
    res.json(onConfigRequested());
});

app.post(Config.Endpoints.GUESS, (req: Request, res: Response) => {
    res.json(onGuessSubmitted(req.body));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
