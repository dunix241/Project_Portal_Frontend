"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSingleInputDateTimeRangeField = exports.useDefaultizedTimeRangeFieldProps = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _internals = require("@mui/x-date-pickers/internals");
var _valueManagers = require("../internals/utils/valueManagers");
var _validateDateTimeRange = require("../internals/utils/validation/validateDateTimeRange");
const useDefaultizedTimeRangeFieldProps = props => {
  const utils = (0, _internals.useUtils)();
  const defaultDates = (0, _internals.useDefaultDates)();
  const ampm = props.ampm ?? utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.keyboardDateTime12h : utils.formats.keyboardDateTime24h;
  return (0, _extends2.default)({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? defaultFormat,
    minDate: (0, _internals.applyDefaultDate)(utils, props.minDateTime ?? props.minDate, defaultDates.minDate),
    maxDate: (0, _internals.applyDefaultDate)(utils, props.maxDateTime ?? props.maxDate, defaultDates.maxDate),
    minTime: props.minDateTime ?? props.minTime,
    maxTime: props.maxDateTime ?? props.maxTime,
    disableIgnoringDatePartForTimeValidation: Boolean(props.minDateTime || props.maxDateTime)
  });
};
exports.useDefaultizedTimeRangeFieldProps = useDefaultizedTimeRangeFieldProps;
const useSingleInputDateTimeRangeField = ({
  props: inProps,
  inputRef
}) => {
  const props = useDefaultizedTimeRangeFieldProps(inProps);
  const {
    forwardedProps,
    internalProps
  } = (0, _internals.splitFieldInternalAndForwardedProps)(props, 'date-time');
  return (0, _internals.useField)({
    inputRef,
    forwardedProps,
    internalProps,
    valueManager: _valueManagers.rangeValueManager,
    fieldValueManager: _valueManagers.rangeFieldValueManager,
    validator: _validateDateTimeRange.validateDateTimeRange,
    valueType: 'date-time'
  });
};
exports.useSingleInputDateTimeRangeField = useSingleInputDateTimeRangeField;