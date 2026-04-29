import type { PaginatedResponse } from './pagination';
import type { Receipt } from './receipt';

export const REFUND_CATEGORIES = {
  food: 'Alimentação',
  hosting: 'Hospedagem',
  transport: 'Transporte',
  services: 'Serviços',
  other: 'Outros',
} as const;

export type RefundCategory = keyof typeof REFUND_CATEGORIES;

export type Refund = {
  id: string;
  title: string;
  category: RefundCategory;
  value: number;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  receipt: Receipt;
};

export type CreateRefundPayload = {
  title: string;
  category: RefundCategory;
  value: number;
  receipt: string;
};

export type RefundResponse = {
  refund: Refund;
};

export type RefundsResponse = {
  refunds: PaginatedResponse<Refund>;
};

export type ListRefundsParams = {
  q?: string;
  page?: number;
};

export type DeleteRefundResponse = {
  message: string;
};
