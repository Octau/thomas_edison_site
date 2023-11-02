import { Popover } from '@mantine/core';
import { ChevronLeftIcon } from 'common/assets';
import { Filter } from 'common/repositories/common.model';
import { ActionIcon } from 'components/elements/button';
import Text from 'components/elements/text';
import useTranslation from 'next-translate/useTranslation';
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import styles from 'styles/Filter.module.css';

import FilterControlInput from './filter-control-input';
import { queryFilterContext } from './query-filter.context';
import { queryFilterStyles } from './style.css';

interface FilterControlProps {
  name?: string;
  setPage: Dispatch<SetStateAction<number>>;
  children: (toggleFilter: () => void) => ReactElement;
}

function FilterControlContent(props: {
  setIsOpen: (open: boolean) => void;
  initialName?: string;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const { t } = useTranslation();
  const { filters } = useContext(queryFilterContext);

  const [selectedKey, selectKey] = useState<string | undefined>(
    props.initialName,
  );

  const selectedFilter = useMemo<Filter | undefined>(
    () =>
      selectedKey ? filters.find((f) => f.name === selectedKey) : undefined,
    [filters, selectedKey],
  );

  return (
    <div className={styles.container}>
      <div className={styles.filterHeader}>
        <div
          className={queryFilterStyles.actionContainer}
          style={{ maxWidth: 40 }}
        >
          {selectedKey && (
            <ActionIcon
              variant="transparent"
              onClick={() => selectKey(undefined)}
            >
              {(size) => <ChevronLeftIcon size={size} />}
            </ActionIcon>
          )}
        </div>
        <Text textVariant="BodyDefault" className={styles.title}>
          {selectedFilter?.label || t('common:filter_by')}
        </Text>
        <div
          style={{ maxWidth: 40 }}
          className={queryFilterStyles.actionContainer}
        />
      </div>
      <div className={styles.content}>
        {selectedFilter ? (
          <FilterControlInput
            filter={selectedFilter}
            onRequestClose={() => props.setIsOpen(false)}
            setPage={props.setPage}
          />
        ) : (
          filters
            .filter((filter) => !filter.value)
            .map((filter) => (
              <Text
                textVariant="BodyDefault"
                key={filter.name}
                className={styles.optionItem}
                //@ts-ignore
                onClick={() => {
                  selectKey(filter.name);
                }}
              >
                {filter.label}
              </Text>
            ))
        )}
      </div>
    </div>
  );
}

export default function FilterControl(props: FilterControlProps) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((prevOpen) => !prevOpen);
  }

  return (
    <Popover opened={isOpen} onChange={setIsOpen}>
      <Popover.Target>{children(toggleOpen)}</Popover.Target>
      <Popover.Dropdown
        className={styles.mantinePopoverDropdown}
        style={style.popoverDropdown}
      >
        <FilterControlContent
          setIsOpen={setIsOpen}
          initialName={props.name}
          setPage={props.setPage}
        />
      </Popover.Dropdown>
    </Popover>
  );
}

const style = {
  popoverDropdown: {
    marginLeft: '16px',
    padding: 0,
  },
};
