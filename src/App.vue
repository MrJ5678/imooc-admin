<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex';
import { genNewStyle, writeNewStyle } from '@/utils/theme';
import { watchSwitchLang } from '@/utils/i18n';

const store = useStore();
genNewStyle(store.getters.mainColor).then(newStyle => {
  writeNewStyle(newStyle);
});

watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo');
  }
});
</script>

<style></style>
