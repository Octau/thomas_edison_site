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
  SupplierDeleteInput,
  SupplierModel,
  SupplierMutationInput,
  SupplierUpdateInput,
} from './model';

export function useCreateSupplier(
  options?: UseMutationOptions<
    ApiResult<SupplierModel>,
    ApiError,
    SupplierMutationInput
  >,
): UseMutationResult<
  ApiResult<SupplierModel>,
  ApiError,
  SupplierMutationInput
> {
  return useMutation<ApiResult<SupplierModel>, ApiError, SupplierMutationInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: 'suppliers',
        method: 'POST',
        classType: SupplierModel,
        body,
      });
    },
    options,
  );
}

export function useUpdateSupplier(
  options?: UseMutationOptions<
    ApiResult<SupplierModel>,
    ApiError,
    SupplierUpdateInput
  >,
): UseMutationResult<ApiResult<SupplierModel>, ApiError, SupplierUpdateInput> {
  return useMutation<ApiResult<SupplierModel>, ApiError, SupplierUpdateInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: `suppliers/${body.supplierId}`,
        method: 'PUT',
        classType: SupplierModel,
        body: body.body,
      });
    },
    options,
  );
}

export function useDeleteSupplier(
  options?: UseMutationOptions<MessageResult, ApiError, SupplierDeleteInput>,
): UseMutationResult<MessageResult, ApiError, SupplierDeleteInput> {
  return useMutation<MessageResult, ApiError, SupplierDeleteInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: `suppliers/${body.supplierId}`,
        method: 'DELETE',
      });
    },
    options,
  );
}
