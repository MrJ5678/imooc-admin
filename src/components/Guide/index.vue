<template>
  <div>
    <el-tooltip :content="$t('navBar.guide')">
      <span id="guide-start" @click="onClick">
        <svg-icon icon="guide" />
      </span>
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Driver from 'driver.js';
import { useI18n } from 'vue-i18n';
import { steps } from './steps';
import { watchSwitchLang } from '@/utils/i18n';
import 'driver.js/dist/driver.min.css';

const i18n = useI18n();
let driver;
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙板关闭
    allowClose: false,
    closeBtnText: i18n.t('guide.close'),
    nextBtnText: i18n.t('guide.next'),
    prevBtnText: i18n.t('guide.prev')
  });
  // console.log(driver);
});

const onClick = () => {
  driver.defineSteps(steps(i18n));
  driver.start();
};
</script>

<style lang="scss" scoped></style>
