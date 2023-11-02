import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import { MutationFetchFunction } from 'common/helpers/common';
import {
  ApiError,
  ApiResult,
  MessageResult,
} from 'common/repositories/common.model';

import {
  TransactionDeleteInput,
  TransactionModel,
  TransactionMutationInput,
} from './model';

export function useCreateTransaction(
  options?: UseMutationOptions<
    ApiResult<TransactionModel>,
    ApiError,
    TransactionMutationInput
  >,
): UseMutationResult<
  ApiResult<TransactionModel>,
  ApiError,
  TransactionMutationInput
> {
  return useMutation<
    ApiResult<TransactionModel>,
    ApiError,
    TransactionMutationInput
  >(async function (body) {
    return await MutationFetchFunction({
      url: 'transactions',
      method: 'POST',
      classType: TransactionModel,
      body,
    });
  }, options);
}

export function useDeleteTransaction(
  options?: UseMutationOptions<MessageResult, ApiError, TransactionDeleteInput>,
): UseMutationResult<MessageResult, ApiError, TransactionDeleteInput> {
  return useMutation<MessageResult, ApiError, TransactionDeleteInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: `transactions/${body.id}`,
        method: 'DELETE',
      });
    },
    options,
  );
}
