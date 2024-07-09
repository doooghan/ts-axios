export type Method =
  | "get"
  | "GET"
  | "post"
  | "POST"
  | "delete"
  | "DELETE"
  | "patch"
  | "PATCH"
  | "head"
  | "HEAD";

export interface AxiosRequestConfig {
  url: string;
  method?: Method;
  data?: any;
  params?: any;
}
