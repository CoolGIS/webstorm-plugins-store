<script setup lang="ts">
import { reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { usePluginListStore } from "@/stores/pluginList";

const form = reactive({
  name: "",
  minDownloads: 0,
  minRating: 0,
  sort: "name" as const,
  sortType: "ASC" as const,
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

function pluginQuery() {
  const pluginListStore = usePluginListStore();
  pluginListStore.pluginQuery({
    ...form,
    page: 1,
    size: 10,
  });
}
</script>

<template>
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
</template>

<style scoped>
.form-container {
  width: 1270px;
  background: white;
  padding: 20px 0 0 20px;
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-dark);
  position: absolute;
  top: 350px;
  left: 0;
  right: 0;
  margin: auto;
}
.input-with-select {
  background-color: var(--el-fill-color-blank);
}
</style>
