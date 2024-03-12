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
	public static async getWord(wordId: string = '-1'): Promise<{ word: string }> {
		return {
			word: await onWordRequested(wordId),
		};
	}
}