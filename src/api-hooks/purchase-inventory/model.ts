import { InventoryLiteModel } from 'api-hooks/inventory/model';
import { SupplierLiteModel } from 'api-hooks/supplier/model';
import { Expose, Type } from 'class-transformer';
import { CommonParamInput } from 'common/repositories/common.model';

// Model
export class PurchaseInventoryItemModel {
  type: 'add' | 'new';

  @Type(() => InventoryLiteModel)
  item: InventoryLiteModel;
}

export class PurchaseInventoryLiteModel {
  id: string;
  code: string;

  @Type(() => SupplierLiteModel)
  supplier: SupplierLiteModel;

  @Type(() => PurchaseInventoryItemModel)
  items: PurchaseInventoryItemModel[];

  @Expose({ name: 'total_price' })
  @Type(() => Number)
  totalPrice: number;

  @Expose({ name: 'created_at' })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: 'transaction_at' })
  @Type(() => Date)
  transactionAt: Date;
}

export class PurchaseInventoryModel extends PurchaseInventoryLiteModel {}

// Input

export type getPurchaseInventoriesInput = {
  params?: CommonParamInput;
};

export type getPurchaseInventoryInput = {
  id: string;
};

export type PurchaseInventoryItemInput = {
  type: 'new' | 'add';
  item: {
    id?: string;
    name: string;
    buyPrice: number;
    sellPrice: number;
    qty: {
      amount: number;
      type: string;
    };
  };
};

export type PurchaseInventoryMutationInput = {
  items: PurchaseInventoryItemInput[];
  totalPrice: number;
  supplierId: string | null;
  transactionAt: Date;
};
