import { Loader } from '@mantine/core';
import {
  ColumnDef,
  ExpandedState,
  Row,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import classNames from 'classnames';
import { ChevronDownIcon, ChevronUpIcon } from 'common/assets';
import Separator from 'components/common/separator';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import { tableStyles } from './styles.css';
import Text from '../text';

export type IColumn<T> = ColumnDef<T> & {
  sortName?: string;
  stickyLeft?: boolean;
  stickyRight?: boolean;
  noPadding?: boolean;
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
  isNumber?: boolean;
};

interface Props<T> {
  data: T;
  isLoading?: boolean;
  emptyMessage?: string;
  columns: ColumnDef<any>[];
  renderRowSubComponent?: ({ row }: { row: Row<any> }) => React.ReactNode;
  headerColor?: string;
  showBorder?: boolean;
  onRowClick?: (value: { original: any; index: number }) => void;
  selectedRow?: number;
  onRenderAdditionalComponent?: React.ReactNode;
  onRenderBottom?: React.ReactNode;
  uniqueRowKey?: string;
  defaultExpanded?: boolean;
}

export default function TableComponent<T>(props: Props<T>) {
  const { t } = useTranslation();
  const {
    isLoading,
    emptyMessage = t('error:no_result_found'),
    columns,
    data: _data,
    renderRowSubComponent,
    headerColor,
    showBorder,
    selectedRow,
    onRenderAdditionalComponent,
    onRenderBottom,
    uniqueRowKey,
    defaultExpanded,
  } = props;
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [isExpanded, setIsExpanded] = React.useState(false);

  const data: any = _data;

  const table = useReactTable({
    data,
    columns,
    getSubRows: (row) => row.subRows,
    columnResizeMode: 'onChange',
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { getRowModel, getHeaderGroups } = table;
  const rows: Row<any>[] = getRowModel().rows;
  const headerGroups = getHeaderGroups();

  const _noData = React.useMemo(() => !rows.length, [rows.length]);

  React.useEffect(() => {
    if (defaultExpanded && !!rows.length && !isExpanded) {
      const _temp: { [key: number]: boolean } = {};
      rows.map((_, idx) => {
        _temp[idx] = true;
      });
      setExpanded(_temp);
      setIsExpanded(true);
    }
  }, [defaultExpanded, isExpanded, rows]);

  return (
    <div className={tableStyles.tableRootContainer}>
      <div
        className={classNames(
          'table-component',
          tableStyles.tableContainer({ showBorder: false }),
        )}
      >
        <div
          className={tableStyles.table}
          {...{
            style: {
              width: table.getTotalSize(),
            },
          }}
        >
          <div className={tableStyles.stickyThead}>
            {headerGroups?.map((headerGroup, idx) => (
              <div
                className={tableStyles.stickyTopTr}
                key={headerGroup.id || `table-header-${idx}`}
              >
                {headerGroup.headers.map((header, columnIdx) => {
                  const column: any = header.column.columnDef;
                  return (
                    <div
                      className={tableStyles.th({
                        left: column.stickyLeft,
                        right: column.stickyRight,
                        showRightBorder: false,
                      })}
                      key={`${headerGroup.id}-${column.header}-${columnIdx}`}
                      {...{
                        style: {
                          position:
                            column.stickyRight || column.stickyLeft
                              ? 'sticky'
                              : 'relative',
                          width: header.getSize(),
                          maxWidth: column.maxSize,
                          minWidth: column.minSize,
                          backgroundColor: headerColor,
                        },
                      }}
                    >
                      <div
                        className={tableStyles.headerContainer}
                        onClick={() => {
                          column.sortName &&
                            column.getToggleSortingHandler &&
                            column.getToggleSortingHandler(column);
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          maxWidth: column.maxSize,
                          minWidth: column.minSize,
                          cursor: column.sortName ? 'pointer' : 'default',
                        }}
                      >
                        <Text textVariant="BodyBoldDefault">
                          {flexRender(column.header, header.getContext())}
                        </Text>
                        {column.isSorted ? (
                          <div className={tableStyles.sortContainer}>
                            {column.isSortedDesc ? (
                              <ChevronDownIcon size={16} />
                            ) : (
                              <ChevronUpIcon size={16} />
                            )}
                          </div>
                        ) : null}
                      </div>
                      <div
                        className={classNames(
                          tableStyles.resizeBorder,
                          `${
                            header.column.getIsResizing() ? 'isResizing' : ''
                          }`,
                        )}
                        {...{
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className={tableStyles.tbody}>
            {!_noData && (
              <>
                {rows.length ? (
                  <>
                    {rows?.map((row, i) => {
                      const key = uniqueRowKey ? row.original[uniqueRowKey] : i;
                      return (
                        <React.Fragment key={key}>
                          <div
                            className={tableStyles.tr()}
                            onClick={() =>
                              props.onRowClick &&
                              props.onRowClick({
                                original: row.original,
                                index: row.index,
                              })
                            }
                            style={{
                              cursor: props.onRowClick ? 'pointer' : 'default',
                              backgroundColor:
                                i === selectedRow ? '#f5f7f9' : '#FFFFFF',
                            }}
                          >
                            {row?.getVisibleCells().map((cell, cellIdx) => {
                              const cellColumn: any = cell.column.columnDef;
                              const { textAlign, isNumber }: any = cellColumn;
                              const content = (
                                <Text
                                  textVariant="BodyDefault"
                                  align={isNumber ? 'right' : textAlign}
                                  style={{
                                    width: '100%',
                                  }}
                                  className={tableStyles.text}
                                >
                                  {flexRender(
                                    cellColumn.cell,
                                    cell.getContext(),
                                  )}
                                </Text>
                              );
                              if (
                                cellColumn.stickyLeft ||
                                cellColumn.stickyRight
                              ) {
                                return (
                                  <div
                                    key={`cell-${i}-${cellIdx}`}
                                    className={tableStyles.stickyTd({
                                      showRightBorder: showBorder,
                                      left: cellColumn.stickyLeft,
                                      right: cellColumn.stickyRight,
                                    })}
                                    style={{
                                      ...(cellColumn.noPadding
                                        ? {
                                            padding: 0,
                                          }
                                        : {}),
                                      width: cell.column.getSize(),
                                      ...(row.getIsExpanded()
                                        ? { backgroundColor: '#F0EDFE' }
                                        : {}),
                                    }}
                                  >
                                    {content}
                                  </div>
                                );
                              }

                              return (
                                <div
                                  className={tableStyles.td({
                                    showRightBorder: showBorder,
                                  })}
                                  key={`cell-${i}-${cellIdx}`}
                                  style={{
                                    ...(cellColumn.noPadding
                                      ? {
                                          padding: 0,
                                        }
                                      : {}),
                                    width: cell.column.getSize(),
                                    ...(row.getIsExpanded()
                                      ? { backgroundColor: '#F0EDFE' }
                                      : {}),
                                  }}
                                >
                                  {content}
                                </div>
                              );
                            })}
                          </div>
                          {row.getIsExpanded() &&
                            renderRowSubComponent &&
                            renderRowSubComponent({ row })}
                        </React.Fragment>
                      );
                    })}
                  </>
                ) : (
                  <div className={tableStyles.noDataContainer}>
                    {isLoading ? (
                      <Loader color="blue" />
                    ) : (
                      <div className={tableStyles.emptyViewContainer}>
                        <Separator gap={32} direction="vertical" />
                        <Text textVariant="BodyDefault">{emptyMessage}</Text>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
            {onRenderAdditionalComponent}
          </div>
        </div>
        {!onRenderAdditionalComponent && _noData && (
          <div className={tableStyles.noDataContainer}>
            {isLoading ? (
              <Loader color="blue" />
            ) : (
              <div className={tableStyles.emptyViewContainer}>
                <Separator gap={32} direction="vertical" />
                <Text textVariant="BodyDefault">{emptyMessage}</Text>
              </div>
            )}
          </div>
        )}
        {onRenderBottom}
      </div>
    </div>
  );
}
