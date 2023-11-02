import { Expose, Type } from 'class-transformer';
import { CommonParamInput } from 'common/repositories/common.model';
import { string2money } from 'common/utils/string';

// Model

export class InventorySimpleModel {
  id: string;
  name: string;

  @Type(() => Number)
  price: number;
}

export class InventoryLiteModel {
  id: string;
  name: string;
  type: string;
  note?: string | null;

  @Type(() => Number)
  amount: number;

  @Expose({ name: 'buy_price' })
  @Type(() => Number)
  buyPrice: number;

  @Expose({ name: 'sell_price' })
  @Type(() => Number)
  sellPrice: number;

  @Expose({ name: 'min_sell_price' })
  @Type(() => Number)
  minSellPrice: number;

  get getSellPrice(): string {
    return 'Rp' + string2money(this.sellPrice);
  }

  get getMinSellPrice(): string {
    return 'Rp' + string2money(this.minSellPrice);
  }

  get getBuyPrice(): string {
    return 'Rp' + string2money(this.buyPrice);
  }
}

export class InventoryModel extends InventoryLiteModel {}

// Input

export type getInventoriesInput = {
  params?: CommonParamInput & {
    min_amount?: number;
  };
};

export type getInventoryInput = {
  id: string;
};

export type InventoryMutationInput = {
  name: string;
  amount: number;
  type: string;
  buyPrice: number;
  sellPrice: number;
  minSellPrice: number;
  note?: string | null;
};

export type InventoryUpdateInput = {
  id: string;
  body: InventoryMutationInput;
};

export type InventoryDeleteInput = {
  id: string;
};
