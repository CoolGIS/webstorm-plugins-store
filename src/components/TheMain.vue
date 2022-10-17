<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { usePluginListStore } from "@/stores/pluginList";
const PluginListItem = defineAsyncComponent(
  () => import("@/components/PluginListItem.vue")
);

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
const pluginListStore = usePluginListStore();
const isSkeletonShow = ref(false);
const isEmptyShow = ref(false);
const currentPage = ref(1);
const pageSize = ref(9);
const total = ref(0);

async function pluginQuery() {
  isSkeletonShow.value = true;
  await pluginListStore.pluginQuery({
    ...form,
    page: currentPage.value,
    size: pageSize.value,
  });
  total.value = pluginListStore.pluginList!.count;
  isSkeletonShow.value = false;
  isEmptyShow.value = true;
}
function currentPageChange(page: number) {
  currentPage.value = page;
  pluginQuery();
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
        <el-select
          v-model="form.sort"
          placeholder="请选择排序字段"
          @change="pluginQuery"
        >
          <el-option
            v-for="item in sortOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="排序方式">
        <el-select
          v-model="form.sortType"
          placeholder="请选择排序方式"
          @change="pluginQuery"
        >
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
  <div class="plugin-list">
    <div v-if="pluginListStore.pluginList">
      <PluginListItem
        v-for="item in pluginListStore.pluginList.pluginList"
        :key="item.id"
        v-bind="item"
      />
    </div>
    <div v-else>
      <el-empty v-if="isEmptyShow" description="未查询到数据" />
    </div>
  </div>
  <div class="pagination">
    <el-pagination
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      hide-on-single-page
      background
      @update:current-page="currentPageChange"
    />
  </div>
  <el-skeleton v-show="isSkeletonShow" :count="3" animated />
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
.plugin-list {
  display: flex;
  justify-content: center;
}
.plugin-list > div:first-child {
  max-width: 1300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.pagination {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
