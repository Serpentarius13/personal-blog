<script setup>
import { ref } from "vue";

const value = ref(0);

const increment = () => {
  value.value += 1;
};

const decrement = () => {
  value.value -= 1;
};
</script>

<template>
  <div>
    <h4 class="!mb-0">Simple counter that works!</h4>
    <div class="flex items-center gap-2">
      <button class="btn btn-primary btn-sm" @click="decrement">-</button>
      <p>{{ value }}</p>
      <button class="btn btn-primary btn-sm" @click="increment">+</button>
    </div>
  </div>
</template>
