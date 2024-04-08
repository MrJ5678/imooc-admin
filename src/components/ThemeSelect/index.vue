<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleClick"
  >
    <div>
      <el-tooltip :content="$t('navBar.themeChange')" :offset="10">
        <span>
          <svg-icon icon="change-theme" />
        </span>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <div class="select-color-container">
    <select-color v-model="selectColorVisible" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SelectColor from './components/SelectColor';

const selectColorVisible = ref(false);

const handleClick = color => {
  selectColorVisible.value = true;
};
</script>

<style lang="scss" scoped>
.select-color-container {
  ::v-deep(.el-dialog) {
    text-align: center;
  }
}
</style>
