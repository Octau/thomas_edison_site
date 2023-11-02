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
  CustomerLiteModel,
  CustomerModel,
  getCustomerInput,
  getCustomersInput,
} from './model';

export function getCustomersKey(input?: getCustomersInput) {
  return ['getCustomers', input?.params];
}

export function getCustomerKey(input?: getCustomerInput) {
  return ['getCustomer', input?.id];
}

export function useGetCustomers(
  input?: getCustomersInput,
  options?: UseQueryOptions<ExtendedApiResult<CustomerLiteModel[]>, ApiError>,
): UseQueryResult<ExtendedApiResult<CustomerLiteModel[]>, ApiError> {
  return QueryTransformer(
    useQuery(
      getCustomersKey(input),
      () => QueryFetchFunction({ url: 'customers', params: input?.params }),
      options,
    ),
    CustomerLiteModel,
  );
}

export function useGetCustomer(
  input?: getCustomerInput,
  options?: UseQueryOptions<ApiResult<CustomerModel>, ApiError>,
): UseQueryResult<ApiResult<CustomerModel>, ApiError> {
  return QueryTransformer(
    useQuery(
      getCustomerKey(input),
      () =>
        QueryFetchFunction({
          url: `customers/${input?.id}`,
        }),
      options,
    ),
    CustomerModel,
  );
}
