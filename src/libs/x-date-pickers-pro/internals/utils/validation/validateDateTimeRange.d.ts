import { TimezoneProps } from '@mui/x-date-pickers/models';
import { Validator, BaseDateValidationProps, TimeValidationProps, DefaultizedProps } from '@mui/x-date-pickers/internals';
import { DayRangeValidationProps } from '../../models/dateRange';
import { DateRange } from '../../models/range';
import { DateTimeRangeValidationError } from '../../../models';
export interface DateTimeRangeComponentValidationProps<TDate> extends DayRangeValidationProps<TDate>, TimeValidationProps<TDate>, Required<BaseDateValidationProps<TDate>>, DefaultizedProps<TimezoneProps, 'timezone'> {
}
export declare const validateDateTimeRange: Validator<DateRange<any>, any, DateTimeRangeValidationError, DateTimeRangeComponentValidationProps<any>>;
