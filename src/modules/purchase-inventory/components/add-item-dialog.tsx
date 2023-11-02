import { PurchaseInventoryMutationInput } from 'api-hooks/purchase-inventory/model';
import DefaultDialog from 'components/common/dialog/default-dialog';
import HOCInput from 'components/common/hoc-input';
import { Input } from 'components/elements/field';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import InventorySelectInput from 'modules/inventory/components/select-input';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { UseFieldArrayAppend, useForm } from 'react-hook-form';

import { PIItemSchema } from './form-type';

interface Props {
  append: UseFieldArrayAppend<PurchaseInventoryMutationInput, 'items'>;
  onClose: () => void;
}

export default function PIAddItemDialog(props: Props) {
  const { t } = useTranslation();
  const { append, onClose } = props;
  const defaultValues = {
    type: 'new',
    item: {
      name: '',
      buyPrice: 0,
      sellPrice: 0,
      minSellPrice: 0,
      amount: 0,
      type: 'pieces',
    },
  };

  const resolver = useYupValidationResolver(PIItemSchema);

  const methods = useForm({
    defaultValues,
    resolver,
    mode: 'onChange',
  });
  const { setValue } = methods;

  const onSetValue = ({ key, value }: { key: any; value: any }) =>
    setValue(key, value, { shouldTouch: true, shouldValidate: true });

  const onSubmit = (values) => {
    append(values);
    onClose();
  };

  return (
    <DefaultDialog onClose={onClose} title={t('common:add')}>
      <div style={{ minHeight: 300 }}>
        <Form methods={methods} onSubmit={onSubmit}>
          <Input
            type="select"
            name="type"
            label={t('common:type')}
            data={[
              { value: 'new', label: 'New Item' },
              { value: 'add', label: 'Update Item' },
            ]}
            onAfterChange={() => {
              onSetValue({ key: 'item.id', value: null });
              onSetValue({
                key: 'item.buyPrice',
                value: 0,
              });
              onSetValue({
                key: 'item.sellPrice',
                value: 0,
              });
              onSetValue({
                key: 'item.name',
                value: '',
              });
              onSetValue({
                key: 'item.qty',
                value: { amount: 0, type: 'pieces' },
              });
              onSetValue({
                key: 'item.minSellPrice',
                value: 0,
              });
              onSetValue({
                key: 'item.qty.amount',
                value: 0,
              });
            }}
          />
          <HOCInput keys={['type']}>
            {({ type }) =>
              type === 'add' ? (
                <>
                  <InventorySelectInput
                    name="item.id"
                    onAfterChange={(value) => {
                      onSetValue({
                        key: 'item.buyPrice',
                        value: value.extradata.buyPrice,
                      });
                      onSetValue({
                        key: 'item.sellPrice',
                        value: value.extradata.sellPrice,
                      });
                      onSetValue({
                        key: 'item.name',
                        value: value.extradata.name,
                      });
                      onSetValue({
                        key: 'item.qty',
                        value: { amount: 0, type: value.extradata.type },
                      });
                      onSetValue({
                        key: 'item.minSellPrice',
                        value: value.extradata.minSellPrice,
                      });
                    }}
                    required
                  />
                  <Input
                    type="number"
                    label={t('common:qty')}
                    name="item.amount"
                    required
                  />
                </>
              ) : (
                <>
                  <Input
                    type="text"
                    label={t('common:name')}
                    name="item.name"
                    required
                  />
                  <Input
                    type="text"
                    label={t('common:type')}
                    name="item.type"
                    required
                  />
                  <Input
                    type="number"
                    label={t('common:qty')}
                    name="item.amount"
                    required
                  />
                  <Input
                    type="number"
                    label={t('inventory:buy_price')}
                    name="item.buyPrice"
                    min={0}
                    isMoneyFormat
                    required
                  />
                  <Input
                    type="number"
                    label={t('inventory:min_sell_price')}
                    name="item.minSellPrice"
                    min={0}
                    isMoneyFormat
                    required
                  />
                  <Input
                    type="number"
                    label={t('inventory:sell_price')}
                    name="item.sellPrice"
                    min={0}
                    isMoneyFormat
                    required
                  />
                  {/* <Input
                    type="text"
                    name="item.note"
                    label={t('common:notes')}
                    required
                  /> */}
                </>
              )
            }
          </HOCInput>
          <Input type="submit" text={t('common:add')} />
        </Form>
      </div>
    </DefaultDialog>
  );
}
