import * as React from 'react';
import { SingleInputDateTimeRangeFieldProps } from './SingleInputDateTimeRangeField.types';
type DateRangeFieldComponent = (<TDate>(props: SingleInputDateTimeRangeFieldProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
    fieldType?: string;
};
/**
 * Demos:
 *
 * - [DateTimeRangeField](http://mui.com/x/react-date-pickers/date-time-range-field/)
 * - [Fields](https://mui.com/x/react-date-pickers/fields/)
 *
 * API:
 *
 * - [SingleInputDateTimeRangeField API](https://mui.com/x/api/single-input-date-time-range-field/)
 */
declare const SingleInputDateTimeRangeField: DateRangeFieldComponent;
export { SingleInputDateTimeRangeField };
