<template>
  <div @click="onToggle">
    <el-tooltip :content="$t('navBar.screenfull')">
      <span id="guide-full">
        <svg-icon :icon="isFullScreen ? 'exit-fullscreen' : 'fullscreen'" />
      </span>
    </el-tooltip>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import screenfull from 'screenfull';

const isFullScreen = ref(false);

const onToggle = () => {
  screenfull.toggle();
  isFullScreen.value = !isFullScreen.value;
};
</script>

<style lang="scss" scoped></style>
