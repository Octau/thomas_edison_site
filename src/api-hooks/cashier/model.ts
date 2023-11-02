import { InventorySimpleModel } from 'api-hooks/inventory/model';
import { Expose, Type } from 'class-transformer';

// Model

export class TransactionItemModel {
  @Type(() => InventorySimpleModel)
  inventory: InventorySimpleModel;

  @Type(() => Number)
  qty: number;
}

export class TransactionLiteModel {
  id: string;
  code: string;

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
  params?: any;
};

export type getTransactionInput = {
  id: string;
};

export type CartItemType = {
  inventoryId: string;
  inventoryName?: string;
  price: number;
  qty: number;
};

export type CashierCartMutationInput = {
  items: CartItemType[];
  totalPrice?: number;
};
