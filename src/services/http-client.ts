import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

type ApiRequestOptions = Omit<AxiosRequestConfig, 'baseURL' | 'data' | 'url'> & {
  body?: AxiosRequestConfig['data'];
};

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export function getApiUrl(path: string) {
  const normalizedBaseUrl = API_BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${normalizedBaseUrl}${normalizedPath}`;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export async function apiRequest<T>(
  path: string,
  { body, ...options }: ApiRequestOptions = {},
) {
  try {
    const response = await api.request<T>({
      ...options,
      url: path,
      data: body,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const data = error.response?.data;
      const message =
        typeof data === 'object' && data && 'message' in data
          ? String(data.message)
          : 'Erro ao acessar a API.';

      throw new ApiError(message, error.response?.status ?? 0, data);
    }

    throw error;
  }
}
