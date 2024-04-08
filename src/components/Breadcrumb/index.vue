<template>
  <el-breadcrumb v-bind="$attrs" class="breadcrumb" separator="/">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item
      ><a href="/">promotion management</a></el-breadcrumb-item
    >
    <el-breadcrumb-item>promotion list</el-breadcrumb-item> -->
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadCrumbData"
        :key="item.path"
      >
        <span v-if="index === breadCrumbData.length - 1" class="no-redirect">
          {{ genTitle(item.meta.title) }}
        </span>
        <span v-else class="redirect" @click="onClick(item)">{{
          genTitle(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { genTitle } from '@/utils/i18n';

// 生成数组数据
const breadCrumbData = ref([]);
const getBreadcrumbData = () => {
  // console.log(route.matched);
  breadCrumbData.value = route.matched.filter(
    item => item.meta && item.meta.title
  );
};

// 监听路由变化
const route = useRoute();
watch(
  route,
  () => {
    getBreadcrumbData();
  },
  { immediate: true }
);

const router = useRouter();
const onClick = item => {
  router.push(item.path);
};

const store = useStore();
const linkHoverColor = ref(store.getters.cssVar.menuBg);
</script>

<style lang="scss" scoped>
.breadcrumb {
  line-height: 50px;

  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: v-bind(linkHoverColor);
    }
  }

  ::v-deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
