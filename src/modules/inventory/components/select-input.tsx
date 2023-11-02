import { SelectItem } from '@mantine/core';
import { useGetInventories, useGetInventory } from 'api-hooks/inventory';
import { InventoryLiteModel, InventoryModel } from 'api-hooks/inventory/model';
import { QueryTransformer } from 'common/helpers/common';
import { Input } from 'components/elements/field';
import useSelectInputHelper from 'hooks/use-select-input-helper';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  required?: boolean;
  disabled?: boolean;
  onAfterChange?: (value: { extradata: InventoryModel }) => void;
}

function transformer(item: InventoryLiteModel | InventoryModel): SelectItem {
  return {
    value: item.id,
    label: item.name,
    extradata: item,
  };
}

export default function InventorySelectInput(props: Props) {
  const { t } = useTranslation();
  const { name, required, disabled } = props;
  const { control } = useFormContext<any>();
  const { field } = useController({ control, name: props.name });

  const selectProps = useSelectInputHelper({
    value: field.value,
    onSelectItem: (value) => {
      field.onChange(value);
    },
    useListQueryHook: useGetInventories,
    useDetailLazyQueryHook: useGetInventory,
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
      const resultData = QueryTransformer(result, InventoryModel);
      props?.onAfterChange?.({ extradata: resultData.data });
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
      label={t('menu:inventory')}
      required={required}
      disabled={disabled}
      {...selectProps}
    />
  );
}
