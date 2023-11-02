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
  InventoryDeleteInput,
  InventoryModel,
  InventoryMutationInput,
  InventoryUpdateInput,
} from './model';

export function useCreateInventory(
  options?: UseMutationOptions<
    ApiResult<InventoryModel>,
    ApiError,
    InventoryMutationInput
  >,
): UseMutationResult<
  ApiResult<InventoryModel>,
  ApiError,
  InventoryMutationInput
> {
  return useMutation<
    ApiResult<InventoryModel>,
    ApiError,
    InventoryMutationInput
  >(async function (body) {
    return await MutationFetchFunction({
      url: 'inventories',
      method: 'POST',
      classType: InventoryModel,
      body,
    });
  }, options);
}

export function useUpdateInventory(
  options?: UseMutationOptions<
    ApiResult<InventoryModel>,
    ApiError,
    InventoryUpdateInput
  >,
): UseMutationResult<
  ApiResult<InventoryModel>,
  ApiError,
  InventoryUpdateInput
> {
  return useMutation<ApiResult<InventoryModel>, ApiError, InventoryUpdateInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: `inventories/${body.id}`,
        method: 'PUT',
        classType: InventoryModel,
        body: body.body,
      });
    },
    options,
  );
}

export function useDeleteInventory(
  options?: UseMutationOptions<MessageResult, ApiError, InventoryDeleteInput>,
): UseMutationResult<MessageResult, ApiError, InventoryDeleteInput> {
  return useMutation<MessageResult, ApiError, InventoryDeleteInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: `inventories/${body.id}`,
        method: 'DELETE',
      });
    },
    options,
  );
}
