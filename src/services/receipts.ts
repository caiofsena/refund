import type { DeleteReceiptResponse, ReceiptResponse } from '../models';
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

export function getReceiptDownloadUrl(id: string) {
  return getApiUrl(`/receipts/download/${id}`);
}
