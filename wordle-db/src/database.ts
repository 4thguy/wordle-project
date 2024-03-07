import express, { Request, Response } from 'express';
import pg from 'pg';
import { Config } from './config/Config';
import { Queries } from './ts/Queries';

const { Pool } = pg;

// Configure the PostgreSQL connection pool
const pool = new Pool(Config.Postgres);

/**
 * Determines whether a word is in the game dictionary.
 *
 * @param word - The word to check.
 * @returns True if the word is in the dictionary.
 */
async function onWordCheckRequested(word: string): Promise<boolean> {
	const client = await pool.connect();
	try {
		const result = await client.query(Queries.checkWord(word));
		return result[1].rowCount === 1;
	} catch (error) {
		console.error('Error executing query:', error);
	} finally {
		client.release();
	}
	return false;
}

/**
 * Get the word that corresponds to this ID.
 *
 * @param id - The word ID to get.
 * @returns The word for the ID.
 */
async function onWordRequested(id: string): Promise<string> {
	let wordId = -1;
	try {
		wordId = parseInt(id);
	} catch (error) {
		console.error('Error parsing wordId:', id);
	}
	if (wordId < 20000101) {
		console.error('Error parsing wordId:', id);
	}
	const client = await pool.connect();
	try {
		const result = await client.query(Queries.getTodaysWord(wordId));
		return result[1].rows[0].name;
	} catch (error) {
		console.error('Error executing query:', error);
	} finally {
		client.release();
	}
	return '';
}

const app = express();
app.use(express.json()); // Parse JSON bodies

app.get(Config.Endpoints.ROOT, async (req: Request, res: Response) => {
	res.json('Hello World');
});

app.get(Config.Endpoints.CHECK, async (req: Request, res: Response) => {
	const word = req.query.word?.toString() ?? '';
	res.json({
		word: await onWordCheckRequested(word),
	});
});

app.get(Config.Endpoints.WORD, async (req: Request, res: Response) => {
	const wordId = req.query.wordId?.toString() ?? '-1';
	res.json({
		word: await onWordRequested(wordId),
	});
});

const port = Config.dbServerPort;
app.listen(port, () => {
	console.log(`Database API Server is running on port ${port}`);
});
