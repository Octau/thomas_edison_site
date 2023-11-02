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
  PurchaseInventoryLiteModel,
  PurchaseInventoryModel,
  getPurchaseInventoryInput,
  getPurchaseInventoriesInput,
} from './model';

export function getPurchaseInventoriesKey(input?: getPurchaseInventoriesInput) {
  return ['getPurchaseInventories', input?.params];
}

export function getPurchaseInventoryKey(input?: getPurchaseInventoryInput) {
  return ['getPurchaseInventory', input?.id];
}

export function useGetPurchaseInventories(
  input?: getPurchaseInventoriesInput,
  options?: UseQueryOptions<
    ExtendedApiResult<PurchaseInventoryLiteModel[]>,
    ApiError
  >,
): UseQueryResult<ExtendedApiResult<PurchaseInventoryLiteModel[]>, ApiError> {
  return QueryTransformer(
    useQuery(
      getPurchaseInventoriesKey(input),
      () =>
        QueryFetchFunction({
          url: 'purchases',
          params: input?.params,
        }),
      options,
    ),
    PurchaseInventoryLiteModel,
  );
}

export function useGetPurchaseInventory(
  input?: getPurchaseInventoryInput,
  options?: UseQueryOptions<ApiResult<PurchaseInventoryModel>, ApiError>,
): UseQueryResult<ApiResult<PurchaseInventoryModel>, ApiError> {
  return QueryTransformer(
    useQuery(
      getPurchaseInventoryKey(input),
      () =>
        QueryFetchFunction({
          url: `purchases/${input?.id}`,
        }),
      options,
    ),
    PurchaseInventoryModel,
  );
}
