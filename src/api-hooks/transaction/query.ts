import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { QueryFetchFunction, QueryTransformer } from 'common/helpers/common';
import {
  ApiError,
  ApiResult,
  ExtendedApiResult,
} from 'common/repositories/common.model';

import {
  TransactionLiteModel,
  TransactionModel,
  getTransactionInput,
  getTransactionsInput,
} from './model';

export function getTransactionsKey(input?: getTransactionsInput) {
  return ['getTransactions', input?.params];
}

export function getTransactionKey(input?: getTransactionInput) {
  return ['getTransaction', input?.id];
}

export function useGetTransactions(
  input?: getTransactionsInput,
  options?: UseQueryOptions<
    ExtendedApiResult<TransactionLiteModel[]>,
    ApiError
  >,
): UseQueryResult<ExtendedApiResult<TransactionLiteModel[]>, ApiError> {
  return QueryTransformer(
    useQuery(
      getTransactionsKey(input),
      () => QueryFetchFunction({ url: 'transactions', params: input?.params }),
      options,
    ),
    TransactionLiteModel,
  );
}

export function useGetTransaction(
  input?: getTransactionInput,
  options?: UseQueryOptions<ApiResult<TransactionModel>, ApiError>,
): UseQueryResult<ApiResult<TransactionModel>, ApiError> {
  return QueryTransformer(
    useQuery(
      getTransactionKey(input),
      () =>
        QueryFetchFunction({
          url: `transactions/${input?.id}`,
        }),
      options,
    ),
    TransactionModel,
  );
}
