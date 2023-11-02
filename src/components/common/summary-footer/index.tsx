import { CancelIcon } from 'common/assets';
import { Button } from 'components/elements/button';
import { Input } from 'components/elements/field';
import { FormState } from 'components/elements/form';
import { moduleStyles } from 'modules/styles.css';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import { summaryFooterStyles } from './styles.css';
import Separator from '../separator';

interface Props {
  onRenderLeft?: React.ReactNode;
  data?: unknown;
  onCancel?: () => void;
  onRenderRight?: React.ReactNode;
}

export default function FormSummaryFooter(props: Props) {
  const { t } = useTranslation();
  const { onRenderLeft, onCancel, data, onRenderRight } = props;
  const {
    formState: { isSubmitting },
    reset,
  } = useFormContext<any>();

  return (
    <div className={summaryFooterStyles.summaryContent}>
      <div>{onRenderLeft}</div>
      <FormState>
        {({ editable, setIsEditable }) => (
          <div className={moduleStyles.row()}>
            {onRenderRight}
            {editable && !data && !isSubmitting ? (
              <Separator gap={16} direction="horizontal">
                <Button
                  variant="secondary"
                  leftIcon={(size) => <CancelIcon width={size} height={size} />}
                  error
                  onClick={() => {
                    reset();
                    setIsEditable(false);
                    onCancel?.();
                  }}
                >
                  {t('common:cancel')}
                </Button>
              </Separator>
            ) : (
              <></>
            )}
            <Input
              type="submit"
              className={summaryFooterStyles.wideWhenSmall}
            />
          </div>
        )}
      </FormState>
    </div>
  );
}
