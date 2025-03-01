<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { isTags } from '@/utils/tags';
import { useStore } from 'vuex';
import { genTitle, watchSwitchLang } from '@/utils/i18n';

const getTitle = route => {
  let title = '';

  if (!route.meta) {
    const pathArr = route.path.split('/');
    title = pathArr[pathArr.length - 1];
  } else {
    title = genTitle(route.meta.title);
  }
  return title;
};

const store = useStore();
const route = useRoute();
watch(
  route,
  (to, from) => {
    if (!isTags(to.path)) return;
    const { fullPath, meta, name, params, path, query } = to;
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    });
  },
  { immediate: true }
);

watchSwitchLang(() => {
  store.getters.tagsViewList.forEach((route, index) => {
    store.commit('app/changeTagsView', {
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    });
  });
});
</script>

<style lang="scss" scoped>
.app-main {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 96px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
