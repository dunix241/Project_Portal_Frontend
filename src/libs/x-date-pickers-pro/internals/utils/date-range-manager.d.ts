import { MuiPickersAdapter } from '@mui/x-date-pickers/models';
import { DateRange, RangePosition } from '../models/range';
interface CalculateRangeChangeOptions<TDate> {
    utils: MuiPickersAdapter<TDate>;
    range: DateRange<TDate>;
    newDate: TDate | null;
    rangePosition: RangePosition;
    /**
     * Should allow flipping range `start` and `end` dates if the `newDate` would result in a new range creation.
     *
     * It is used to allow dragging range `start` date past `end` date essentially becoming the new `end` date and vice versa.
     */
    allowRangeFlip?: boolean;
}
interface CalculateRangeChangeResponse<TDate> {
    nextSelection: RangePosition;
    newRange: DateRange<TDate>;
}
export declare function calculateRangeChange<TDate>({ utils, range, newDate: selectedDate, rangePosition, allowRangeFlip, }: CalculateRangeChangeOptions<TDate>): CalculateRangeChangeResponse<TDate>;
export declare function calculateRangePreview<TDate>(options: CalculateRangeChangeOptions<TDate>): DateRange<TDate>;
export {};
