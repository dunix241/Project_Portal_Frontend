import * as React from 'react';
import { BaseToolbarProps, ExportedBaseToolbarProps } from '@mui/x-date-pickers/internals';
import { DateRange } from '../internals/models';
import { UseRangePositionResponse } from '../internals/hooks/useRangePosition';
import { DateRangePickerToolbarClasses } from './dateRangePickerToolbarClasses';
export interface DateRangePickerToolbarProps<TDate> extends Omit<BaseToolbarProps<DateRange<TDate>, 'day'>, 'views' | 'view' | 'onViewChange' | 'onChange' | 'isLandscape'>, Pick<UseRangePositionResponse, 'rangePosition' | 'onRangePositionChange'> {
    classes?: Partial<DateRangePickerToolbarClasses>;
}
export interface ExportedDateRangePickerToolbarProps extends ExportedBaseToolbarProps {
}
/**
 * Demos:
 *
 * - [DateRangePicker](https://mui.com/x/react-date-pickers/date-range-picker/)
 * - [Custom components](https://mui.com/x/react-date-pickers/custom-components/)
 *
 * API:
 *
 * - [DateRangePickerToolbar API](https://mui.com/x/api/date-pickers/date-range-picker-toolbar/)
 */
declare const DateRangePickerToolbar: React.ForwardRefExoticComponent<DateRangePickerToolbarProps<unknown> & React.RefAttributes<HTMLDivElement>>;
export { DateRangePickerToolbar };
