import ButtonField, { ButtonFieldProps } from './button';
import CheckboxField, { CheckboxFieldProps } from './checkbox';
import ColorSwatchField, { ColorSwatchFieldProps } from './color-swatch';
import DatePickerField, { DatePickerInputFieldProps } from './date-picker';
import DateRangePickerField, {
  DateRangePickerFieldProps,
} from './date-range-picker';
import DateTimePickerField, {
  DateTimePickerFieldProps,
} from './date-time-picker';
import MultiSelectField, { MultiSelectFieldProps } from './multi-select';
import NumberInputField, {
  MoneyInputFieldProps,
  NumberInputFieldProps,
} from './number-input';
import PasswordInputField, { PasswordInputFieldProps } from './password-input';
import RadioGroupField, { RadioGroupFieldProps } from './radio';
import SelectField, { SelectFieldProps } from './select';
import SwitchField, { SwitchFieldProps } from './switch';
import TextareaInputField, { TextareaInputFieldProps } from './text-area-input';
import TextInputField, { TextInputFieldProps } from './text-input';
import TimeInputField, { TimeInputFieldProps } from './time-input';

export function Input(
  props:
    | ColorSwatchFieldProps
    | ButtonFieldProps
    | TextInputFieldProps
    | CheckboxFieldProps
    | DatePickerInputFieldProps
    | DateRangePickerFieldProps
    | MultiSelectFieldProps
    | MoneyInputFieldProps
    | NumberInputFieldProps
    | PasswordInputFieldProps
    | RadioGroupFieldProps
    | SelectFieldProps
    | SwitchFieldProps
    | DateTimePickerFieldProps
    | TimeInputFieldProps
    | TextareaInputFieldProps,
) {
  switch (props.type) {
    case 'checkbox':
      return <CheckboxField {...props} />;
    case 'date':
      return <DatePickerField {...props} />;
    case 'date-time':
      return <DateTimePickerField {...props} />;
    case 'date-range':
      return <DateRangePickerField {...props} />;
    case 'money':
      return (
        <NumberInputField
          isMoneyFormat
          hideControls
          precision={0}
          {...(props as unknown as NumberInputFieldProps)}
        />
      );
    case 'number':
      return <NumberInputField {...props} />;
    case 'password':
      return <PasswordInputField {...props} />;
    case 'radio-group':
      return <RadioGroupField {...props} />;
    case 'select':
      return <SelectField {...props} />;
    case 'select-multi':
      return <MultiSelectField {...props} />;
    case 'switch':
      return <SwitchField {...props} />;
    case 'time':
      return <TimeInputField {...props} />;
    case 'submit':
      return <ButtonField {...props} />;
    case 'color-swatch':
      return <ColorSwatchField {...props} />;
    case 'text-area':
      return <TextareaInputField {...props} />;
    default:
      return <TextInputField {...props} />;
  }
}
