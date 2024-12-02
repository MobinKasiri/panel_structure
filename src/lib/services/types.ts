import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { ports } from "./ports";

type PortKeys = keyof typeof ports;

export interface ApiCallOptions<T = unknown> {
  baseUrl?: string;
  url: string;
  port?: PortKeys;
  params?: Record<string, string>;
  data?: unknown;
  method?: string;
  callback?: (response: T, error: unknown) => void;
  formDataIsNeeded?: boolean;
  onUploadProgress?: (percentage: number) => void;
}

export interface UseApiCallOptions<T> extends Omit<ApiCallOptions, "callback"> {
  shouldCallApi?: boolean;
  queryOptions?: UseQueryOptions<T, Error, T, QueryKey>;
}

export interface ApiResponseProps<T> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}

export interface ApiErrorProps {
  message?: string;
}
