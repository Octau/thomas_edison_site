import {
  Filter,
  FilterBehaviour,
  FilterType,
} from 'common/repositories/common.model';
import { Button } from 'components/elements/button';
import Checkbox from 'components/elements/checkbox';
import DatePicker from 'components/elements/date-picker';
import NumberInput from 'components/elements/number-input';
import RadioGroup from 'components/elements/radio';
import Text from 'components/elements/text';
import TextInput from 'components/elements/text-input';
import produce from 'immer';
import useTranslation from 'next-translate/useTranslation';
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from 'styles/Filter.module.css';

import { queryFilterContext } from './query-filter.context';

export function isEmpty(value: any): boolean {
  return value === undefined || value === null || value === '';
}

interface FilterControlOptionInputProps {
  filter: Filter;
  value?: string;
  onChange: (value: string) => void;
}

const Delimeter = ', ';

function FilterControlOptionInput(props: FilterControlOptionInputProps) {
  const { filter, value, onChange } = props;
  const options = (filter?.options || []).map((item) => ({
    ...item,
    value: item.value.toString(),
  }));
  switch (filter.behaviour) {
    case FilterBehaviour.Multiple:
      // eslint-disable-next-line no-case-declarations
      const setsValue = new Set(value ? value.split(Delimeter) : []);
      return (
        <div>
          {options!.map((option) => (
            <div key={option.value} style={optionStyle}>
              <Checkbox
                checked={setsValue.has(option.value)}
                label={option.label}
                onChange={(e) => {
                  const checked = (e?.target as any)?.checked;

                  if (checked) {
                    setsValue.add(option.value);
                  } else {
                    setsValue.delete(option.value);
                  }
                  onChange(Array.from(setsValue).join(Delimeter));
                }}
              />
            </div>
          ))}
        </div>
      );
    case FilterBehaviour.Single:
    default:
      return (
        <RadioGroup
          value={value}
          onChange={(val) => onChange(val)}
          data={options || []}
          orientation="vertical"
        />
      );
  }
}

export default function FilterControlInput(props: {
  filter: Filter;
  setPage: Dispatch<SetStateAction<number>>;
  onRequestClose: () => void;
}) {
  const { filter, onRequestClose, setPage } = props;
  const { setFilters } = useContext(queryFilterContext);
  const initialValue =
    filter.value ||
    (filter.type === FilterType.Date ? new Date().toISOString() : undefined);

  const [value, setValue] = useState<string | undefined>(initialValue);
  const [minPrice, setMinPrice] = useState<string | undefined>();
  const [maxPrice, setMaxPrice] = useState<string | undefined>();
  const { t } = useTranslation();

  useEffect(() => {
    if (minPrice?.length && maxPrice?.length) {
      setValue(`${minPrice},${maxPrice}`);
    } else {
      setValue(undefined);
    }
  }, [minPrice, maxPrice]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onRequestClose();
        if (value !== undefined && value !== null) {
          setFilters((prevFilters) =>
            produce(prevFilters, (draft) => {
              const matchedFilter = draft?.find((f) => f.name === filter.name);
              if (matchedFilter) {
                matchedFilter.value = value;
              }
            }),
          );
          setPage(1);
        }
      }}
      className={styles.form}
    >
      <div className={styles.formContent}>
        {(() => {
          switch (filter.type) {
            case FilterType.Text:
              return (
                <TextInput
                  value={value}
                  onChange={(e) => setValue((e?.target as any)?.value)}
                  placeholder={t('common:filter_exact_placeholder')}
                />
              );
            case FilterType.Option:
              return (
                <FilterControlOptionInput
                  filter={filter}
                  value={value}
                  onChange={setValue}
                />
              );
            case FilterType.Date:
              return (
                <div className={styles.center}>
                  <DatePicker
                    value={value ? new Date(value) : undefined}
                    defaultValue={null}
                    placeholder="dd MMM yyyy"
                    onChange={(date) => {
                      setValue(date?.toISOString());
                    }}
                  />
                </div>
              );
            case FilterType.Number:
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <NumberInput
                    value={parseFloat((minPrice || '').toString())}
                    onChange={(value) => setMinPrice(value?.toString())}
                    placeholder={t('common:filter_min_price')}
                    isMoneyFormat
                  />
                  <Text textVariant="BodyBoldSmaller">s/d</Text>
                  <NumberInput
                    value={parseFloat((maxPrice || '').toString())}
                    onChange={(value) => setMaxPrice(value?.toString())}
                    placeholder={t('common:filter_max_price')}
                    isMoneyFormat
                  />
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
      <div style={applyButtonStyle}>
        <Button disabled={isEmpty(value)} type="submit">
          {t('common:apply')}
        </Button>
      </div>
    </form>
  );
}

const applyButtonStyle: CSSProperties = {
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
};

const optionStyle: CSSProperties = {
  marginTop: 4,
  marginBottom: 4,
};
