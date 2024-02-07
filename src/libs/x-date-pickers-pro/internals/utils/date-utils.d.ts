import { MuiPickersAdapter } from '@mui/x-date-pickers/models';
import { DateRange, NonEmptyDateRange } from '../models/range';
export declare const isRangeValid: <TDate>(utils: MuiPickersAdapter<TDate, any>, range: DateRange<TDate> | null) => range is NonEmptyDateRange<TDate>;
export declare const isWithinRange: <TDate>(utils: MuiPickersAdapter<TDate, any>, day: TDate, range: DateRange<TDate> | null) => boolean;
export declare const isStartOfRange: <TDate>(utils: MuiPickersAdapter<TDate, any>, day: TDate, range: DateRange<TDate> | null) => boolean;
export declare const isEndOfRange: <TDate>(utils: MuiPickersAdapter<TDate, any>, day: TDate, range: DateRange<TDate> | null) => boolean;
