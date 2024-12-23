import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "./types";

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { data = null, method = "get", url, headers, responseType } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    request.open(method.toLocaleUpperCase(), url, true);

    request.onreadystatechange = (event) => {
      if (request.readyState !== 4) {
        return;
      }

      const responseHeader = request.getAllResponseHeaders();
      const responseData = responseType && responseType === "text" ? request.responseText : request.response;
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeader,
        config,
        request,
      };
      resolve(response);
    };

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === "content-type") {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });

    request.send(data);
  });
}
