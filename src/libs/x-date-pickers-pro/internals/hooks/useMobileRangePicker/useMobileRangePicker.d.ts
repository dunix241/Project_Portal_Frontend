import * as React from 'react';
import { DateOrTimeViewWithMeridiem } from '@mui/x-date-pickers/internals/models';
import { UseMobileRangePickerParams, UseMobileRangePickerProps } from './useMobileRangePicker.types';
export declare const useMobileRangePicker: <TDate, TView extends DateOrTimeViewWithMeridiem, TExternalProps extends UseMobileRangePickerProps<TDate, TView, any, TExternalProps>>({ props, ...pickerParams }: UseMobileRangePickerParams<TDate, TView, TExternalProps>) => {
    renderPicker: () => React.JSX.Element;
};
