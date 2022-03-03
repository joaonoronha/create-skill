import { Subject } from "rxjs";
import axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import store from "./../store";

export function get<T>(url: string, hasAuthorization = false): Subject<T> {
  const request$: Subject<T> = new Subject<T>();
  const config: AxiosRequestConfig = hasAuthorization
    ? {
        headers: {
          Authorization: `Bearer ${store.getters.authToken}`,
          "Kare-Proxy-Authorization": `Bearer ${store.getters.proxyToken}`,
        },
      }
    : {
        headers: {},
      };

  axios
    .get<T>(url, config)
    .then((data: AxiosResponse<T>) => {
      if (data.status === 200) request$.next(data.data);
    })
    .catch((error: AxiosError<{ title: string }>) =>
      request$.error(handleError(error))
    );

  return request$;
}

export function post<T>(
  url: string,
  data = {},
  hasAuthorization = false,
  headerOptions = {}
): Subject<T> {
  const request$: Subject<T> = new Subject<T>();
  const headers: AxiosRequestConfig = hasAuthorization
    ? {
        headers: {
          Authorization: `Bearer ${store.getters.authToken}`,
          ...headerOptions,
        },
      }
    : {
        headers: headerOptions,
      };

  axios
    .post<T>(url, data, headers)
    .then((data: AxiosResponse<T>) => {
      if (data.status <= 299 && data.status >= 200) request$.next(data.data);
    })
    // TODO create error type
    .catch((error: AxiosError<{ title: string }>) =>
      request$.error(handleError(error))
    );

  return request$;
}

export function _delete<T>(
  url: string,
  body = {},
  hasAuthorization = false
): Subject<T> {
  const request$: Subject<T> = new Subject<T>();
  const headers: AxiosRequestConfig = hasAuthorization
    ? {
        headers: {
          Authorization: `Bearer ${store.getters.authToken}`,
        },
        data: {
          ...body,
        },
      }
    : {
        headers: {},
        data: {
          ...body,
        },
      };

  axios
    .delete<T>(url, headers)
    .then((data: AxiosResponse<T>) => {
      if (data.status <= 299 && data.status >= 200) request$.next(data.data);
    })
    // TODO create error type
    .catch((error: AxiosError<{ title: string }>) =>
      request$.error(handleError(error))
    );

  return request$;
}

const handleError = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.warn("HTTP ERROR", error);
    /*    if (error.response.status === 400 || error.response.status === 401) {
      store.commit("deleteSessionToken");
      store?.commit("setError", {
        title: "Session Expired",
        message: "Your session has expired. Please login again.",
      });
      router.push("/login");
    } else if (error.response.status === 404) {
      store?.commit("setError", {
        title: "Not found",
        message: "The request you tried to make was not found, sorry.",
      });
      router.push("/login");
    } else if (error.response.status === 403) {
      store?.commit("setError", {
        title: "Forbidden access",
        message: "The request you tried to make was rejected by the server.",
      });
    } else {
      store?.commit("setError", {
        title: error.response.data.error.message || error.response.data.error,
        message: "The request you tried to make was rejected by the server.",
      });
    }*/
  }

  return error;
};
