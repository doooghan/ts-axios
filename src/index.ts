import { transformRequest } from "./helpers/data";
import { processHeaders } from "./helpers/headers";
import { buildURL } from "./helpers/url";
import { AxiosRequestConfig } from "./types";
import xhr from "./xhr";

function axios(config: AxiosRequestConfig): void {
  processConfig(config);
  xhr(config);
}

const processConfig = (config: AxiosRequestConfig): void => {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRequesData(config);
};

const transformURL = (config: AxiosRequestConfig): string => {
  const { url, params } = config;
  return buildURL(url, params);
};

const transformRequesData = (config: AxiosRequestConfig): any => {
  return transformRequest(config.data);
};

const transformHeaders = (config: AxiosRequestConfig): any => {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
};

export default axios;
