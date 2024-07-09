import { AxiosRequestConfig } from "./types";

export default function xhr(config: AxiosRequestConfig) {
  const { data = null, method = "get", url } = config;

  const request = new XMLHttpRequest();

  request.open(method.toLocaleUpperCase(), url, true);

  request.send(data);
}