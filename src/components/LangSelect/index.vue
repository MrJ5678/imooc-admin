<template>
  <el-dropdown class="international" trigger="click" @command="handleClick">
    <div>
      <el-tooltip
        :content="$t('navBar.lang')"
        :effect="props.effect"
        :placement="props.popDirection"
        :offset="10"
      >
        <span>
          <svg-icon icon="language" />
        </span>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { ElMessage, ElTooltip } from 'element-plus';

const props = defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      return ['dark', 'light'].indexOf(value) !== -1;
    }
  },
  popDirection: {
    type: String,
    default: 'top'
  }
});

const store = useStore();
const language = computed(() => store.getters.language);

// 切换语言
const i18n = useI18n();
const handleClick = lang => {
  i18n.locale.value = lang;
  store.commit('app/setLanguage', lang);
  ElMessage.success(i18n.t('toast.switchLangSuccess'));
};
</script>

<style lang="scss" scoped></style>
