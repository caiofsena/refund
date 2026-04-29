const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

type JsonBody = Record<string, unknown> | unknown[];

type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: BodyInit | JsonBody | null;
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

export async function apiRequest<T>(
  path: string,
  { body, headers, ...options }: ApiRequestOptions = {},
) {
  const requestHeaders = new Headers(headers);
  let requestBody = body as BodyInit | null | undefined;

  if (body && !(body instanceof FormData) && !(body instanceof Blob)) {
    requestBody = JSON.stringify(body);

    if (!requestHeaders.has('Content-Type')) {
      requestHeaders.set('Content-Type', 'application/json');
    }
  }

  const response = await fetch(getApiUrl(path), {
    ...options,
    body: requestBody,
    headers: requestHeaders,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type');
  const data = contentType?.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === 'object' && data && 'message' in data
        ? String(data.message)
        : 'Erro ao acessar a API.';

    throw new ApiError(message, response.status, data);
  }

  return data as T;
}
