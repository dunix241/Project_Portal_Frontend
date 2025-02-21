"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSingleInputDateRangeField = exports.useDefaultizedDateRangeFieldProps = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _internals = require("@mui/x-date-pickers/internals");
var _valueManagers = require("../internals/utils/valueManagers");
var _validateDateRange = require("../internals/utils/validation/validateDateRange");
const useDefaultizedDateRangeFieldProps = props => {
  const utils = (0, _internals.useUtils)();
  const defaultDates = (0, _internals.useDefaultDates)();
  return (0, _extends2.default)({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? utils.formats.keyboardDate,
    minDate: (0, _internals.applyDefaultDate)(utils, props.minDate, defaultDates.minDate),
    maxDate: (0, _internals.applyDefaultDate)(utils, props.maxDate, defaultDates.maxDate)
  });
};
exports.useDefaultizedDateRangeFieldProps = useDefaultizedDateRangeFieldProps;
const useSingleInputDateRangeField = ({
  props: inProps,
  inputRef
}) => {
  const props = useDefaultizedDateRangeFieldProps(inProps);
  const {
    forwardedProps,
    internalProps
  } = (0, _internals.splitFieldInternalAndForwardedProps)(props, 'date');
  return (0, _internals.useField)({
    inputRef,
    forwardedProps,
    internalProps,
    valueManager: _valueManagers.rangeValueManager,
    fieldValueManager: _valueManagers.rangeFieldValueManager,
    validator: _validateDateRange.validateDateRange,
    valueType: 'date'
  });
};
exports.useSingleInputDateRangeField = useSingleInputDateRangeField;