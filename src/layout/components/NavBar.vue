<template>
  <div class="navbar">
    <div class="left-menu">
      <Hamburger />
      <div id="guide-breadcrumb" class="breadcrumb-container">
        <Breadcrumb />
      </div>
    </div>
    <div class="right-menu">
      <div class="guide-container">
        <guide />
      </div>
      <div class="header-search-container">
        <header-search />
      </div>
      <div class="screenfull-container">
        <screenfull />
      </div>
      <div id="guide-theme" class="themeSelect-container">
        <theme-select />
      </div>
      <div id="guide-lang" class="langSelect-container">
        <LangSelect popDirection="bottom" />
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <i class="el-icon-s-tools"> </i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('navBar.home') }}</el-dropdown-item>
            </router-link>
            <a target="__blank" href="#">
              <el-dropdown-item>{{ $t('navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">{{
              $t('navBar.logout')
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import Hamburger from '@/components/Hamburger';
import Breadcrumb from '@/components/Breadcrumb';
import LangSelect from '@/components/LangSelect';
import ThemeSelect from '@/components/ThemeSelect';
import Screenfull from '@/components/Screenfull';
import HeaderSearch from '@/components/HeaderSearch';
import Guide from '@/components/Guide';

const store = useStore();
const logout = () => {
  store.dispatch('user/logout');
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .left-menu {
    display: flex;
    justify-content: center;
    align-items: center;

    .breadcrumb-container {
      margin-left: 16px;
    }
  }

  .right-menu {
    padding-right: 6px;
    flex: 1;
    text-align: right;

    .themeSelect-container,
    .langSelect-container,
    .screenfull-container,
    .header-search-container,
    .guide-container {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      height: 100%;
      vertical-align: top;
      cursor: pointer;

      ::v-deep(.svg-icon) {
        width: 26px;
        height: 26px;
      }
    }

    .header-search-container {
      margin-right: 0;
    }

    ::v-deep(.avatar-container) {
      cursor: pointer;
      font-size: 0;
      height: 100%;
      display: inline-flex;
      align-items: center;
      .avatar-wrapper {
        position: relative;

        .el-avatar {
          margin-right: 12px;
          --el-avatar-background-color: none;
        }

        .el-icon-s-tools {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
