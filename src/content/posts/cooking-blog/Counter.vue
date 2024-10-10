<script setup lang="ts">
import { ref } from "vue";

const value = ref(0);
</script>

<template>
  <div>
    <h4 class="!mb-0">Simple counter that works!</h4>
    <div class="flex items-center gap-2">
      <button class="btn btn-sm btn-primary" @click="value--">-</button>
      <p>{{ value }}</p>
      <button class="btn btn-sm btn-primary" @click="value++">+</button>
    </div>
  </div>
</template>
