<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card class="project-card" :feature="featureData" />
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('profile.feature')" name="feature">
              <feature :features="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ProjectCard from './components/ProjectCard.vue';
import Feature from './components/Feature.vue';
import Author from './components/Author.vue';
import Chapter from './components/Chapter.vue';
import { feature } from '@/api/user';
import { watchSwitchLang } from '@/utils/i18n';

const activeName = ref('feature');

const featureData = ref([]);
const getFeatureData = async () => {
  featureData.value = await feature();
};

onMounted(() => {
  getFeatureData();
});

watchSwitchLang(getFeatureData);
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>
