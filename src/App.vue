<script setup>
import { ref } from "vue";

const MAX_BINGO_NUMBERS = 10;
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const drawnNumbers = ref([]);

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

</script>

<template>
  <div>
    <button type="button" @click="drawNumber">Draw Number</button>

    <ul v-if="drawnNumbers.length > 0">
      <li v-for="number in drawnNumbers">{{ number }}</li>
    </ul>
  </div>
</template>
