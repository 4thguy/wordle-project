export interface Stats {
	currentStreak: number;
	maxStreak: number;
	lastUpdate: number;
	plays: number;
	wins: number;
	guessDistribution: GuessDistribution;
}

export interface GuessDistribution {
	[key: number]: number;
}
