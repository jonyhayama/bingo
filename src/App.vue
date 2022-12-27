<script setup>
import { computed } from "vue";
import { useStorage } from "@vueuse/core";
import GameResults from "./components/GameResults.vue";

const MAX_BINGO_NUMBERS = 10;
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const previousGames = useStorage('bingo/previousGames', []);
const drawnNumbers = useStorage('bingo/drawnNumbers', []);

const hasStartedGame = computed(() => (drawnNumbers.value.length > 0))

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
}

const clearGames = () => {
  previousGames.value = []
}

</script>

<template>
  <div>
    <button type="button" @click="drawNumber">Draw Number</button>
    <button type="button" @click="newGame" v-if="hasStartedGame">New Game</button>

    <GameResults v-if="hasStartedGame" :game="drawnNumbers" />

    <div v-if="previousGames.length > 0">
      <button type="button" @click="clearGames">Clear Old Games</button>
      <div v-for="game in previousGames">
        <GameResults :game="game" />
      </div>
    </div>
  </div>
</template>
