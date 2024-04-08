<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    :uniqueOpened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <!-- <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项一</el-menu-item>
      <el-menu-item index="1-2">选项二</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-location"></i>
      <template #title>导航二</template>
    </el-menu-item> -->
    <sidebar-item v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { filterRoutes, generateMenus } from '@/utils/route';
import SidebarItem from './SidebarItem.vue';

const router = useRouter();
// window.router = router;
const routes = computed(() => {
  const filteredRoutes = filterRoutes(router.getRoutes());

  return generateMenus(filteredRoutes);
});

const routeInfo = [
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: 'profile',
      icon: 'el-icon-user'
    },
    children: []
  },
  {
    path: '/user',
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        name: 'userManage',
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        },
        children: []
      },
      {
        path: '/user/role',
        name: 'userRole',
        meta: {
          title: 'roleList',
          icon: 'personnel-manage'
        },
        children: []
      },
      {
        path: '/user/permission',
        name: 'userPermission',
        meta: {
          title: 'permissionList',
          icon: 'permission'
        },
        children: []
      }
    ]
  },
  {
    path: '/article',
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article'
    },

    children: [
      {
        path: '/article/ranking',
        name: 'articleRanking',
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking'
        },
        children: []
      },
      {
        path: '/article/create',
        name: 'articleCreate',
        meta: {
          title: 'articleCreate',
          icon: 'article-create'
        },
        children: []
      }
    ]
  }
];

// 默认激活项
const route = useRoute();

const activeMenu = computed(() => {
  const { path } = route;

  return path;
});
</script>

<style lang="scss" scoped></style>
