import { SelectItem } from '@mantine/core';
import { useGetUser, useGetUsers } from 'api-hooks/user';
import { UserLiteModel, UserModel } from 'api-hooks/user/model';
import { Input } from 'components/elements/field';
import useSelectInputHelper from 'hooks/use-select-input-helper';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  required?: boolean;
  disabled?: boolean;
  onAfterChange?: (value: { extradata: UserModel }) => void;
}

function transformer(item: UserLiteModel | UserModel): SelectItem {
  return {
    value: item.id,
    label: item.name,
    extradata: item,
  };
}

export default function UserSelectInput(props: Props) {
  const { t } = useTranslation();
  const { name, required, disabled } = props;
  const { control } = useFormContext<any>();
  const { field } = useController({ control, name: props.name });

  const selectProps = useSelectInputHelper({
    value: field.value,
    onSelectItem: (value) => {
      field.onChange(value);
    },
    useListQueryHook: useGetUsers,
    useDetailLazyQueryHook: useGetUser,
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
      label={t('menu:user')}
      required={required}
      disabled={disabled}
      {...selectProps}
    />
  );
}
