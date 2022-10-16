import { computed, shallowRef } from "vue";
import { defineStore } from "pinia";
import type { GetPluginsRequest, GetPluginsResponse } from "@/api/plugins";
import { getPlugins } from "@/api/plugins";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";

export const usePluginListStore = defineStore("pluginList", () => {
  const pluginQueryResult = shallowRef<GetPluginsResponse | null>(null);
  const pluginList = computed(() => pluginQueryResult.value?.data);

  async function pluginQuery(query: GetPluginsRequest) {
    const { data: pluginResults } = await getPlugins(query);
    if (pluginResults.success) {
      pluginQueryResult.value = pluginResults;
    } else {
      ElMessage.error("数据获取失败：" + pluginResults.message);
    }
  }

  return { pluginList, pluginQuery };
});
