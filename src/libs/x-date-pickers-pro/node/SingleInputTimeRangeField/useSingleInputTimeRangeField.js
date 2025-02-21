"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSingleInputTimeRangeField = exports.useDefaultizedTimeRangeFieldProps = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _internals = require("@mui/x-date-pickers/internals");
var _valueManagers = require("../internals/utils/valueManagers");
var _validateTimeRange = require("../internals/utils/validation/validateTimeRange");
const useDefaultizedTimeRangeFieldProps = props => {
  const utils = (0, _internals.useUtils)();
  const ampm = props.ampm ?? utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.fullTime12h : utils.formats.fullTime24h;
  return (0, _extends2.default)({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? defaultFormat
  });
};
exports.useDefaultizedTimeRangeFieldProps = useDefaultizedTimeRangeFieldProps;
const useSingleInputTimeRangeField = ({
  props: inProps,
  inputRef
}) => {
  const props = useDefaultizedTimeRangeFieldProps(inProps);
  const {
    forwardedProps,
    internalProps
  } = (0, _internals.splitFieldInternalAndForwardedProps)(props, 'time');
  return (0, _internals.useField)({
    inputRef,
    forwardedProps,
    internalProps,
    valueManager: _valueManagers.rangeValueManager,
    fieldValueManager: _valueManagers.rangeFieldValueManager,
    validator: _validateTimeRange.validateTimeRange,
    valueType: 'time'
  });
};
exports.useSingleInputTimeRangeField = useSingleInputTimeRangeField;