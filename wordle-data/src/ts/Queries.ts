export class Queries {
	/**
	 * Check if a word is in the dictionary.
	 *
	 * @param word - The word to check.
	 * @returns The query to check if the word is in the dictionary.
	 */
	public static checkWord(word: string): string {
		return `SELECT * FROM words WHERE name = '${word}';`;
	}

	/**
	 * Get the query for the word that corresponds to this ID.
	 *
	 * @param wordId - The word ID to get.
	 * @returns The query to get the word for the ID.
	 */
	public static getTodaysWord(wordId: number): string {
		const query: Array<string> = [];
		// set the seed for reproducible results
		query.push(`SELECT setseed(${wordId} / 30000101);`);
		// generate a random integer within the range of your table size
		query.push(
			'WITH RandomNumber AS (SELECT floor(random() * (SELECT count(*) FROM words)) + 1 AS random_num)',
		);
		// select the nth item using the random number
		query.push('SELECT * FROM words OFFSET (SELECT random_num FROM RandomNumber) - 1 LIMIT 1;');
		return query.join('\n');
	}
}
