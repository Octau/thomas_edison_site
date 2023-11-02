import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { QueryFetchFunction, QueryTransformer } from 'common/helpers/common';
import { ApiError, ExtendedApiResult } from 'common/repositories/common.model';

import { AuditLiteModel, getActivitiesInput } from './model';

export function getActivities(input?: getActivitiesInput) {
  return ['getActivities', input?.id, input?.params];
}

export function useGetActivities(
  input?: getActivitiesInput,
  options?: UseQueryOptions<ExtendedApiResult<AuditLiteModel[]>, ApiError>,
): UseQueryResult<ExtendedApiResult<AuditLiteModel[]>, ApiError> {
  return QueryTransformer(
    useQuery(
      getActivities(input),
      () =>
        QueryFetchFunction({
          url: `get-activities/${input?.id}`,
          params: input?.params,
        }),
      options,
    ),
    AuditLiteModel,
  );
}
