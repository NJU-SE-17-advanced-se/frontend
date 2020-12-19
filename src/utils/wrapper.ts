import { ApiResponse } from "@/interfaces/common";

/* eslint-disable  @typescript-eslint/no-explicit-any */
type API<R> = (...args: any[]) => Promise<ApiResponse<R>>;
type APIHandler<D> = (status: number, data: D) => void;
type APIResponse<T> = T extends API<infer R> ? R : never;

export function apiWrapper<T extends API<R>, R = APIResponse<T>>(
  api: T,
  ...handlers: APIHandler<R>[]
) {
  return async function(...args: Parameters<T>) {
    const { status, data } = await api(...args);
    for (const handler of handlers) {
      handler(status, data);
    }
    return { status, data };
  };
}
