<template>
  <div class="header-search" :class="{ show: isShow }">
    <div class="search-icon-container" @click.stop="onShowClick">
      <el-tooltip :content="$t('navBar.headerSearch')">
        <span id="guide-search">
          <svg-icon icon="search" />
        </span>
      </el-tooltip>
    </div>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      />
    </el-select>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { filterRoutes } from '@/utils/route';
import { genRoutes } from './FuseData';
import Fuse from 'fuse.js';
import { watchSwitchLang } from '@/utils/i18n';

const isShow = ref(false);
const headerSearchSelectRef = ref(null);
const onShowClick = () => {
  isShow.value = !isShow.value;
};

const onClose = () => {
  headerSearchSelectRef.value.blur();
  isShow.value = false;
  searchOptions.value = [];
};

watch(isShow, val => {
  if (val) {
    headerSearchSelectRef.value.focus();
    document.body.addEventListener('click', onClose);
  } else {
    document.body.removeEventListener('click', onClose);
  }
});

// 数据源
const router = useRouter();
let searchPool = computed(() => {
  const routes = filterRoutes(router.getRoutes());

  return genRoutes(routes);
});
// 搜索库
let fuse;
const initFuse = searchPool => {
  fuse = new Fuse(searchPool, {
    // 优先级排序
    shouldSort: true,
    // 匹配长度
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  });
};
initFuse(searchPool.value);

const search = ref('');

const searchOptions = ref([]);
const querySearch = query => {
  if (query !== '') {
    searchOptions.value = fuse.search(query);
  } else {
    searchOptions.value = [];
  }
};

const onSelectChange = val => {
  router.push(val.path);
};

watchSwitchLang(() => {
  searchPool = computed(() => {
    const routes = filterRoutes(router.getRoutes());

    return genRoutes(routes);
  });
  initFuse(searchPool.value);
});
</script>

<style lang="scss" scoped>
.header-search {
  display: inline-flex;

  .search-icon-container {
    display: inline-flex;
    align-items: center;
    margin-right: 8px;
  }

  .header-search-select {
    display: flex;
    align-items: center;
    transition: width 0.2s;
    width: 0;
    background: transparent;
    overflow: hidden;

    ::v-deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
    }
  }

  &.show {
    .header-search-select {
      width: 160px;
    }
  }
}
</style>
