import { PurchaseInventoryMutationInput } from 'api-hooks/purchase-inventory/model';
import Separator from 'components/common/separator';
import { Button } from 'components/elements/button';
import { useFormState } from 'components/elements/form';
import useDialog from 'hooks/use-dialog';
import GeneralTableList from 'modules/common/table';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import PIAddItemDialog from './add-item-dialog';
import { PurchaseInventoryItemColumns } from './item-table-column';

export default function PurchaseInventoryItemField() {
  const { t } = useTranslation();
  const { control } = useFormContext<PurchaseInventoryMutationInput>();
  const { editable } = useFormState();
  const dialog = useDialog();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
    keyName: 'customId',
  });

  const columns = PurchaseInventoryItemColumns({ t, editable, remove });

  const onAdd = () =>
    dialog.showCustom({
      render: (dismiss) => (
        <PIAddItemDialog append={append} onClose={dismiss} />
      ),
    });

  return (
    <>
      <GeneralTableList columns={columns} data={fields} uniqueKey="customId" />
      <Separator gap={16} />
      {editable && <Button onClick={onAdd}>{t('common:add')}</Button>}
    </>
  );
}
