import * as React from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography, { TypographyProps } from '@mui/material/Typography';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { SlotComponentProps } from '@mui/base/utils';
import { BaseSingleInputFieldProps } from '@mui/x-date-pickers/models';
import { DateOrTimeViewWithMeridiem } from '@mui/x-date-pickers/internals/models';
import { PickersInputLocaleText } from '@mui/x-date-pickers/locales';
import { BaseFieldProps, UsePickerResponse, WrapperVariant, UncapitalizeObjectKeys, UsePickerProps, FieldSlotsComponents, FieldSlotsComponentsProps } from '@mui/x-date-pickers/internals';
import { BaseMultiInputFieldProps, DateRange, RangeFieldSection, RangePosition, UseDateRangeFieldProps } from '../models';
import { UseRangePositionResponse } from './useRangePosition';
export interface RangePickerFieldSlotsComponent extends FieldSlotsComponents {
    Field: React.ElementType;
    /**
     * Element rendered at the root.
     * Ignored if the field has only one input.
     */
    FieldRoot?: React.ElementType<StackProps>;
    /**
     * Element rendered between the two inputs.
     * Ignored if the field has only one input.
     */
    FieldSeparator?: React.ElementType<TypographyProps>;
    /**
     * Form control with an input to render a date or time inside the default field.
     * It is rendered twice: once for the start element and once for the end element.
     * Receives the same props as `@mui/material/TextField`.
     * @default TextField from '@mui/material'
     */
    TextField?: React.ElementType<TextFieldProps>;
}
export interface RangePickerFieldSlotsComponentsProps<TDate> extends FieldSlotsComponentsProps {
    field?: SlotComponentProps<React.ElementType<BaseMultiInputFieldProps<DateRange<TDate>, TDate, RangeFieldSection, unknown>>, {}, UsePickerProps<DateRange<TDate>, TDate, any, RangeFieldSection, any, any, any>>;
    fieldRoot?: SlotComponentProps<typeof Stack, {}, Record<string, any>>;
    fieldSeparator?: SlotComponentProps<typeof Typography, {}, Record<string, any>>;
    textField?: SlotComponentProps<typeof TextField, {}, UseDateRangeFieldProps<TDate> & {
        position?: RangePosition;
    }>;
}
export interface UseEnrichedRangePickerFieldPropsParams<TDate, TView extends DateOrTimeViewWithMeridiem, TError, FieldProps extends BaseFieldProps<DateRange<TDate>, TDate, RangeFieldSection, TError> = BaseFieldProps<DateRange<TDate>, TDate, RangeFieldSection, TError>> extends Pick<UsePickerResponse<DateRange<TDate>, TView, RangeFieldSection, any>, 'open' | 'actions'>, UseRangePositionResponse {
    wrapperVariant: WrapperVariant;
    fieldType: 'single-input' | 'multi-input';
    readOnly?: boolean;
    labelId?: string;
    disableOpenPicker?: boolean;
    onBlur?: () => void;
    inputRef?: React.Ref<HTMLInputElement>;
    label?: React.ReactNode;
    localeText: PickersInputLocaleText<TDate> | undefined;
    pickerSlotProps: RangePickerFieldSlotsComponentsProps<TDate> | undefined;
    pickerSlots: UncapitalizeObjectKeys<RangePickerFieldSlotsComponent> | undefined;
    fieldProps: FieldProps;
    anchorRef?: React.Ref<HTMLDivElement>;
}
export declare const useEnrichedRangePickerFieldProps: <TDate, TView extends DateOrTimeViewWithMeridiem, TError>(params: UseEnrichedRangePickerFieldPropsParams<TDate, TView, TError, BaseFieldProps<DateRange<TDate>, TDate, RangeFieldSection, TError>>) => BaseMultiInputFieldProps<DateRange<TDate>, TDate, RangeFieldSection, TError> | BaseSingleInputFieldProps<DateRange<TDate>, TDate, RangeFieldSection, TError>;
