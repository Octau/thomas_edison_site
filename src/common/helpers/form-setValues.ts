import { FieldValues, UseFormSetValue } from 'react-hook-form';

function formSetValues<T extends FieldValues>(
  values: { [key: string]: any },
  setValue: UseFormSetValue<T>,
) {
  Object.entries(values).map((value: any[]) => {
    setValue(value[0], value[1], { shouldTouch: true, shouldValidate: true });
  });
}

export default formSetValues;
