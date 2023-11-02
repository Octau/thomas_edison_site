export type InputType =
  | 'color-swatch'
  | 'text'
  | 'password'
  | 'checkbox'
  | 'submit'
  | 'radio-group'
  | 'select'
  | 'select-multi'
  | 'phone'
  | 'number'
  | 'date'
  | 'date-range'
  | 'time'
  | 'tel'
  | 'email'
  | 'file'
  | 'files'
  | 'text-area';

export interface BaseElementInputProps {
  type: InputType;
  name: string;
  readOnly?: boolean;
}
