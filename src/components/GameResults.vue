<script setup>
import { defineProps, computed, toRefs } from 'vue';
import { MAX_BINGO_NUMBERS, formatNumber } from "@/util";

const props = defineProps({
  game: Array
})

const { game } = toRefs(props);

const orderedNumbers = computed(() => {
  const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
  return [ ...game.value ].sort(collator.compare);
})

const allNumbers = [...Array(MAX_BINGO_NUMBERS).keys()].map(n => n + 1)
</script>

<template>
  <ul>
    <li v-for="number in allNumbers" :class="{ active: game.includes(number) }">{{ formatNumber(number) }}</li>
  </ul>
</template>

<style lang="scss">
ul {
  display: flex;
  flex-wrap: wrap;
  width: calc(2.5em * 25);
  list-style: none;
  margin: 0 auto;
  padding: 0;

  li {
    list-style: none;
    margin: 0.25em;
    background: var(--form-element-disabled-background-color);
    width: 2em;
    height: 2em;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s ease-in-out;

    &::marker {
      content: none;
    }

    &.active {
      background: var(--color);
      color: var(--background-color);
    }
  }
}
</style>