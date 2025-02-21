import { TimezoneProps } from '@mui/x-date-pickers/models';
import { Validator, BaseDateValidationProps, DefaultizedProps } from '@mui/x-date-pickers/internals';
import { DateRange, DayRangeValidationProps } from '../../models';
import { DateRangeValidationError } from '../../../models';
export interface DateRangeComponentValidationProps<TDate> extends DayRangeValidationProps<TDate>, Required<BaseDateValidationProps<TDate>>, DefaultizedProps<TimezoneProps, 'timezone'> {
}
export declare const validateDateRange: Validator<DateRange<any>, any, DateRangeValidationError, DateRangeComponentValidationProps<any>>;
