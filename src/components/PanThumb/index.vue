<template>
  <div class="pan-item" :style="{zIndex, height, width}">
    <div class="pan-info">
      <div class="pan-info-roles-container">
        <slot />
      </div>
    </div>
    <div :style="{backgroundImage: `url(${image})`}" class="pan-thumb"</div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';

defineProps({
  image: {
    type: String
  },
  zIndex: {
    type: Number,
    default: 1
  },
  width: {
    type: String,
    default: '150px'
  },
  height: {
    type: String,
    default: '150px'
  }
})
</script>

<style lang="scss" scoped>
.pan-item {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0 ,0, 0, .2);

  .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0 ,0, 0, .05);

    .pan-info-roles-container {
      padding: 20px;
      text-align: center;
    }
  }

  .pan-thumb {
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    transform-origin: 95% 40%;
    transition: all .3s ease-in-out;
  }

  &:hover {
    .pan-thumb {
      transform: rotate(-110deg);
    }

    .pan-info {
      p {
        a  {
          opacity: 1;
          transform: translateX(0px) rotate(0deg);
        }
      }
    }
  }
}
</style>
