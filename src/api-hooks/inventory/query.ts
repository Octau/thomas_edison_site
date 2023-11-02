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
  InventoryLiteModel,
  InventoryModel,
  getInventoryInput,
  getInventoriesInput,
} from './model';

export const inventoryKeys = {
  listKey: 'getInventories',
  detailKey: 'getInventory',
  noticeKey: 'getNoticeInventories',
  list(input?: getInventoriesInput) {
    return [inventoryKeys.listKey, input?.params];
  },
  detail(input?: getInventoryInput) {
    return [inventoryKeys.detailKey, input?.id];
  },
  noticeInventories() {
    return [inventoryKeys.noticeKey];
  },
};

export function useGetInventories(
  input?: getInventoriesInput,
  options?: UseQueryOptions<ExtendedApiResult<InventoryLiteModel[]>, ApiError>,
): UseQueryResult<ExtendedApiResult<InventoryLiteModel[]>, ApiError> {
  return QueryTransformer(
    useQuery(
      inventoryKeys.list(input),
      () => QueryFetchFunction({ url: 'inventories', params: input?.params }),
      options,
    ),
    InventoryLiteModel,
  );
}

export function useGetInventory(
  input?: getInventoryInput,
  options?: UseQueryOptions<ApiResult<InventoryModel>, ApiError>,
): UseQueryResult<ApiResult<InventoryModel>, ApiError> {
  return QueryTransformer(
    useQuery(
      inventoryKeys.detail(input),
      () =>
        QueryFetchFunction({
          url: `inventories/${input?.id}`,
        }),
      options,
    ),
    InventoryModel,
  );
}

export function useGetNoticeInventories(
  options?: UseQueryOptions<ApiResult<InventoryLiteModel[]>, ApiError>,
): UseQueryResult<ApiResult<InventoryLiteModel[]>, ApiError> {
  return QueryTransformer(
    useQuery(
      inventoryKeys.noticeInventories(),
      () =>
        QueryFetchFunction({
          url: 'inventories/item-list',
        }),
      options,
    ),
    InventoryLiteModel,
  );
}
