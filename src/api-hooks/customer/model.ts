import { CommonParamInput } from 'common/repositories/common.model';

// Model

export class CustomerLiteModel {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export class CustomerModel extends CustomerLiteModel {}

// Input

export type getCustomersInput = {
  params?: CommonParamInput;
};

export type getCustomerInput = {
  id: string;
};

export type CustomerMutationInput = {
  name: string;
  address: string;
  phone: string;
};

export type CustomerUpdateInput = {
  id: string;
  body: CustomerMutationInput;
};

export type CustomerDeleteInput = {
  id: string;
};
