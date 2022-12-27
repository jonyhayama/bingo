<script setup>
import { defineProps, computed } from 'vue';

const { game } = defineProps({
  game: Array
})

const orderedNumbers = computed(() => {
  const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
  return [ ...game ].sort(collator.compare);
})
</script>

<template>
  <ul>
    <li v-for="number in orderedNumbers">{{ number }}</li>
  </ul>
</template>