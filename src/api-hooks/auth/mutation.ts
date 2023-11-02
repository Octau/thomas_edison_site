import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { MutationFetchFunction } from 'common/helpers/common';
import { ApiError, ApiResult } from 'common/repositories/common.model';
import { client } from 'hooks/use-ky';

import {
  LoginMutationInput,
  RefreshTokenMutationInput,
  TokenResultModel,
} from './model';

export const refreshToken = async function (
  refresh_token: string,
): Promise<ApiResult<TokenResultModel>> {
  return await client
    .post('auth/refresh', { json: { refresh_token } })
    .json<ApiResult<TokenResultModel>>();
};

export function useLogin(
  options?: UseMutationOptions<
    ApiResult<TokenResultModel>,
    ApiError,
    LoginMutationInput
  >,
): UseMutationResult<ApiResult<TokenResultModel>, ApiError> {
  return useMutation<ApiResult<TokenResultModel>, ApiError, LoginMutationInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: 'auth/login',
        method: 'POST',
        classType: TokenResultModel,
        body,
      });
    },
    options,
  );
}

export function useRefreshToken(
  options?: UseMutationOptions<
    ApiResult<TokenResultModel>,
    ApiError,
    RefreshTokenMutationInput
  >,
): UseMutationResult<ApiResult<TokenResultModel>, ApiError> {
  return useMutation<
    ApiResult<TokenResultModel>,
    ApiError,
    RefreshTokenMutationInput
  >(async function (body) {
    return await MutationFetchFunction({
      url: 'auth/refresh',
      method: 'POST',
      classType: TokenResultModel,
      body,
    });
  }, options);
}
