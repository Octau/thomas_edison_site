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
  UserChangePasswordInput,
  UserCreateMutationInput,
  UserModel,
  UserUpdateMutationInput,
} from './model';

export function useCreateUser(
  options?: UseMutationOptions<
    ApiResult<UserModel>,
    ApiError,
    UserCreateMutationInput
  >,
): UseMutationResult<ApiResult<UserModel>, ApiError> {
  return useMutation<ApiResult<UserModel>, ApiError, UserCreateMutationInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: 'users',
        method: 'POST',
        classType: UserModel,
        body,
      });
    },
    options,
  );
}

export function useUpdateUser(
  options?: UseMutationOptions<
    ApiResult<UserModel>,
    ApiError,
    UserUpdateMutationInput
  >,
): UseMutationResult<ApiResult<UserModel>, ApiError> {
  return useMutation<ApiResult<UserModel>, ApiError, UserUpdateMutationInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: `users/${body.id}`,
        method: 'PUT',
        classType: UserModel,
        body: body.body,
      });
    },
    options,
  );
}

export function useDeleteUser(
  options?: UseMutationOptions<
    MessageResult,
    ApiError,
    UserUpdateMutationInput
  >,
): UseMutationResult<MessageResult, ApiError> {
  return useMutation<MessageResult, ApiError, UserUpdateMutationInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: `users/${body.id}`,
        method: 'DELETE',
      });
    },
    options,
  );
}

export function useChangePassword(
  options?: UseMutationOptions<
    MessageResult,
    ApiError,
    UserChangePasswordInput
  >,
): UseMutationResult<MessageResult, ApiError, UserChangePasswordInput> {
  return useMutation<MessageResult, ApiError, UserChangePasswordInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: 'me/auth/change-password',
        method: 'POST',
        body,
      });
    },
    options,
  );
}
