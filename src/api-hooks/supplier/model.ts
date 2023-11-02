import { Expose, Type } from 'class-transformer';
import { CommonParamInput } from 'common/repositories/common.model';

// Model

export class SupplierLiteModel {
  id: string;
  name: string;
  address: string;
  phone: string;

  @Expose({ name: 'is_active' })
  @Type(() => Boolean)
  isActive: boolean;
}

export class SupplierModel extends SupplierLiteModel {}

// Input

export type getSuppliersInput = {
  params?: CommonParamInput;
};

export type getSupplierInput = {
  supplierId: string;
};

export type SupplierMutationInput = {
  name: string;
  address: string;
  phone: string;
  // isActive: boolean;
};

export type SupplierUpdateInput = {
  supplierId: string;
  body: SupplierMutationInput;
};

export type SupplierDeleteInput = {
  supplierId: string;
};
