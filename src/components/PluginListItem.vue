<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { reactive, ref } from "vue";

const props = defineProps<{
  downloads: number;
  iconPath: null | string;
  link: string;
  name: string;
  preview: null | string;
  previewImagePath: null | string;
  pricingModel: "FREE" | "FREEMIUM" | "PAID";
  rating: number;
}>();

const baseUrl = "https://plugins.jetbrains.com";
const isPreviewImgShow = ref(false);
const positionStyle = reactive({
  top: "0",
  left: "0",
});

function openInfoPage() {
  window.open(baseUrl + props.link, "infoPage");
}
function previewImage(e: MouseEvent) {
  isPreviewImgShow.value = true;
  const element = e.target as HTMLElement;
  positionStyle.top = `${element.offsetTop - 330}px`;
  positionStyle.left = `${element.offsetLeft}px`;
}
</script>

<template>
  <div
    class="plugin-list-item"
    @mouseenter="previewImage"
    @mouseleave="isPreviewImgShow = false"
    @click="openInfoPage"
  >
    <div class="header">
      <img v-if="iconPath" :src="baseUrl + iconPath" alt="logo" />
      <div>
        <div class="title">{{ name }}</div>
        <el-rate
          :model-value="rating"
          disabled
          show-score
          style="--el-rate-fill-color: #167dff"
        />
      </div>
    </div>
    <div class="content">{{ preview }}</div>
    <div class="footer">
      <div class="downloads">{{ downloads }} downloads</div>
      <div class="pricing-model">{{ pricingModel }}</div>
    </div>
  </div>
  <Teleport to="body">
    <div
      class="preview-img"
      v-if="isPreviewImgShow && previewImagePath"
      :style="positionStyle"
    >
      <img :src="baseUrl + previewImagePath" :alt="name" />
    </div>
  </Teleport>
</template>

<style>
:root {
  --border-color: rgba(39, 40, 44, 0.2);
  --border-color-active: rgba(39, 40, 44, 0.7);
}
</style>
<style scoped>
.plugin-list-item {
  width: 384px;
  height: 323px;
  border: var(--border-color) 1px solid;
  cursor: pointer;
  margin: 20px;
}
.plugin-list-item:hover {
  border-color: var(--border-color-active);
}
.plugin-list-item:hover .content,
.plugin-list-item:hover .footer {
  color: var(--border-color-active);
}
.header {
  width: 100%;
  height: 120px;
  padding: 24px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.header img {
  width: 72px;
  height: 72px;
}
.header > div {
  max-width: 230px;
  margin: 0 20px;
}
.header > div .title {
  color: rgba(25, 25, 28);
  font-size: 20px;
  font-weight: 530;
  line-height: 28px;
}
.content {
  width: 100%;
  height: 148px;
  border-top: var(--border-color) 1px solid;
  border-bottom: var(--border-color) 1px solid;
  padding: 24px;
  box-sizing: border-box;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(39, 40, 44, 0.6);
}
.footer {
  width: 100%;
  height: 53px;
  padding: 16px 24px;
  color: rgba(39, 40, 44, 0.4);
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
}
.preview-img {
  position: absolute;
}
</style>
