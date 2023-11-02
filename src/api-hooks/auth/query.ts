import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { UserModel } from 'api-hooks/user/model';
import { QueryFetchFunction, QueryTransformer } from 'common/helpers/common';
import { client } from 'common/repositories';
import { ApiError, ApiResult } from 'common/repositories/common.model';

export const getMe = async function (): Promise<UserModel> {
  const response = await client.get('me').json<ApiResult<UserModel>>();
  return response.data;
};

export function useGetMe(
  options?: UseQueryOptions<ApiResult<UserModel>, ApiError>,
): UseQueryResult<ApiResult<UserModel>, ApiError> {
  return QueryTransformer(
    useQuery(['getMe'], () => QueryFetchFunction({ url: 'me' }), options),
    UserModel,
  );
}

export const getPermission = async function (): Promise<string[]> {
  const response = await client
    .get('me/permissions')
    .json<ApiResult<string[]>>();
  return response.data;
};

export function getMeKey() {
  return ['getMe'];
}
