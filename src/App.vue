<script setup>
import { computed } from "vue";
import { useStorage } from "@vueuse/core";

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

</script>

<template>
  <div>
    <button type="button" @click="drawNumber">Draw Number</button>
    <button type="button" @click="newGame" v-if="hasStartedGame">New Game</button>

    <ul v-if="hasStartedGame">
      <li v-for="number in drawnNumbers">{{ number }}</li>
    </ul>

    <div v-for="game in previousGames">
      <ul>
        <li v-for="number in game">{{ number }}</li>
      </ul>
    </div>
  </div>
</template>
