import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import { MutationFetchFunction } from 'common/helpers/common';
import { ApiError, ApiResult } from 'common/repositories/common.model';

import {
  PurchaseInventoryModel,
  PurchaseInventoryMutationInput,
} from './model';

export function useCreatePurchaseInventory(
  options?: UseMutationOptions<
    ApiResult<PurchaseInventoryModel>,
    ApiError,
    PurchaseInventoryMutationInput
  >,
): UseMutationResult<
  ApiResult<PurchaseInventoryModel>,
  ApiError,
  PurchaseInventoryMutationInput
> {
  return useMutation<
    ApiResult<PurchaseInventoryModel>,
    ApiError,
    PurchaseInventoryMutationInput
  >(async function (body) {
    return await MutationFetchFunction({
      url: 'purchases',
      method: 'POST',
      classType: PurchaseInventoryModel,
      body,
    });
  }, options);
}
