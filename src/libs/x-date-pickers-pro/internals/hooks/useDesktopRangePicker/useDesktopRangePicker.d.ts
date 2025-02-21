import * as React from 'react';
import { DateOrTimeViewWithMeridiem } from '@mui/x-date-pickers/internals/models';
import { UseDesktopRangePickerParams, UseDesktopRangePickerProps } from './useDesktopRangePicker.types';
export declare const useDesktopRangePicker: <TDate, TView extends DateOrTimeViewWithMeridiem, TExternalProps extends UseDesktopRangePickerProps<TDate, TView, any, TExternalProps>>({ props, ...pickerParams }: UseDesktopRangePickerParams<TDate, TView, TExternalProps>) => {
    renderPicker: () => React.JSX.Element;
};
