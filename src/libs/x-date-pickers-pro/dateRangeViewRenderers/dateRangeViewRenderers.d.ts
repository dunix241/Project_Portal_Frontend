import * as React from 'react';
import { DateOrTimeViewWithMeridiem } from '@mui/x-date-pickers/internals/models';
import { DateRangeCalendarProps } from '../DateRangeCalendar';
export interface DateRangeViewRendererProps<TDate, TView extends DateOrTimeViewWithMeridiem> extends DateRangeCalendarProps<TDate> {
    view: TView;
    onViewChange?: (view: TView) => void;
    views: readonly TView[];
}
/**
 * We don't pass all the props down to `DateRangeCalendar`,
 * because otherwise some unwanted props would be passed to the HTML element.
 */
export declare const renderDateRangeViewCalendar: <TDate extends unknown>({ value, defaultValue, referenceDate, onChange, className, classes, disableFuture, disablePast, minDate, maxDate, shouldDisableDate, reduceAnimations, onMonthChange, defaultCalendarMonth, rangePosition, defaultRangePosition, onRangePositionChange, calendars, currentMonthCalendarPosition, components, componentsProps, slots, slotProps, loading, renderLoading, disableHighlightToday, readOnly, disabled, showDaysOutsideCurrentMonth, dayOfWeekFormatter, disableAutoMonthSwitching, sx, autoFocus, fixedWeekNumber, disableDragEditing, displayWeekNumber, timezone, }: DateRangeViewRendererProps<TDate, any>) => React.JSX.Element;
