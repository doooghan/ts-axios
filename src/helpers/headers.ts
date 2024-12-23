import { isPlainObject } from "./util";

const normalizeHeaderName = (headers: any, normalizedName: string): any => {
  if (!headers) {
    return;
  }
  Object.keys(headers).forEach((name) => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name];
      delete headers[name];
    }
  });
};

export const processHeaders = (headers: any, data: any): any => {
  normalizeHeaderName(headers, "Content-Type");

  if (isPlainObject(data)) {
    if (headers && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json;charset=utf-8";
    }
  }

  return headers;
};

export const parseHeaders = (headers: string): any => {
  const parsed = Object.create(null);
  if (!headers) {
    return parsed;
  }

  headers.split("\r\n").forEach((line) => {
    let [key, value] = line.split(":");

    key = key.trim().toLowerCase();
    if (!key) {
      return;
    }
    if (value) {
      value = value.trim();
    }
    parsed[key] = value;
  });

  return parsed;
};
