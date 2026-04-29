import type {
  DeleteReceiptResponse,
  ReceiptDownloadResponse,
  ReceiptResponse,
} from '../models';
import { apiRequest, getApiUrl } from './http-client';

export async function createReceipt(file: File) {
  const formData = new FormData();
  formData.append('receiptFile', file);

  return apiRequest<ReceiptResponse>('/receipts', {
    method: 'POST',
    body: formData,
  });
}

export async function getReceipt(id: string) {
  return apiRequest<ReceiptResponse>(`/receipts/${id}`);
}

export async function deleteReceipt(id: string) {
  return apiRequest<DeleteReceiptResponse>(`/receipts/${id}`, {
    method: 'DELETE',
  });
}

export async function getReceiptDownload(id: string) {
  return apiRequest<ReceiptDownloadResponse>(`/receipts/download/${id}`);
}

export function getReceiptDownloadUrl(id: string) {
  return getApiUrl(`/receipts/download/${id}`);
}

export function resolveReceiptDownloadUrl(url: string) {
  if (/^https?:\/\//.test(url)) {
    return url;
  }

  return getApiUrl(url);
}
