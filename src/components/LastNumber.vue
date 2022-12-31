<script setup>
import { defineProps, toRefs, ref, watch } from 'vue';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const MAX_BINGO_NUMBERS = 10;
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const props = defineProps({
  number: Number
})

const { number } = toRefs(props);
const animatedNumber = ref(number.value);

watch(number, async () => {
  animatedNumber.value = 0;
  for(var i=1; i<=50; i++) {
    await sleep(50);
    animatedNumber.value = randomIntFromInterval(1, MAX_BINGO_NUMBERS);
  }
  animatedNumber.value = number.value;
})
</script>

<template>
  <div>{{ animatedNumber }}</div>
</template>

<style lang="scss" scoped>
div {
  font-size: 4em;
  background: var(--color);
  color: var(--background-color);
  width: 2em;
  height: 2em;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>