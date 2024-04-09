<script setup lang="ts">
import LoadingAnimation, { ElementMode } from '@/components/LoadingAnimation.vue';
import WordItem from '@/components/WordItem.vue';
import KeyBoard from '@/components/KeyBoard.vue';
import StatisticsPopup from '@/components/StatisticsPopup.vue';
</script>

<template>
	<template v-if="!ready">
		<loading-animation
			:mode="configLoaded ? ElementMode.DISMISS : ElementMode.LOAD"
			@loadingAnimationIteration="onLoadingAnimationIteration"
			@dismissAnimationEnd="onLoadingAnimationDismissed"
		/>
	</template>
	<template v-else>
		<div class="words">
			<word-item v-for="(word, i) in wordList" :key="i" :word-length="wordLength" :word="word" />
			<word-item v-for="i in wordLength - wordList.length" :key="i" :word-length="wordLength" />
		</div>
		<key-board @buttonClicked="buttonClicked" />
	</template>
</template>

<style lang="scss">
@import 'variables';
@import 'bootstrap/scss/reboot';
@import 'bootstrap/scss/root';

#app {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 100%;
	color: var(--bs-body-color);
	background-color: var(--bs-body-bg);

	@media (orientation: landscape) {
		flex-direction: row;
	}

	> * {
		flex-basis: 100%;
	}
}

.words {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	flex-wrap: wrap;
}
</style>

<script lang="ts">
import { Config } from '@/config/Config';
import { ClientLogic } from '@/ts/ClientLogic';
import { Subscriptions } from 'wordle-shared/ts/Subscriptions';
import { API } from 'wordle-shared/ts/API';
import { AppEvents } from '@/enums/AppEvents';
import { GameEvents } from 'wordle-shared/enums/GameEvents';
import type { Word } from 'wordle-shared/interfaces/Word';
import type { Letter } from 'wordle-shared/interfaces/Letter';
import type { Event } from 'wordle-shared/interfaces/Event';

let clientLogic: ClientLogic;

export default {
	data() {
		return {
			wordLength: Config.WordLength,
			wordList: [] as Array<Word>,
			maxTries: Config.MaxTries,
			tmpWord: [] as Word,
			ready: false,
			configLoaded: false,
			canMakeGuesses: false,
		};
	},
	created: function () {
		API.setConfig(Config);

		clientLogic = new ClientLogic();
		clientLogic.setConfig(Config);
		clientLogic.setStatsLogic(null);

		Config.requestConfig();
	},
	mounted: function () {
		const subscriptions = Subscriptions.getSingleton();
		subscriptions.subscribeToEvent(AppEvents.ConfigUpdated, this.onConfigUpdated.bind(this));
		subscriptions.subscribeToEvent(AppEvents.ServerError, this.onServerError.bind(this));
		subscriptions.subscribeToEvent(GameEvents.GuessSubmitted, this.onGuessSubmitted.bind(this));
		subscriptions.subscribeToEvent(GameEvents.GuessCorrect, this.onGuessCorrect.bind(this));
		subscriptions.subscribeToEvent(GameEvents.GuessIncorrect, this.onGuessIncorrect.bind(this));
		subscriptions.subscribeToEvent(
			GameEvents.GuessNotInDictionary,
			this.onGuessNotInDictionary.bind(this),
		);
		subscriptions.subscribeToEvent(GameEvents.GameExpired, this.onGameExpired.bind(this));
		subscriptions.subscribeToEvent(GameEvents.GameOver, this.onGameOver.bind(this));
		this.wordList.push(this.tmpWord);
	},
	methods: {
		onLoadingAnimationIteration(event: Event): void {
			// do nothing
		},
		onLoadingAnimationDismissed(event: Event): void {
			this.ready = true;
			this.canMakeGuesses = true;
		},
		onConfigUpdated(event: Event): void {
			this.wordLength = Config.WordLength;
			this.maxTries = Config.MaxTries;
			this.ready = false;
			this.configLoaded = true;
		},
		onServerError(event: Event): void {
			alert('Unable to contact server');
		},
		onGuessSubmitted(event: Event): void {},
		onGuessCorrect(event: Event): void {
			this.canMakeGuesses = false;
			this.jiggleWordlist(event.data);
			alert('Congratulations, you guessed the word!');
		},
		onGuessIncorrect(event: Event): void {
			this.jiggleWordlist(event.data);
		},
		onGuessNotInDictionary(event: Event): void {
			this.jiggleWordlist();
			alert('Sorry, word is not in dictionary');
		},
		onGameExpired(event: Event): void {
			this.canMakeGuesses = false;
			this.jiggleWordlist(event.data);
			alert('Sorry, time is up to guess this word');
		},
		onGameOver(event: Event): void {
			this.canMakeGuesses = false;
			this.jiggleWordlist(event.data);
			alert('Sorry, better luck next time!');
		},
		buttonClicked(event: Event): void {
			clientLogic.updateSelectedLetters(event.data, this.tmpWord);
		},
		jiggleWordlist(guessedWord?: Word): void {
			if (!guessedWord || guessedWord.length === 0) {
				this.wordList.pop();
			} else {
				this.tmpWord.forEach((letter: Letter, i: number) => {
					letter.data = guessedWord[i].data;
					letter.status = guessedWord[i].status;
				});
			}
			if (this.canMakeGuesses) {
				this.tmpWord = [];
				this.wordList.push(this.tmpWord);
			}
		},
	},
};
</script>
