import { ExportTypeEnum } from 'api-hooks/report/model';
import { useExport } from 'api-hooks/report/mutation';
import { ExportIcon } from 'common/assets';
import filterReduce from 'common/helpers/filter-reduce';
import notification from 'common/helpers/notification';
import { CommonParamInput, Filter } from 'common/repositories/common.model';
import { Button } from 'components/elements/button';
import { format } from 'date-fns';
import * as FileSaver from 'file-saver';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

interface Props {
  type: ExportTypeEnum;
  params?: Omit<CommonParamInput, 'filter'>;
  filters?: Filter[];
}

function dataURLtoFile(dataurl, filename) {
  // eslint-disable-next-line prefer-const
  let arr = dataurl.split(','),
    // eslint-disable-next-line prefer-const
    mime = arr[0].match(/:(.*?);/)[1],
    // eslint-disable-next-line prefer-const
    bstr = atob(arr[1]),
    n = bstr.length,
    // eslint-disable-next-line prefer-const
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export function useExportDownloader() {
  const { mutateAsync, isLoading } = useExport();

  const exportFile = async (props: Props) => {
    try {
      const result = await mutateAsync({
        type: props.type,
        params: {
          ...props.params,
          filter: props.filters
            ? (filterReduce(props.filters) as any)
            : undefined,
        },
      });
      const exportName = `report-${props.type}-${format(
        new Date(),
        'dd-MMM-yyyy-HH-mm-ss',
      )}`;
      if (result) {
        const resultFile = dataURLtoFile(result, exportName);
        FileSaver.saveAs(resultFile, exportName);
      }
    } catch (error) {
      notification.error({ message: error.message });
    }
  };

  return { exportFile, isLoading };
}

export default function ExportButton(props: Props) {
  const { t } = useTranslation();
  const { exportFile, isLoading } = useExportDownloader();

  const onDownload = async () => await exportFile(props);

  return (
    <Button
      onClick={onDownload}
      leftIcon={(size) => <ExportIcon size={size} />}
      variant="secondary"
      loading={isLoading}
    >
      {t('common:export')}
    </Button>
  );
}
