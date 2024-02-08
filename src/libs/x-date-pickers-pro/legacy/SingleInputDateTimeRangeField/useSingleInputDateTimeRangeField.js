import _extends from "@babel/runtime/helpers/esm/extends";
import { useUtils, useField, applyDefaultDate, useDefaultDates, splitFieldInternalAndForwardedProps } from '@mui/x-date-pickers/internals';
import { rangeValueManager, rangeFieldValueManager } from '../internals/utils/valueManagers';
import { validateDateTimeRange } from '../internals/utils/validation/validateDateTimeRange';
export var useDefaultizedTimeRangeFieldProps = function useDefaultizedTimeRangeFieldProps(props) {
  var _props$ampm, _props$disablePast, _props$disableFuture, _props$format, _props$minDateTime, _props$maxDateTime, _props$minDateTime2, _props$maxDateTime2;
  var utils = useUtils();
  var defaultDates = useDefaultDates();
  var ampm = (_props$ampm = props.ampm) != null ? _props$ampm : utils.is12HourCycleInCurrentLocale();
  var defaultFormat = ampm ? utils.formats.keyboardDateTime12h : utils.formats.keyboardDateTime24h;
  return _extends({}, props, {
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    format: (_props$format = props.format) != null ? _props$format : defaultFormat,
    minDate: applyDefaultDate(utils, (_props$minDateTime = props.minDateTime) != null ? _props$minDateTime : props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, (_props$maxDateTime = props.maxDateTime) != null ? _props$maxDateTime : props.maxDate, defaultDates.maxDate),
    minTime: (_props$minDateTime2 = props.minDateTime) != null ? _props$minDateTime2 : props.minTime,
    maxTime: (_props$maxDateTime2 = props.maxDateTime) != null ? _props$maxDateTime2 : props.maxTime,
    disableIgnoringDatePartForTimeValidation: Boolean(props.minDateTime || props.maxDateTime)
  });
};
export var useSingleInputDateTimeRangeField = function useSingleInputDateTimeRangeField(_ref) {
  var inProps = _ref.props,
    inputRef = _ref.inputRef;
  var props = useDefaultizedTimeRangeFieldProps(inProps);
  var _splitFieldInternalAn = splitFieldInternalAndForwardedProps(props, 'date-time'),
    forwardedProps = _splitFieldInternalAn.forwardedProps,
    internalProps = _splitFieldInternalAn.internalProps;
  return useField({
    inputRef: inputRef,
    forwardedProps: forwardedProps,
    internalProps: internalProps,
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateDateTimeRange,
    valueType: 'date-time'
  });
};