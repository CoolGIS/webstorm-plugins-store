import axios from "axios";

// const baseUrl = "test.coolgis.top:7001/api";

export function getPlugins(params: {
  name?: string;
  minDownloads?: number;
  minRating?: number;
  sort?: string;
  sortType?: string;
  page: number;
  size: number;
}) {
  return axios.get("/api/get_plugin_list", {
    params,
  });
}
