<script setup>
import { defineProps, computed, toRefs } from 'vue';

const props = defineProps({
  number: Array
})
</script>

<template>
  <div>{{ number }}</div>
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