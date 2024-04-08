<template>
  <div :class="$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar'">
    <div class="logo-container">
      <div class="avatar-container">
        <el-avatar
          :size="44"
          shape="square"
          src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        />
      </div>
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        imooc-admin
      </h1>
    </div>
    <el-scrollbar>
      <sidebar-menu />
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import SidebarMenu from './SidebarMenu';
import { computed } from 'vue';

const store = useStore();
const menuBg = computed(() => store.getters.cssVar.menuBg);
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.logo-container {
  display: flex;
  padding: 6px 20px 0 20px;
  height: 44px;

  .avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;

    ::v-deep(.el-avatar) {
      // background-color: #{$menuBg};
      background-color: v-bind(menuBg);
    }
  }

  h1 {
    margin-left: 6px;
    font-size: 18px;
    line-height: 40px;
    color: #fff;
  }
}

.hideSidebar .logo-container {
  padding: 6px 3px 0 3px;
  justify-content: center;
}
</style>
