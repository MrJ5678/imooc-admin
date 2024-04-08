<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item
      v-for="item in features"
      :key="item.id"
      :title="item.title"
      :nam="item.id"
    >
      <div v-html="item.content"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
const props = defineProps({
  features: {
    type: Array,
    required: true
  }
});

const activeName = ref(0);
</script>

<style lang="scss" scoped></style>
