import formSetErrors from 'common/helpers/form-setError';
import notification from 'common/helpers/notification';
import { UseFormSetError } from 'react-hook-form';

export function handleError(e: any, formSetError?: UseFormSetError<any>) {
  if (e.errors && formSetError) {
    formSetErrors(e.errors, formSetError);
  }
  if (e.message) {
    notification.error({ message: e.message });
  } else {
    console.error(e);
  }
}
