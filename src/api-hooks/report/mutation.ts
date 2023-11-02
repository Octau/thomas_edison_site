import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import { MutationFetchFunction } from 'common/helpers/common';
import { ApiError } from 'common/repositories/common.model';

import { ExportMutationInput } from './model';

export function useExport(
  options?: UseMutationOptions<any, ApiError, ExportMutationInput>,
): UseMutationResult<any, ApiError, ExportMutationInput> {
  return useMutation<any, ApiError, ExportMutationInput>(async function (
    _body,
  ) {
    const { params, type, body } = _body;
    return await MutationFetchFunction({
      url: `reports/get-${type}/export`,
      method: 'POST',
      params,
      body,
    });
  },
  options);
}
