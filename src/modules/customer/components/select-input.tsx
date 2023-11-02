import { SelectItem } from '@mantine/core';
import {
  CustomerLiteModel,
  CustomerModel,
  useGetCustomer,
  useGetCustomers,
} from 'api-hooks/customer';
import { Input } from 'components/elements/field';
import useSelectInputHelper from 'hooks/use-select-input-helper';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  required?: boolean;
  disabled?: boolean;
  onAfterChange?: (value: { extradata: CustomerModel }) => void;
}

function transformer(item: CustomerLiteModel | CustomerModel): SelectItem {
  return {
    value: item.id,
    label: item.name,
    extradata: item,
  };
}

export default function CustomerSelectInput(props: Props) {
  const { t } = useTranslation();
  const { name, required, disabled } = props;
  const { control } = useFormContext<any>();
  const { field } = useController({ control, name: props.name });

  const selectProps = useSelectInputHelper({
    value: field.value,
    onSelectItem: (value) => {
      field.onChange(value);
    },
    useListQueryHook: useGetCustomers,
    useDetailLazyQueryHook: useGetCustomer,
    getMemoizedListVariables: React.useCallback(
      (page, q) => ({
        params: {
          q,
          page,
        },
      }),
      [],
    ),
    renderCreate: false,
    getMemoizedDetailVariables: React.useCallback(
      (value: string) => ({
        id: value,
      }),
      [],
    ),
    listTransformer(result) {
      const list = result.data.map((v) => transformer(v));
      return list;
    },

    detailTransformer(result) {
      props?.onAfterChange?.({ extradata: result.data });
      return transformer(result.data);
    },
    paginationTransformer(result) {
      return result.meta;
    },
  });

  return (
    <Input
      type="select"
      name={name}
      label={t('menu:customer')}
      required={required}
      disabled={disabled}
      {...selectProps}
    />
  );
}
