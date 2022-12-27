<script setup>
import { defineProps } from 'vue';

defineProps({
  game: Array
})
</script>

<template>
  <ul>
    <li v-for="number in game">{{ number }}</li>
  </ul>
</template>