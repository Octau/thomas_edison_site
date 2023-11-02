import { Expose, Type } from 'class-transformer';
import { CommonParamInput } from 'common/repositories/common.model';
import { string2money } from 'common/utils/string';

// Model

export class TransactionItemModel {
  inventory: { id: string; name: string };

  @Type(() => Number)
  qty: number;

  @Type(() => Number)
  price: number;

  get getPrice(): string {
    return 'Rp' + string2money(this.price);
  }
}

export class TransactionLiteModel {
  id: string;
  code: string;
  customer?: string | null;

  @Expose({ name: 'created_at' })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: 'total_price' })
  @Type(() => Number)
  totalPrice: number;
}

export class TransactionModel extends TransactionLiteModel {
  @Type(() => TransactionItemModel)
  items: TransactionItemModel[];
}

// Input

export type getTransactionsInput = {
  params?: CommonParamInput;
};

export type getTransactionInput = {
  id: string;
};

export type CartItemFormType = {
  inventoryId: string;
  inventoryName?: string;
  price: number;
  minPrice: number;
  qty: number;
  max: number;
};

export type TransactionMutationInput = {
  items: CartItemFormType[];
  totalPrice?: number;
  customerId?: string | null;
};

export type TransactionDeleteInput = {
  id: string;
};
