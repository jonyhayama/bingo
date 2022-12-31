<script setup>
import { defineProps, computed, toRefs } from 'vue';
import { formatNumber } from "@/util";

const props = defineProps({
  game: Array
})

const { game } = toRefs(props);

const orderedNumbers = computed(() => {
  const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
  return [ ...game.value ].sort(collator.compare);
})
</script>

<template>
  <ul>
    <li v-for="number in orderedNumbers">{{ formatNumber(number) }}</li>
  </ul>
</template>

<style lang="scss">
ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    list-style: none;
    margin: 0.25em;
    background: var(--color);
    color: var(--background-color);
    width: 2em;
    height: 2em;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &::marker {
      content: none;
    }
  }
}
</style>