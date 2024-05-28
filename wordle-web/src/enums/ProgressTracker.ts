import type { Letter } from "wordle-shared/interfaces/Letter";

export interface ProgressTracker {
    date: Date;
    wordItems: Array<Letter[]>;
}
