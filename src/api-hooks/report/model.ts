import { CommonParamInput } from 'common/repositories/common.model';

// Enum
export enum ExportTypeEnum {
  purchases = 'purchases',
  transactions = 'transactions',
}

// Model
export class ExportLiteModel {}

// Input
export type getExportInput = {
  params?: CommonParamInput;
};

export type ExportMutationInput = {
  type: ExportTypeEnum;
  params?: CommonParamInput;
  body?: {
    [keys: string]: any;
  };
};
