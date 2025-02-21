import _extends from "@babel/runtime/helpers/esm/extends";
import { useUtils, useField, applyDefaultDate, useDefaultDates, splitFieldInternalAndForwardedProps } from '@mui/x-date-pickers/internals';
import { rangeValueManager, rangeFieldValueManager } from '../internals/utils/valueManagers';
import { validateDateTimeRange } from '../internals/utils/validation/validateDateTimeRange';
export const useDefaultizedTimeRangeFieldProps = props => {
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const ampm = props.ampm ?? utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.keyboardDateTime12h : utils.formats.keyboardDateTime24h;
  return _extends({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? defaultFormat,
    minDate: applyDefaultDate(utils, props.minDateTime ?? props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, props.maxDateTime ?? props.maxDate, defaultDates.maxDate),
    minTime: props.minDateTime ?? props.minTime,
    maxTime: props.maxDateTime ?? props.maxTime,
    disableIgnoringDatePartForTimeValidation: Boolean(props.minDateTime || props.maxDateTime)
  });
};
export const useSingleInputDateTimeRangeField = ({
  props: inProps,
  inputRef
}) => {
  const props = useDefaultizedTimeRangeFieldProps(inProps);
  const {
    forwardedProps,
    internalProps
  } = splitFieldInternalAndForwardedProps(props, 'date-time');
  return useField({
    inputRef,
    forwardedProps,
    internalProps,
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateDateTimeRange,
    valueType: 'date-time'
  });
};