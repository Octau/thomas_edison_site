import { useFormContext, useWatch } from 'react-hook-form';

export default function HOCWatchValue(props: { keys: string[] }) {
  const { keys } = props;
  const { control } = useFormContext();
  const arrValues = useWatch({ name: keys, control });

  const objValues = arrValues.reduce(
    (prev, next, idx) => ({
      ...prev,
      [keys[idx]]: next,
    }),
    {},
  );
  return objValues;
}
