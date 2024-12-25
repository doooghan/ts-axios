import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "./types";
import { parseHeaders } from "./helpers/headers";
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, method = "get", url, headers, responseType, timeout } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    if (timeout) {
      request.timeout = timeout;
    }

    request.open(method.toLocaleUpperCase(), url, true);

    request.onreadystatechange = (event) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 0) {
        return;
      }

      const responseHeader = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType && responseType === "text" ? request.responseText : request.response;
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeader,
        config,
        request,
      };
      handleResponse(response);
    };

    request.onerror = () => {
      reject(new Error("Network Error"));
    };

    request.ontimeout = () => {
      reject(new Error(`Timeout of ${timeout} ms exceeded`));
    };

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === "content-type") {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });

    request.send(data);

    const handleResponse = (response: AxiosResponse): void => {
      // return
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(new Error(`Request failed with status code ${response.status}`));
      }
    };
  });
}
