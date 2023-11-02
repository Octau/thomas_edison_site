import { CancelIcon, EditIcon, TrashIcon } from 'common/assets';
import { isString } from 'common/utils/string';
import LoadingButton from 'components/common/loading-button';
import Button from 'components/elements/button/default';
import { Input } from 'components/elements/field';
import { FormState } from 'components/elements/form/context';
import Text from 'components/elements/text';
import { moduleStyles } from 'modules/styles.css';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';

interface FormHeaderProps {
  data?: any;
  onDelete?: () => void;
  title: string | React.ReactNode;
  isDeleteLoading?: boolean;
  submitComponent?: React.ReactNode;
  noDelete?: boolean;
  noSubmit?: boolean;
  noEdit?: boolean;
  noCancel?: boolean;
  onRenderComponent?: React.ReactNode;
  onRenderRightComponent?: React.ReactNode;
  onClickCancel?: () => void;
}

export default function FormHeader(props: FormHeaderProps) {
  const { t } = useTranslation();
  const {
    data,
    onDelete,
    title,
    isDeleteLoading,
    submitComponent,
    onRenderComponent,
    onRenderRightComponent,
    noDelete,
    noEdit,
    noCancel,
    noSubmit,
    onClickCancel,
  } = props;
  const {
    formState: { isSubmitting },
    reset,
  } = useFormContext<any>();
  return (
    <div className={moduleStyles.topFormContainer}>
      {isString(title) ? (
        <Text textVariant="HeadingSmall">{title}</Text>
      ) : (
        title
      )}
      <FormState>
        {({ editable, setIsEditable }) => (
          <div
            className={moduleStyles.buttonContainer}
            style={{ alignItems: 'center' }}
          >
            {onRenderComponent}
            {data && !noDelete && !editable && (
              <div className={moduleStyles.actionContainer}>
                <LoadingButton
                  onClick={onDelete}
                  isLoading={isDeleteLoading}
                  error
                  variant="secondary"
                  icon={(size) => <TrashIcon size={size} />}
                >
                  {t('common:delete')}
                </LoadingButton>
              </div>
            )}
            {data && !noEdit && (
              <>
                {editable || isSubmitting ? (
                  !noCancel ? (
                    <div className={moduleStyles.buttonContainer}>
                      <Button
                        onClick={() => {
                          reset();
                          setIsEditable(false);
                          onClickCancel?.();
                        }}
                        variant="secondary"
                        error
                        leftIcon={(size) => (
                          <CancelIcon width={size} height={size} />
                        )}
                      >
                        {t('common:cancel')}
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )
                ) : (
                  <div className={moduleStyles.buttonContainer}>
                    <Button onClick={() => setIsEditable(true)}>
                      <>
                        <div
                          className={moduleStyles.actionContainer}
                          style={{ marginRight: '8px' }}
                        >
                          <EditIcon size={20} color="white" />
                        </div>
                        {t('common:edit')}
                      </>
                    </Button>
                  </div>
                )}
              </>
            )}
            {onRenderRightComponent}
            {!noSubmit && (
              <FormState>
                {({ editable }) =>
                  isSubmitting || editable ? (
                    <div className={moduleStyles.buttonContainer}>
                      {submitComponent ? (
                        submitComponent
                      ) : (
                        <Input type="submit" />
                      )}
                    </div>
                  ) : (
                    <></>
                  )
                }
              </FormState>
            )}
          </div>
        )}
      </FormState>
    </div>
  );
}
