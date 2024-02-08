import * as React from 'react';
import { LocalizedComponent } from '@mui/x-date-pickers/locales';
import { DefaultizedProps, BaseDateValidationProps, BasePickerInputProps, PickerViewRendererLookup, UncapitalizeObjectKeys } from '@mui/x-date-pickers/internals';
import { DateRangeValidationError } from '../models';
import { DateRange } from '../internals/models';
import { DateRangeCalendarSlotsComponent, DateRangeCalendarSlotsComponentsProps, ExportedDateRangeCalendarProps } from '../DateRangeCalendar';
import { DateRangePickerToolbarProps, ExportedDateRangePickerToolbarProps } from './DateRangePickerToolbar';
import { DateRangeViewRendererProps } from '../dateRangeViewRenderers';
export interface BaseDateRangePickerSlotsComponent<TDate> extends DateRangeCalendarSlotsComponent<TDate> {
    /**
     * Custom component for the toolbar rendered above the views.
     * @default DateTimePickerToolbar
     */
    Toolbar?: React.JSXElementConstructor<DateRangePickerToolbarProps<TDate>>;
}
export interface BaseDateRangePickerSlotsComponentsProps<TDate> extends DateRangeCalendarSlotsComponentsProps<TDate> {
    toolbar?: ExportedDateRangePickerToolbarProps;
}
export interface BaseDateRangePickerProps<TDate> extends Omit<BasePickerInputProps<DateRange<TDate>, TDate, 'day', DateRangeValidationError>, 'view' | 'views' | 'openTo' | 'onViewChange' | 'orientation'>, ExportedDateRangeCalendarProps<TDate>, BaseDateValidationProps<TDate> {
    /**
     * Overridable components.
     * @default {}
     * @deprecated Please use `slots`.
     */
    components?: BaseDateRangePickerSlotsComponent<TDate>;
    /**
     * The props used for each component slot.
     * @default {}
     * @deprecated Please use `slotProps`.
     */
    componentsProps?: BaseDateRangePickerSlotsComponentsProps<TDate>;
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: UncapitalizeObjectKeys<BaseDateRangePickerSlotsComponent<TDate>>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: BaseDateRangePickerSlotsComponentsProps<TDate>;
    /**
     * Define custom view renderers for each section.
     * If `null`, the section will only have field editing.
     * If `undefined`, internally defined view will be the used.
     */
    viewRenderers?: Partial<PickerViewRendererLookup<DateRange<TDate>, 'day', DateRangeViewRendererProps<TDate, 'day'>, {}>>;
}
type UseDateRangePickerDefaultizedProps<TDate, Props extends BaseDateRangePickerProps<TDate>> = LocalizedComponent<TDate, DefaultizedProps<Props, keyof BaseDateValidationProps<TDate>>>;
export declare function useDateRangePickerDefaultizedProps<TDate, Props extends BaseDateRangePickerProps<TDate>>(props: Props, name: string): UseDateRangePickerDefaultizedProps<TDate, Omit<Props, 'components' | 'componentsProps'>>;
export {};
