import axios from "axios";
import type { AxiosResponse } from "axios";

interface BaseResponse {
  success: boolean;
  message: string;
}
export interface GetPluginsResponse extends BaseResponse {
  data: {
    pluginList: PluginList[];
    count: number;
  };
}
export interface PluginList {
  id: number;
  cDate: Date;
  downloads: number;
  iconPath: null | string;
  link: string;
  name: string;
  preview: string;
  previewImagePath: null | string;
  pricingModel: "FREE" | "FREEMIUM" | "PAID";
  rating: number;
}

export interface GetPluginsRequest {
  name?: string;
  minDownloads?: number;
  minRating?: number;
  sort?: "name" | "downloads" | "rating" | "cDate";
  sortType?: "ASC" | "DESC";
  page: number;
  size: number;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export function getPlugins(
  params: GetPluginsRequest
): Promise<AxiosResponse<GetPluginsResponse>> {
  return axios.get(baseUrl + "/get_plugin_list", {
    params,
  });
}
