import seedrandom from 'seedrandom';

export class DictionaryLogic {
    private static dictionary = new Set([
        'BREAD',
        'DREAM',
        'FEAST',
        'GRAPE',
        'LEMON',
        'MUSIC',
        'OLIVE',
        'PEACH',
        'QUEEN',
        'RIVER',
    ]);

    public static isGuessInDictionary(guess: string): boolean {
        return DictionaryLogic.dictionary.has(guess);
    }

    public static getTodaysWord(): string {
        const rng = seedrandom(DictionaryLogic.getTodaysWordId().toString());
        const i = Math.floor(rng() * DictionaryLogic.dictionary.size);
        return Array.from(DictionaryLogic.dictionary)[i];
    }

    public static isWordIdValid(wordId: number): boolean {
        return DictionaryLogic.getTodaysWordId() === wordId;
    }

    public static getTodaysWordId(): number {
        const d = new Date();
        return parseInt(d.toISOString().split('T')[0].split('-').join(''));
    }
}