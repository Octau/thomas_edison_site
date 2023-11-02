import { TransactionMutationInput } from 'api-hooks/transaction';
import { TrashIcon } from 'common/assets';
import notification from 'common/helpers/notification';
import { string2money } from 'common/utils/string';
import Divider from 'components/common/divider';
import HOCInput from 'components/common/hoc-input';
import Separator from 'components/common/separator';
import { ActionIcon } from 'components/elements/button';
import { Input } from 'components/elements/field';
import Text from 'components/elements/text';
import CustomerSelectInput from 'modules/customer/components/select-input';
import { moduleStyles } from 'modules/styles.css';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
} from 'react-hook-form';

import CartItem from './cart-item';
import { totalCalculation } from './total-calculation';
import { cashierStyle } from '../style.css';

interface Props {
  fields: FieldArrayWithId<TransactionMutationInput, 'items', 'customId'>[];
  remove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<TransactionMutationInput, 'items'>;
}

export default function CartCard(props: Props) {
  const { t } = useTranslation();
  const { fields, remove } = props;

  const onRemove = (index: number) => remove(index);

  const _priceOnChange = (value: number | undefined, minPrice: number) => {
    if (value === minPrice) {
      notification.error({
        message: `Harga jual kurang dari harga jual minimum`,
      });
    }
  };

  return (
    <div className={moduleStyles.card}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Separator direction="vertical" gap={16}>
          <Text textVariant="HeadingSmall">{t('cashier:cart')}</Text>
        </Separator>
        <Separator gap={8} direction="vertical">
          <CustomerSelectInput name="customerId" />
          <Divider orientation="horizontal" thickness={1} color="grey" />
        </Separator>
        <div className={cashierStyle.cartItemRow}>
          <CartItem flexBasis={36}>
            <Text textVariant="BodyBoldDefault">{t('common:number')}</Text>
          </CartItem>
          <CartItem flex={2}>
            <Text textVariant="BodyBoldDefault">{t('common:name')}</Text>
          </CartItem>
          <CartItem flex={3}>
            <Text textVariant="BodyBoldDefault">
              {t('inventory:sell_price')}
            </Text>
          </CartItem>
          <CartItem flex={2}>
            <Text textVariant="BodyBoldDefault">{t('common:qty')}</Text>
          </CartItem>
          <CartItem flex={2}>
            <Text textVariant="BodyBoldDefault">{t('common:total')}</Text>
          </CartItem>
          <CartItem flexBasis={30}>
            <div style={{ width: 36 }} />
          </CartItem>
        </div>
        {fields.map((item, idx) => (
          <div key={item.customId} className={cashierStyle.cartItemRow}>
            <CartItem flexBasis={36}>
              <Text>{idx + 1}</Text>
            </CartItem>
            <CartItem noMinHeight flex={2}>
              <Text>{item.inventoryName}</Text>
            </CartItem>
            <CartItem flex={3} noMinHeight>
              <Input
                type="number"
                name={`items.${idx}.price`}
                min={item.minPrice}
                onAfterChange={(value) => {
                  _priceOnChange(value, item.minPrice);
                }}
                noMargin
                isMoneyFormat
              />
            </CartItem>
            <CartItem flex={2} noMinHeight>
              <Input
                type="number"
                name={`items.${idx}.qty`}
                max={item.max}
                noMargin
              />
            </CartItem>
            <HOCInput keys={[`items.${idx}.qty`, `items.${idx}.price`]}>
              {(val) => (
                <CartItem flex={2} justify="flex-end" noMinHeight>
                  <Text>{`Rp ${string2money(
                    val[`items.${idx}.price`] * val[`items.${idx}.qty`],
                  )}`}</Text>
                </CartItem>
              )}
            </HOCInput>
            <CartItem flexBasis={30} noMinHeight>
              <ActionIcon
                variant="transparent"
                color="red"
                onClick={() => onRemove(idx)}
                children={(size) => <TrashIcon {...{ size }} />}
              />
            </CartItem>
          </div>
        ))}
        <Separator direction="vertical" gap={8}>
          <div className={cashierStyle.cartItemRow}>
            <CartItem flex={2} justify="flex-end">
              <Text textVariant="BodyBoldDefault">{t('common:total')}</Text>
              <Separator gap={8} />
              <HOCInput keys={['items']}>
                {({ items }) => (
                  <Text>{`Rp ${string2money(
                    totalCalculation({ fields: items }),
                  )}`}</Text>
                )}
              </HOCInput>
            </CartItem>
            <CartItem flexBasis={36} children={<div style={{ width: 36 }} />} />
          </div>
        </Separator>

        <CartItem justify="flex-end">
          <Input type="submit" text={t('cashier:checkout')} hideIcon />
        </CartItem>
      </div>
    </div>
  );
}
