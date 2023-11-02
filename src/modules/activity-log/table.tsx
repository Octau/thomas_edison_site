import { AuditLiteModel } from 'api-hooks/audit/model';
import { useGetActivities } from 'api-hooks/audit/query';
import { UserModel } from 'api-hooks/user';
import { IColumn } from 'components/elements/table';
import Text from 'components/elements/text';
import GeneralTableList from 'modules/common/table';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

interface Props {
  id: string;
}

export default function ActivityLogTable(props: Props) {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(15);

  const { data, error, isLoading, isRefetching } = useGetActivities(
    { params: { page, limit }, id: props.id },
    { enabled: !!props.id },
  );

  const columns = React.useMemo<IColumn<AuditLiteModel>[]>(
    () => [
      {
        accessorKey: 'createdAt',
        header: t('common:date'),
        minSize: 180,
        cell: ({ row: { original } }) => {
          return <Text>{original.getCreatedDate()}</Text>;
        },
      },
      {
        accessorKey: 'user',
        header: t('activity:created_by'),
        minSize: 150,
        cell: ({ getValue }) => {
          const user = getValue() as UserModel;
          return <Text>{user.name}</Text>;
        },
      },
      {
        accessorKey: 'changelogs',
        header: t('activity:changelog'),
        minSize: 400,
        cell: ({ getValue }) => {
          const changelogs = getValue() as string[];
          return (
            <div style={{ paddingLeft: 16 }}>
              <ul>
                {changelogs.map((changelog, index) => (
                  <li key={index}>
                    <Text>
                      <span dangerouslySetInnerHTML={{ __html: changelog }} />
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          );
        },
      },
      {
        accessorKey: 'description',
        header: t('common:action'),
        minSize: 150,
      },
    ],
    [t],
  );

  return (
    <GeneralTableList
      {...{
        data: data?.data || [],
        columns,
        isLoading: isLoading || isRefetching,
        error,
        page,
        limit,
        setLimit,
        setPage,
        meta: data?.meta,
      }}
    />
  );
}
