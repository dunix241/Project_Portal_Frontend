import { UseMultiInputDateRangeFieldParams } from '../../../MultiInputDateRangeField/MultiInputDateRangeField.types';
import type { UseMultiInputRangeFieldResponse } from './useMultiInputRangeField.types';
export declare const useMultiInputDateRangeField: <TDate, TTextFieldSlotProps extends {}>({ sharedProps: inSharedProps, startTextFieldProps, startInputRef, unstableStartFieldRef, endTextFieldProps, endInputRef, unstableEndFieldRef, }: UseMultiInputDateRangeFieldParams<TDate, TTextFieldSlotProps>) => UseMultiInputRangeFieldResponse<TTextFieldSlotProps>;
