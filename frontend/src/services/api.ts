import { appConfig } from "@/config";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, signal } = options;
  const url = `${appConfig.api.baseUrl}${endpoint}`;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new ApiError(
      (errorBody as { message?: string }).message ??
        `Request failed with status ${response.status}`,
      response.status,
      (errorBody as { code?: string }).code
    );
  }

  return response.json() as Promise<T>;
}

export async function apiGet<T>(
  endpoint: string,
  signal?: AbortSignal
): Promise<T> {
  return apiRequest<T>(endpoint, { method: "GET", signal });
}

export async function apiPost<T>(
  endpoint: string,
  body: unknown,
  signal?: AbortSignal
): Promise<T> {
  return apiRequest<T>(endpoint, { method: "POST", body, signal });
}
