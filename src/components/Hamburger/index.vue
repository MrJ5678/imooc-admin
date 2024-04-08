<template>
  <div id="guide-hamburger" class="hamburger-container" @click="handleClick">
    <svg-icon :icon="icon" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const icon = computed(() => {
  if (store.getters.sidebarOpened) {
    return 'hamburger-opened';
  } else {
    return 'hamburger-closed';
  }
});

const handleClick = () => {
  store.commit('app/triggerSidebarOpened');
};
</script>

<style lang="scss" scoped>
.hamburger-container {
  /* padding: 0 16px; */
  margin-left: 16px;
  cursor: pointer;
  /* hover 动画*/
  transition: background 0.5s;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
