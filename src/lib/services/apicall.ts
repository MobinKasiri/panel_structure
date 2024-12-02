import axios, {
  AxiosError,
  AxiosProgressEvent,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";
import { ApiCallOptions, ApiErrorProps, UseApiCallOptions } from "./types";
import { LocalNames } from "../constant/local_enums";
import messages from "../constant/messages";
import toast from "react-hot-toast";
import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";
import { ports } from "./ports";
import Cookies from "js-cookie";
import { getToken } from "../utils/functions";

const apiCall = async <T>({
  baseUrl,
  url,
  port,
  params = {},
  data = {},
  method = "get",
  callback,
  formDataIsNeeded = false,
  onUploadProgress,
}: ApiCallOptions<T>) => {
  const token: string | null = getToken();

  const cancelTokenSource = axios.CancelToken.source();

  const headers: RawAxiosRequestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: token ? `Bearer ${token}` : undefined,
    ClientSecret: "SHz5EGlNwVpSbgcJQ3pPmfUjLoW9BkFhMZ2TJaOd5KPGeqLK",
  };

  if (formDataIsNeeded) {
    headers["Content-Type"] = "multipart/form-data";
  }

  let completeUrl = baseUrl ?? import.meta.env.VITE_BASE_URL;
  if (port) completeUrl += `/${ports[port]}`;
  completeUrl += url;

  try {
    const response: AxiosResponse = await axios({
      method,
      url: completeUrl,
      headers,
      params,
      data,
      cancelToken: cancelTokenSource.token,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (!progressEvent?.total) return 0;
        let percentComplete = progressEvent.loaded / progressEvent.total;
        percentComplete = percentComplete * 100;
        if (onUploadProgress) {
          onUploadProgress?.(Number(percentComplete.toFixed(2)));
        }
      },
    });

    if (response?.status < 400) {
      callback?.(response.data, undefined);
      return response.data;
    }
  } catch (e) {
    const error = e as AxiosError<ApiErrorProps | null>;
    const errorData = error?.response?.data;

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      if (token) {
        toast.error(messages.error.token_expire);
        window.location.href = "/";
        Cookies.remove(LocalNames.token);
      } else {
        toast.error(errorData as string);
      }
      throw error;
    }
    if (errorData?.message) {
      toast.error(errorData?.message);
    }

    // @ts-expect-error => (undefined is not set in apiResponse<T> props)
    callback?.(undefined, error);
    throw error;
  }
};

export default apiCall;

export const useApiCall = <T>({
  baseUrl,
  url,
  port,
  params = {},
  data: sendedData = {},
  method = "get",
  shouldCallApi = true,
  formDataIsNeeded,
  queryOptions = {
    queryKey: [url],
    enabled: true,
    retry: 2,
    retryDelay: 5000,
    staleTime: 600000,
  },
}: UseApiCallOptions<T>) => {
  const fetchData = async () => {
    return new Promise<unknown>((resolve, reject) => {
      if (shouldCallApi) {
        apiCall({
          baseUrl,
          url,
          port,
          params,
          data: sendedData,
          method,
          callback: (responseData, error) => {
            if (error) {
              reject(error);
            } else {
              resolve(responseData);
            }
          },
          formDataIsNeeded,
        });
      } else {
        resolve(null);
      }
    });
  };

  const { data, error, isLoading, refetch } = useQuery<T, Error>({
    queryFn: fetchData as QueryFunction<T, QueryKey>,
    ...queryOptions,
    queryKey: queryOptions?.queryKey ?? url,
  });

  return { data, error, isLoading, refetch };
};
