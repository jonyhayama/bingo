<script setup>
import { computed } from "vue";
import { useStorage } from "@vueuse/core";
import GameResults from "./components/GameResults.vue";
import LastNumber from "./components/LastNumber.vue";
import { MAX_BINGO_NUMBERS, randomIntFromInterval } from "@/util"

const previousGames = useStorage('bingo/previousGames', []);
const drawnNumbers = useStorage('bingo/drawnNumbers', []);

const hasStartedGame = computed(() => (drawnNumbers.value.length > 0))
const lastNumber = computed(() => (hasStartedGame ? drawnNumbers.value.at(-1) : null))
const currentGame = computed(() => (hasStartedGame ? drawnNumbers.value.slice(0, -1) : []))

const drawNumber = () => {
  if (drawnNumbers.value.length >= MAX_BINGO_NUMBERS) {
    alert('All numbers have been drawn, no bingo??');
    return;
  }

  let number;
  do {
    number = randomIntFromInterval(1, MAX_BINGO_NUMBERS);
  } while (drawnNumbers.value.includes(number))

  drawnNumbers.value.push(number);
}

const newGame = () => {
  previousGames.value.push([ ...drawnNumbers.value ]);
  drawnNumbers.value = [];
  drawNumber();
}

const clearGames = () => {
  previousGames.value = []
}

</script>

<template>
  <div class="container-fluid">
    <div class="old-games-title">
      <h1>Bingo</h1>
      <button type="button" v-if="hasStartedGame" @click="newGame">New Game</button>
    </div>
    
    <div class="main-game">
      <div>
        <LastNumber v-if="hasStartedGame" :number="lastNumber" />
        <button type="button" class="draw-number" @click="drawNumber">
          {{ hasStartedGame ? 'Draw Number' : 'New Game' }}
        </button>
        <GameResults v-if="hasStartedGame" :game="currentGame" />
      </div>
    </div>

    <div v-if="previousGames.length > 0">
      <hr />
      <div class="old-games-title">
        <h2>Old Games</h2>
        <button class="outline" type="button" @click="clearGames">Clear</button>
      </div>
      <div v-for="game in previousGames">
        <GameResults :game="game" />
        <hr />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.old-games-title {
  display: flex;
  gap: 0.5em;
  margin-bottom: 2em;
  align-items: center;

  h1, h2 {
    margin: 0;
  }

  button {
    width: auto;
    height: auto;
    font-size: 0.75em;
    padding: 0 0.75em;
    border-radius: 1em;
    margin: 0;
  }
}

.draw-number {
  max-width: 10em;
  margin: 2em auto;
}

.main-game {
  min-height: calc(100vh - 2rem - 4em);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
}
</style>