import { useEffect, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import Button from '../components/button';
import Container from '../components/container';
import Icon from '../components/icon';
import Input from '../components/input';
import InputFile from '../components/input-file';
import Select from '../components/select';
import Text from '../components/text';
import FileBold from '../assets/icons/file-bold.svg?react';
import {
  REFUND_CATEGORIES,
  type Refund,
  type RefundCategory,
} from '../models';
import {
  createReceipt,
  createRefund,
  deleteRefund,
  getReceiptDownloadUrl,
  getRefund,
} from '../services';

type RequestMode = 'create' | 'view';

type RequestProps = {
  mode?: RequestMode;
  refund?: Refund;
};

type RequestFormValues = {
  title: string;
  category: RefundCategory | '';
  value: string;
  receipt?: FileList;
};

const categoryOptions = Object.entries(REFUND_CATEGORIES).map(([value, label]) => ({
  value,
  label,
}));

function centsToCurrency(value: number) {
  return (value / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function currencyToCents(value: string) {
  const normalizedValue = value
    .replace(/\s/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  return Math.round(Number(normalizedValue) * 100);
}

function getDefaultValues(refund?: Refund): RequestFormValues {
  return {
    title: refund?.title ?? '',
    category: refund?.category ?? '',
    value: refund ? centsToCurrency(refund.value) : '',
    receipt: undefined,
  };
}

export default function Request({ mode = 'create', refund }: RequestProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loadedRefund, setLoadedRefund] = useState<Refund | null>(null);
  const [isLoadingRefund, setIsLoadingRefund] = useState(false);
  const [loadRefundError, setLoadRefundError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const displayRefund = refund ?? loadedRefund;
  const isViewMode = mode === 'view' || Boolean(id) || Boolean(displayRefund);

  const form = useForm<RequestFormValues>({
    defaultValues: getDefaultValues(displayRefund ?? undefined),
    mode: 'onBlur',
  });

  const selectedReceiptUrl = displayRefund?.receipt.id
    ? getReceiptDownloadUrl(displayRefund.receipt.id)
    : '';

  useEffect(() => {
    if (!id) {
      setLoadedRefund(null);
      setLoadRefundError('');
      return;
    }

    let ignoreResponse = false;

    async function loadRefund() {
      try {
        setIsLoadingRefund(true);
        setLoadRefundError('');

        const response = await getRefund(id as string);

        if (ignoreResponse) return;

        setLoadedRefund(response.refund);
      } catch (error) {
        if (ignoreResponse) return;

        setLoadedRefund(null);
        setLoadRefundError(
          error instanceof Error
            ? error.message
            : 'Não foi possível carregar a solicitação.',
        );
      } finally {
        if (!ignoreResponse) {
          setIsLoadingRefund(false);
        }
      }
    }

    loadRefund();

    return () => {
      ignoreResponse = true;
    };
  }, [id]);

  useEffect(() => {
    form.reset(getDefaultValues(displayRefund ?? undefined));
  }, [displayRefund, form]);

  const onSubmit: SubmitHandler<RequestFormValues> = async (data) => {
    const file = data.receipt?.[0];

    if (!file) return;

    try {
      setSubmitError('');

      const { receipt } = await createReceipt(file);
      await createRefund({
        title: data.title.trim(),
        category: data.category as RefundCategory,
        value: currencyToCents(data.value),
        receipt: receipt.id,
      });

      navigate('/success');
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Não foi possível enviar a solicitação.',
      );
    }
  };

  async function handleDeleteRefund() {
    if (!displayRefund?.id) return;

    try {
      setIsDeleting(true);
      setDeleteError('');

      await deleteRefund(displayRefund.id);
      navigate('/');
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : 'Não foi possível excluir a solicitação.',
      );
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  }

  return (
    <Container size='sm' className='w-full self-center rounded-2xl bg-white'>
      <Container className="flex flex-col p-10">
        <Container className='flex flex-col'>
          <Text variant='heading-lg-bold' color='secondary'>
            Solicitação de reembolso
          </Text>
          <Text className='mt-3'>
            Dados da despesa para solicitar reembolso.
          </Text>
        </Container>

        {isLoadingRefund && (
          <Text className='mt-10'>Carregando solicitação...</Text>
        )}

        {!isLoadingRefund && loadRefundError && (
          <Text color='warning' className='mt-10'>{loadRefundError}</Text>
        )}

        {!isLoadingRefund && !loadRefundError && (
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <Container className='flex flex-col mt-10 gap-8'>
            <Container className='flex flex-col gap-2'>
              <Input
                id='input-request-name'
                label='Nome da solicitação'
                disabled={isViewMode}
                {...form.register('title', {
                  required: 'Informe o nome da solicitação.',
                  minLength: {
                    value: 3,
                    message: 'Informe pelo menos 3 caracteres.',
                  },
                })}
              />
              {form.formState.errors.title?.message && (
                <Text color='warning'>{form.formState.errors.title.message}</Text>
              )}
            </Container>

            <Container className='flex gap-4'>
              <Container className='flex flex-col gap-2 w-full'>
                <Controller
                  control={form.control}
                  name='category'
                  rules={{ required: 'Selecione uma categoria.' }}
                  render={({ field }) => (
                    <Select
                      label="Categoria"
                      options={categoryOptions}
                      value={field.value}
                      disabled={isViewMode}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                {form.formState.errors.category?.message && (
                  <Text color='warning'>{form.formState.errors.category.message}</Text>
                )}
              </Container>

              <Container className='flex flex-col gap-2 w-full'>
                <Input
                  id='input-request-currency'
                  label='Valor'
                  inputMode='decimal'
                  placeholder='0,00'
                  disabled={isViewMode}
                  {...form.register('value', {
                    required: 'Informe o valor.',
                    validate: (value) => {
                      const cents = currencyToCents(value);

                      if (!Number.isFinite(cents)) {
                        return 'Informe um valor válido.';
                      }

                      return cents > 0 || 'O valor deve ser maior que zero.';
                    },
                  })}
                />
                {form.formState.errors.value?.message && (
                  <Text color='warning'>{form.formState.errors.value.message}</Text>
                )}
              </Container>
            </Container>

            <Container className={isViewMode ? 'flex justify-center' : 'flex'}>
              {isViewMode && selectedReceiptUrl ? (
                <a
                  href={selectedReceiptUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='flex items-center justify-center gap-2'
                >
                  <Icon svg={FileBold} />
                  <Text variant='body-md-semibold' color='tertiary'>
                    Abrir comprovante
                  </Text>
                </a>
              ) : (
                <InputFile<RequestFormValues>
                  id='receipt'
                  form={form}
                  label='Comprovante'
                  accept='.pdf,.png,.jpg,.jpeg'
                  allowedExtensions={['pdf', 'png', 'jpg', 'jpeg']}
                  error={form.formState.errors.receipt?.message}
                  {...form.register('receipt', {
                    required: 'Envie o comprovante.',
                    validate: {
                      extension: (files) => {
                        const file = files?.[0];
                        const extension = file?.name.split('.').pop()?.toLowerCase();

                        return (
                          !file ||
                          ['pdf', 'png', 'jpg', 'jpeg'].includes(extension ?? '') ||
                          'Use um arquivo PDF, PNG ou JPG.'
                        );
                      },
                      size: (files) => {
                        const file = files?.[0];

                        return (
                          !file ||
                          file.size <= 1024 * 1024 ||
                          'O arquivo deve ter no máximo 1 MB.'
                        );
                      },
                    },
                  })}
                />
              )}
            </Container>

            {submitError && <Text color='warning'>{submitError}</Text>}
            {deleteError && <Text color='warning'>{deleteError}</Text>}

            {!isViewMode && (
              <Button type='submit' disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Enviando...' : 'Enviar'}
              </Button>
            )}

            {isViewMode && displayRefund?.id && (
              <Button
                type='button'
                disabled={isDeleting}
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Excluir
              </Button>
            )}

          </Container>
          </form>
        )}
      </Container>

      {isDeleteModalOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-gray-100/80 px-5'
          role='dialog'
          aria-modal='true'
          aria-labelledby='delete-refund-title'
        >
          <Container className='w-full max-w-xl rounded-xl bg-white p-10 shadow-lg'>
            <Container className='flex flex-col gap-3'>
              <Text
                id='delete-refund-title'
                variant='heading-lg-bold'
                color='secondary'
              >
                Excluir solicitação
              </Text>
              <Text>
                Tem certeza que deseja excluir essa solicitação? Essa ação é irreversível.
              </Text>
            </Container>

            <Container className='mt-8 flex justify-end gap-4'>
              <button
                type='button'
                className='flex h-12 items-center justify-center px-5 text-sm font-semibold text-green-100'
                disabled={isDeleting}
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancelar
              </button>
              <Button
                type='button'
                disabled={isDeleting}
                onClick={handleDeleteRefund}
              >
                {isDeleting ? 'Excluindo...' : 'Confirmar'}
              </Button>
            </Container>
          </Container>
        </div>
      )}
    </Container>
  )
}
