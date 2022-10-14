<script setup lang="ts">
import { reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getPlugins } from "@/api/plugins";

const form = reactive({
  name: "",
  minDownloads: 0,
  minRating: 0,
  sort: "name",
  sortType: "ASC",
});
const sortOptions = [
  {
    label: "名称",
    value: "name",
  },
  {
    label: "下载量",
    value: "downloads",
  },
  {
    label: "评分",
    value: "rating",
  },
  {
    label: "创建日期",
    value: "cDate",
  },
];
const sortTypeOptions = [
  {
    label: "正序",
    value: "ASC",
  },
  {
    label: "倒序",
    value: "DESC",
  },
];

async function pluginQuery() {
  const { data: pluginResults } = await getPlugins({
    ...form,
    page: 1,
    size: 10,
  });
  console.log(pluginResults);
}
</script>

<template>
  <header>
    <div class="title-container">
      <h1>WebStorm插件和主题商店</h1>
    </div>
    <div class="form-container">
      <el-form :model="form" label-width="100px" inline>
        <el-form-item label="名称" style="width: 1225px">
          <el-input
            v-model="form.name"
            placeholder="请输入插件或主题名称"
            class="input-with-select"
          >
            <template #append>
              <el-button :icon="Search" @click="pluginQuery" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="最小下载">
          <el-input-number
            v-model="form.minDownloads"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="最低评分">
          <el-input-number
            v-model="form.minRating"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="排序字段">
          <el-select v-model="form.sort" placeholder="请选择排序字段">
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序方式">
          <el-select v-model="form.sortType" placeholder="请选择排序方式">
            <el-option
              v-for="item in sortTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 577px;
  background: url("../assets/header/background.svg");
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title-container {
  width: 1000px;
  backdrop-filter: blur(15px);
  border: 1px solid white;
  border-radius: 12px;
  margin: 100px 0;
}
.title-container h1 {
  color: white;
  text-align: center;
  font-size: 45px;
  margin: 50px 0;
}
.form-container {
  width: 1270px;
  background: white;
  padding: 20px 0 0 20px;
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-dark);
}
.input-with-select {
  background-color: var(--el-fill-color-blank);
}
</style>
