import pg from 'pg';
import { Config } from './config/Config';
import { Queries } from './ts/Queries';

const { Pool } = pg;

// Configure the PostgreSQL connection pool
const pool = new Pool(Config.Postgres);

/**
 * Parses a string into a number.
 * @param n - The string to parse.
 * @param error - The error message to log.
 * @returns The parsed number.
 */
function parseNumber(n: string, error: string): number {
	let number = -1;
	try {
		number = parseInt(n);
	}
	catch {
		console.error(error, n);
	}
	return number;
}

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
		return result.rowCount === 1;
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
 * @param wId - The word ID to get.
 * @returns The word for the ID.
 */
async function onWordRequested(wId: string, wLength: string): Promise<string> {
	let errorMessage = `Error parsing wordLength: ${wLength}`;
	const wordLength = parseNumber(wLength, errorMessage);
	if (wordLength < 1) {
		throw new Error(errorMessage);
	}

	errorMessage = `Error parsing wordId: ${wId}`;
	const wordId = parseNumber(wId, errorMessage);
	if (wordId < 20000101) {
		throw new Error(errorMessage);
	}

	const client = await pool.connect();
	try {
		const result = await client.query(Queries.getTodaysWord(wordId, wordLength));
		return result[1].rows[0].name;
	} catch (error) {
		console.error('Error executing query:', error);
	} finally {
		client.release();
	}
	return '';
}

export class Database {
	/**
	 * Determines whether a guess is in the game dictionary.
	 * @param word 
	 * @returns True if the word is in the dictionary.
	 */
	public static async checkWord(word: string = ''): Promise<{ word: boolean }> {
		return {
			word: await onWordCheckRequested(word),
		};
	}

	/**
	 * Get the word that corresponds to this ID.
	 * @param wordId 
	 * @returns  The word for the ID.
	 */
	public static async getWord(wordId: string = '-1', wordLength: string = '-1'): Promise<{ word: string }> {
		return {
			word: await onWordRequested(wordId, wordLength),
		};
	}
}