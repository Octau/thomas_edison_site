import { PHONEPREFIX } from 'common/global';

export const trimPhonePrefix = (phoneNumber: string) =>
  phoneNumber.substring(PHONEPREFIX.length, phoneNumber.length);
