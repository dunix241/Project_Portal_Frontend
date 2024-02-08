import * as React from 'react';
import { MultiInputTimeRangeFieldProps } from './MultiInputTimeRangeField.types';
import { MultiInputRangeFieldClasses } from '../models';
export declare const multiInputTimeRangeFieldClasses: MultiInputRangeFieldClasses;
export declare const getMultiInputTimeRangeFieldUtilityClass: (slot: string) => string;
type MultiInputTimeRangeFieldComponent = (<TDate>(props: MultiInputTimeRangeFieldProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [TimeRangeField](http://mui.com/x/react-date-pickers/time-range-field/)
 * - [Fields](https://mui.com/x/react-date-pickers/fields/)
 *
 * API:
 *
 * - [MultiInputTimeRangeField API](https://mui.com/x/api/multi-input-time-range-field/)
 */
declare const MultiInputTimeRangeField: MultiInputTimeRangeFieldComponent;
export { MultiInputTimeRangeField };
