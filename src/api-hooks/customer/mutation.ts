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
  CustomerDeleteInput,
  CustomerModel,
  CustomerMutationInput,
  CustomerUpdateInput,
} from './model';

export function useCreateCustomer(
  options?: UseMutationOptions<
    ApiResult<CustomerModel>,
    ApiError,
    CustomerMutationInput
  >,
): UseMutationResult<
  ApiResult<CustomerModel>,
  ApiError,
  CustomerMutationInput
> {
  return useMutation<ApiResult<CustomerModel>, ApiError, CustomerMutationInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: 'customers',
        method: 'POST',
        classType: CustomerModel,
        body,
      });
    },
    options,
  );
}

export function useUpdateCustomer(
  options?: UseMutationOptions<
    ApiResult<CustomerModel>,
    ApiError,
    CustomerUpdateInput
  >,
): UseMutationResult<ApiResult<CustomerModel>, ApiError, CustomerUpdateInput> {
  return useMutation<ApiResult<CustomerModel>, ApiError, CustomerUpdateInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: `customers/${body.id}`,
        method: 'PUT',
        classType: CustomerModel,
        body: body.body,
      });
    },
    options,
  );
}

export function useDeleteCustomer(
  options?: UseMutationOptions<MessageResult, ApiError, CustomerDeleteInput>,
): UseMutationResult<MessageResult, ApiError, CustomerDeleteInput> {
  return useMutation<MessageResult, ApiError, CustomerDeleteInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: `customers/${body.id}`,
        method: 'DELETE',
      });
    },
    options,
  );
}
