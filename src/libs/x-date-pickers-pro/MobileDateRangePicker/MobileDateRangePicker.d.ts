import * as React from 'react';
import { MobileDateRangePickerProps } from './MobileDateRangePicker.types';
type MobileDateRangePickerComponent = (<TDate>(props: MobileDateRangePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
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
 * - [MobileDateRangePicker API](https://mui.com/x/api/date-pickers/mobile-date-range-picker/)
 */
declare const MobileDateRangePicker: MobileDateRangePickerComponent;
export { MobileDateRangePicker };
