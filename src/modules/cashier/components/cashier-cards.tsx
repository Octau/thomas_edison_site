import { TransactionMutationInput } from 'api-hooks/transaction';
import { moduleStyles } from 'modules/styles.css';
import * as React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import CartCard from './cart-card';
import InventoryListCard from './inventory-card';
import { cashierStyle } from '../style.css';

export default function CashierCards() {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<TransactionMutationInput>();
  const { fields, append, update, remove } = useFieldArray({
    name: 'items',
    control,
    keyName: 'customId',
  });

  return (
    <div className={cashierStyle.rootContainer}>
      <div className={moduleStyles.halfContainer}>
        <InventoryListCard {...{ fields, append, update }} />
      </div>
      <div className={moduleStyles.halfContainer}>
        {isSubmitting ? <></> : <CartCard {...{ fields, remove, update }} />}
      </div>
    </div>
  );
}
