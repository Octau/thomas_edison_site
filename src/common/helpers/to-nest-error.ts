import { set, get, FieldErrors, Field, ResolverOptions } from 'react-hook-form';

import { validateFieldsNatively } from './validate-fields-natively';

export const toNestError = <TFieldValues>(
  errors: FieldErrors,
  //@ts-ignore
  options: ResolverOptions<TFieldValues>,
  //@ts-ignore
): FieldErrors<TFieldValues> => {
  options.shouldUseNativeValidation && validateFieldsNatively(errors, options);

  //@ts-ignore
  const fieldErrors = {} as FieldErrors<TFieldValues>;
  for (const path in errors) {
    const field = get(options.fields, path) as Field['_f'] | undefined;

    set(
      fieldErrors,
      path,
      //@ts-ignore
      Object.assign(errors[path], { ref: field && field.ref }),
    );
  }

  return fieldErrors;
};
