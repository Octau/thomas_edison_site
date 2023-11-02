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

import { UserLiteModel, UserModel, getUserInput, getUsersInput } from './model';

export const userKey = {
  getUsersKey: ['getUsers'],
  getUserKey: ['getUser'],
  getUsers: (input?: getUsersInput) => [userKey.getUsersKey[0], input?.params],
  getUser: (input?: getUserInput) => [userKey.getUserKey[0], input?.id],
};

export function useGetUsers(
  input?: getUsersInput,
  options?: UseQueryOptions<ExtendedApiResult<UserLiteModel[]>, ApiError>,
): UseQueryResult<ExtendedApiResult<UserLiteModel[]>, ApiError> {
  return QueryTransformer(
    useQuery(
      userKey.getUsers(input),
      () => QueryFetchFunction({ url: 'users', params: input?.params }),
      options,
    ),
    UserLiteModel,
  );
}

export function useGetUser(
  input?: getUserInput,
  options?: UseQueryOptions<ApiResult<UserModel>, ApiError>,
): UseQueryResult<ApiResult<UserModel>, ApiError> {
  return QueryTransformer(
    useQuery(
      userKey.getUser(input),
      () =>
        QueryFetchFunction({
          url: `users/${input?.id}`,
        }),
      options,
    ),
    UserModel,
  );
}
