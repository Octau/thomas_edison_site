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
  SupplierLiteModel,
  SupplierModel,
  getSupplierInput,
  getSuppliersInput,
} from './model';

export function getSuppliersKey(input?: getSuppliersInput) {
  return ['getSuppliers', input?.params];
}

export function getSupplierKey(input?: getSupplierInput) {
  return ['getSupplier', input?.supplierId];
}

export function useGetSuppliers(
  input?: getSuppliersInput,
  options?: UseQueryOptions<ExtendedApiResult<SupplierLiteModel[]>, ApiError>,
): UseQueryResult<ExtendedApiResult<SupplierLiteModel[]>, ApiError> {
  return QueryTransformer(
    useQuery(
      getSuppliersKey(input),
      () => QueryFetchFunction({ url: 'suppliers', params: input?.params }),
      options,
    ),
    SupplierLiteModel,
  );
}

export function useGetSupplier(
  input?: getSupplierInput,
  options?: UseQueryOptions<ApiResult<SupplierModel>, ApiError>,
): UseQueryResult<ApiResult<SupplierModel>, ApiError> {
  return QueryTransformer(
    useQuery(
      getSupplierKey(input),
      () =>
        QueryFetchFunction({
          url: `suppliers/${input?.supplierId}`,
        }),
      options,
    ),
    SupplierModel,
  );
}
