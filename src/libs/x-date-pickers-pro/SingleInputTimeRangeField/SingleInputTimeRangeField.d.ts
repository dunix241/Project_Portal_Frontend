import * as React from 'react';
import { SingleInputTimeRangeFieldProps } from './SingleInputTimeRangeField.types';
type DateRangeFieldComponent = (<TDate>(props: SingleInputTimeRangeFieldProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
    fieldType?: string;
};
/**
 * Demos:
 *
 * - [TimeRangeField](http://mui.com/x/react-date-pickers/time-range-field/)
 * - [Fields](https://mui.com/x/react-date-pickers/fields/)
 *
 * API:
 *
 * - [SingleInputTimeRangeField API](https://mui.com/x/api/single-input-time-range-field/)
 */
declare const SingleInputTimeRangeField: DateRangeFieldComponent;
export { SingleInputTimeRangeField };
