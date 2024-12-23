export type Method = "get" | "GET" | "post" | "POST" | "delete" | "DELETE" | "patch" | "PATCH" | "head" | "HEAD";

export interface AxiosRequestConfig {
  url: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: any;
}

export type AxiosPromise = Promise<AxiosResponse>;
