<template>
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <svg-icon v-else :icon="icon"></svg-icon>
  <span>{{ genTitle(title) }}</span>
</template>

<script setup>
import { defineProps } from 'vue';
import { genTitle } from '@/utils/i18n';
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
