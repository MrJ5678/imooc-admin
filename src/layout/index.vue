<template>
  <div
    class="app-wrapper"
    :class="$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar'"
  >
    <side-bar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <nav-bar />
        <div id="guide-tags">
          <tags-view />
        </div>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar';
import SideBar from './components/Sidebar';
import AppMain from './components/AppMain';
import TagsView from '@/components/TagsView';
import variables from '@/styles/variables.scss';
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
