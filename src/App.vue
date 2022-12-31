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
  <div>
    <button type="button" @click="drawNumber">Draw Number</button>
    <button type="button" @click="newGame" v-if="hasStartedGame">New Game</button>

    <template v-if="hasStartedGame">
      <LastNumber :number="lastNumber" />
      <GameResults :game="currentGame" />
    </template>

    <div v-if="previousGames.length > 0">
      <hr />
      <h2>Old Games</h2>
      <button type="button" @click="clearGames">Clear Old Games</button>
      <div v-for="game in previousGames">
        <GameResults :game="game" />
      </div>
    </div>
  </div>
</template>
