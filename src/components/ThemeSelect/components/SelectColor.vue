<template>
  <el-dialog
    :title="$t('universal.title')"
    :model-value="modelValue"
    @close="closed"
    width="22%"
  >
    <div class="content">
      <p class="title">{{ $t('theme.themeColorChange') }}</p>
      <el-color-picker v-model="myColor" :predefine="predefineColors" />
    </div>
    <template #footer>
      <el-button @click="closed">{{ $t('universal.cancel') }}</el-button>
      <el-button type="primary" @click="confirm">{{
        $t('universal.confirm')
      }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { useStore } from 'vuex';
import { genNewStyle, writeNewStyle } from '@/utils/theme';

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

const emits = defineEmits(['update:modelValue']);

// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
];

const store = useStore();

const myColor = ref(store.getters.mainColor);

const closed = () => {
  emits('update:modelValue', false);
};

const confirm = async () => {
  const newStyle = await genNewStyle(myColor.value);
  writeNewStyle(newStyle);
  store.commit('theme/setMainColor', myColor.value);
  closed();
};
</script>

<style lang="scss" scoped></style>
