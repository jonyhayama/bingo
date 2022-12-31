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

    <template v-if="hasStartedGame">
      <LastNumber :number="lastNumber" />
      <GameResults :game="currentGame" />
      <button type="button" @click="newGame">New Game</button>
    </template>

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

  h2 {
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
</style>