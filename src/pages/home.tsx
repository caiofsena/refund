import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import IconButton from '../components/icon-button';
import Input from '../components/input';
import Container from '../components/container';
import Text from '../components/text';
import RequestItem from '../core/request-item';

import MagnifyingGlass from '../assets/icons/magnifying-glass.svg?react';
import ForkKnife from '../assets/icons/fork-knife-fill.svg?react';
import Bed from '../assets/icons/bed-fill.svg?react';
import PoliceCar from '../assets/icons/police-car-fill.svg?react';
import Wrench from '../assets/icons/wrench-fill.svg?react';
import Receipt from '../assets/icons/receipt-fill.svg?react';
import CaretLeft from '../assets/icons/caret-left.svg?react';
import CaretRight from '../assets/icons/caret-right.svg?react';
import {
  REFUND_CATEGORIES,
  type RefundCategory,
} from '../models';
import { listRefunds } from '../services';
import type { IconProps } from '../components/icon';

const categoryIcons: Record<RefundCategory, IconProps['svg']> = {
  food: ForkKnife,
  hosting: Bed,
  transport: PoliceCar,
  services: Wrench,
  other: Receipt,
};

function centsToCurrency(value: number) {
  return (value / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [page, setPage] = useState(1);

  const refundsQuery = useQuery({
    queryKey: ['refunds', { q: appliedSearch.trim(), page }],
    queryFn: () => listRefunds({
      q: appliedSearch.trim() || undefined,
      page,
    }),
    placeholderData: keepPreviousData,
  });

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setAppliedSearch(search);
  }

  function goToPreviousPage() {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function goToNextPage() {
    setPage((currentPage) => {
      const lastPage = refundsQuery.data?.refunds.meta.lastPage ?? currentPage;
      return Math.min(currentPage + 1, lastPage);
    });
  }

  const refunds = refundsQuery.data?.refunds.data ?? [];
  const meta = refundsQuery.data?.refunds.meta;
  const currentPage = meta?.currentPage ?? page;
  const lastPage = meta?.lastPage ?? 1;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < lastPage;
  const errorMessage = refundsQuery.error instanceof Error
    ? refundsQuery.error.message
    : 'Não foi possível carregar as solicitações.';

  return (
    <Container size='md' className='w-full mt-6 mb-14 self-center rounded-2xl bg-white'>
      <Container className="flex flex-col p-10 gap-6">
        <Text variant='heading-lg-bold' color='secondary'>Solicitações</Text>

        <form
          className='flex pb-6 border-b border-b-gray-400'
          onSubmit={handleSearch}
        >
          <Input
            id='input-search-name'
            placeholder='Pesquisar pelo nome'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <IconButton
            type='submit'
            icon={MagnifyingGlass}
            className='ml-3'
            disabled={refundsQuery.isFetching}
          />
        </form>

        <Container className='flex flex-col gap-4 min-h-10'>
          {refundsQuery.isLoading && <Text>Carregando solicitações...</Text>}

          {!refundsQuery.isLoading && refundsQuery.isError && (
            <Text color='warning'>{errorMessage}</Text>
          )}

          {!refundsQuery.isLoading && !refundsQuery.isError && refunds.length === 0 && (
            <Text>Nenhuma solicitação encontrada.</Text>
          )}

          {!refundsQuery.isLoading && !refundsQuery.isError && refunds.map((refund) => (
            <RequestItem
              key={refund.id}
              icon={categoryIcons[refund.category]}
              title={refund.title}
              description={REFUND_CATEGORIES[refund.category]}
              currency={centsToCurrency(refund.value)}
              onClick={() => navigate(`/request/${refund.id}`)}
            />
          ))}
        </Container>

        <Container className='flex gap-2.5 items-center justify-center'>
          <IconButton
            icon={CaretLeft}
            size='md'
            disabled={!hasPreviousPage || refundsQuery.isFetching}
            onClick={goToPreviousPage}
            className={!hasPreviousPage || refundsQuery.isFetching ? 'opacity-50 cursor-not-allowed' : undefined}
          />
          <Text>{currentPage}/{lastPage}</Text>
          <IconButton
            icon={CaretRight}
            size='md'
            disabled={!hasNextPage || refundsQuery.isFetching}
            onClick={goToNextPage}
            className={!hasNextPage || refundsQuery.isFetching ? 'opacity-50 cursor-not-allowed' : undefined}
          />
        </Container>
      </Container>
    </Container>
  );
}
