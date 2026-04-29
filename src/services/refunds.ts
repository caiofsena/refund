import type {
  CreateRefundPayload,
  DeleteRefundResponse,
  ListRefundsParams,
  RefundResponse,
  RefundsResponse,
} from '../models';
import { apiRequest } from './http-client';

function buildRefundsSearchParams(params: ListRefundsParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.q) {
    searchParams.set('q', params.q);
  }

  if (params.page) {
    searchParams.set('page', String(params.page));
  }

  return searchParams.toString();
}

export async function listRefunds(params?: ListRefundsParams) {
  const query = buildRefundsSearchParams(params);
  const path = query ? `/refunds?${query}` : '/refunds';

  return apiRequest<RefundsResponse>(path);
}

export async function getRefund(id: string) {
  return apiRequest<RefundResponse>(`/refunds/${id}`);
}

export async function createRefund(payload: CreateRefundPayload) {
  return apiRequest<RefundResponse>('/refunds', {
    method: 'POST',
    body: payload,
  });
}

export async function deleteRefund(id: string) {
  return apiRequest<DeleteRefundResponse>(`/refunds/${id}`, {
    method: 'DELETE',
  });
}
