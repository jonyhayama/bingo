<script setup>
import { defineProps, computed, toRefs } from 'vue';

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
    <li v-for="number in orderedNumbers">{{ number }}</li>
  </ul>
</template>