import type { ApiService } from "@/shared/constants/service";
import { SERVICE_BASE_URLS } from "@/shared/constants/service";
import { parseCookies } from "nookies";

type FetchOptions = Omit<RequestInit, 'body'> & {
  json?: unknown;
};

export async function apiFetch<T>(
  service: ApiService,
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const url = `${SERVICE_BASE_URLS[service]}${endpoint}`;

  const cookies = parseCookies();
  const accessToken = cookies.accessToken || null;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ?  { 'Authorization': `Bearer ${accessToken}`}: {}),
      ...(options.headers || {}),
    },
    body: options.json ? JSON.stringify(options.json) : undefined,
  });

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;

    try {
      const errorBody = await response.json();

      if (errorBody && typeof errorBody.message === 'string') {
        errorMessage = errorBody.message;
      }
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  return await response.json();
}