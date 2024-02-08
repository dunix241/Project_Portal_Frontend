import * as React from 'react';
import { DesktopDateRangePickerProps } from './DesktopDateRangePicker.types';
type DesktopDateRangePickerComponent = (<TDate>(props: DesktopDateRangePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [DateRangePicker](https://mui.com/x/react-date-pickers/date-range-picker/)
 * - [Validation](https://mui.com/x/react-date-pickers/validation/)
 *
 * API:
 *
 * - [DesktopDateRangePicker API](https://mui.com/x/api/date-pickers/desktop-date-range-picker/)
 */
declare const DesktopDateRangePicker: DesktopDateRangePickerComponent;
export { DesktopDateRangePicker };
