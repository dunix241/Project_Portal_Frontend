"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMultiInputTimeRangeField = exports.useDefaultizedTimeRangeFieldProps = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
var _TimeField = require("@mui/x-date-pickers/TimeField");
var _internals = require("@mui/x-date-pickers/internals");
var _validateTimeRange = require("../../utils/validation/validateTimeRange");
var _valueManagers = require("../../utils/valueManagers");
var _shared = require("./shared");
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
const useMultiInputTimeRangeField = ({
  sharedProps: inSharedProps,
  startTextFieldProps,
  startInputRef,
  unstableStartFieldRef,
  endTextFieldProps,
  endInputRef,
  unstableEndFieldRef
}) => {
  const sharedProps = useDefaultizedTimeRangeFieldProps(inSharedProps);
  const adapter = (0, _internals.useLocalizationContext)();
  const {
    value: valueProp,
    defaultValue,
    format,
    shouldRespectLeadingZeros,
    timezone: timezoneProp,
    onChange,
    disabled,
    readOnly
  } = sharedProps;
  const {
    value,
    handleValueChange,
    timezone
  } = (0, _internals.useControlledValueWithTimezone)({
    name: 'useMultiInputDateRangeField',
    timezone: timezoneProp,
    value: valueProp,
    defaultValue,
    onChange,
    valueManager: _valueManagers.rangeValueManager
  });

  // TODO: Maybe export utility from `useField` instead of copy/pasting the logic
  const buildChangeHandler = index => {
    return (newDate, rawContext) => {
      const newDateRange = index === 0 ? [newDate, value[1]] : [value[0], newDate];
      const context = (0, _extends2.default)({}, rawContext, {
        validationError: (0, _validateTimeRange.validateTimeRange)({
          adapter,
          value: newDateRange,
          props: (0, _extends2.default)({}, sharedProps, {
            timezone
          })
        })
      });
      handleValueChange(newDateRange, context);
    };
  };
  const handleStartDateChange = (0, _useEventCallback.default)(buildChangeHandler(0));
  const handleEndDateChange = (0, _useEventCallback.default)(buildChangeHandler(1));
  const validationError = (0, _internals.useValidation)((0, _extends2.default)({}, sharedProps, {
    value,
    timezone
  }), _validateTimeRange.validateTimeRange, _valueManagers.rangeValueManager.isSameError, _valueManagers.rangeValueManager.defaultErrorState);
  const startFieldProps = (0, _extends2.default)({
    error: !!validationError[0]
  }, startTextFieldProps, {
    format,
    shouldRespectLeadingZeros,
    disabled,
    readOnly,
    timezone,
    unstableFieldRef: unstableStartFieldRef,
    value: valueProp === undefined ? undefined : valueProp[0],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[0],
    onChange: handleStartDateChange
  });
  const endFieldProps = (0, _extends2.default)({
    error: !!validationError[1]
  }, endTextFieldProps, {
    format,
    shouldRespectLeadingZeros,
    disabled,
    readOnly,
    timezone,
    unstableFieldRef: unstableEndFieldRef,
    value: valueProp === undefined ? undefined : valueProp[1],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[1],
    onChange: handleEndDateChange
  });
  const startDateResponse = (0, _TimeField.unstable_useTimeField)({
    props: startFieldProps,
    inputRef: startInputRef
  });
  const endDateResponse = (0, _TimeField.unstable_useTimeField)({
    props: endFieldProps,
    inputRef: endInputRef
  });

  /* TODO: Undo this change when a clearable behavior for multiple input range fields is implemented */
  return {
    startDate: (0, _shared.excludeProps)(startDateResponse, ['clearable', 'onClear']),
    endDate: (0, _shared.excludeProps)(endDateResponse, ['clearable', 'onClear'])
  };
};
exports.useMultiInputTimeRangeField = useMultiInputTimeRangeField;