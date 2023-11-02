import { Translate } from 'next-translate';
import * as Yup from 'yup';
import { AnyObject } from 'yup/lib/types';

// Perlu merupakan sebuah fungsi karena jika langsung dibuat sekarang ia akan menggunakan Locale Yup yang lama
export const FileSchema = () =>
  Yup.object().shape({
    id: Yup.string(),
    file: Yup.string().nullable().required(),
    url: Yup.string().nullable().strip(true),
  });

export const FilesSchema = () => Yup.array().of(FileSchema().required());

export const DateNotBeforeTodaySchema = (t: Translate) =>
  Yup.date()
    .required()
    .test(
      'today_test',
      t('error:must_not_be_before_today', {
        extra: t('common:start_date'),
      }),
      function (value) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return !!value && value >= today;
      },
    );

// comparedWith is the name of the input to be compared with
export const DateMustBeAfterSchema = (t: Translate, comparedWith: string) =>
  Yup.date()
    .required()
    .test(
      'dates_test',
      t('error:must_be_after', {
        first: t('common:end_date'),
        second: t('common:start_date'),
      }),
      function (value) {
        const startAt = this.parent[comparedWith];
        return value && startAt && startAt < value;
      },
    );

export function testPasswordConfirmation<
  T extends Yup.StringSchema<string | null | undefined, AnyObject>,
>(t: Translate, schema: T): T {
  return schema.test(
    'password_confirmation_must_match',
    t('error:password_confirmation_must_match'),
    (value, context) => {
      return !value || value === context.parent.password;
    },
  );
}
