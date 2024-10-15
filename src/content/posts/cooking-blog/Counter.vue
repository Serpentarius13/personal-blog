<script setup>
import { ref } from "vue";

const value = ref(0);
const animationName = ref("up");

const increment = () => {
  animationName.value = "up";
  value.value += 1;
};

const decrement = () => {
  animationName.value = "down";
  value.value -= 1;
};
</script>

<template>
  <div>
    <h4 class="!mb-0">Simple animated counter that works!</h4>
    <div class="flex items-center gap-4">
      <button class="btn btn-primary btn-sm" @click="decrement">-</button>
      <div class="relative w-[24px]">
        <Transition :name="`fade-${animationName}`" mode="out-in">
          <p class="text-center" :key="value">{{ value }}</p>
        </Transition>
      </div>

      <button class="btn btn-primary btn-sm" @click="increment">+</button>
    </div>
  </div>
</template>

<style scoped>
.fade-up-enter-active,  
 .fade-up-leave-active,
 .fade-down-enter-active,  
 .fade-down-leave-active {
    @apply transition-all; 
 }

 .fade-down-enter-from {
  @apply -translate-y-5 opacity-0
 }

 .fade-down-leave-to {
  @apply translate-y-5 opacity-0
 }
 
 .fade-up-enter-from {
  @apply translate-y-5 opacity-0
 }

 .fade-up-leave-to {
  @apply -translate-y-5 opacity-0
 }
</style>
