import * as React from 'react';
import { SingleInputDateRangeFieldProps } from './SingleInputDateRangeField.types';
type DateRangeFieldComponent = (<TDate>(props: SingleInputDateRangeFieldProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
    fieldType?: string;
};
/**
 * Demos:
 *
 * - [DateRangeField](http://mui.com/x/react-date-pickers/date-range-field/)
 * - [Fields](https://mui.com/x/react-date-pickers/fields/)
 *
 * API:
 *
 * - [SingleInputDateRangeField API](https://mui.com/x/api/single-input-date-range-field/)
 */
declare const SingleInputDateRangeField: DateRangeFieldComponent;
export { SingleInputDateRangeField };
