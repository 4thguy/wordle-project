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
	public static getTodaysWord(wordId: number, wordLength: number): string {
		return `
		SELECT SETSEED(${wordId / 30000101});
		SELECT * 
		FROM words 
		WHERE LENGTH(name) = ${wordLength} 
		ORDER BY RANDOM() 
		LIMIT 1;
		`
	}
}
