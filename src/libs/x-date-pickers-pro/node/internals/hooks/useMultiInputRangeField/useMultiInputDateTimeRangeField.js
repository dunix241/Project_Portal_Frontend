"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMultiInputDateTimeRangeField = exports.useDefaultizedDateTimeRangeFieldProps = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
var _DateTimeField = require("@mui/x-date-pickers/DateTimeField");
var _internals = require("@mui/x-date-pickers/internals");
var _validateDateTimeRange = require("../../utils/validation/validateDateTimeRange");
var _valueManagers = require("../../utils/valueManagers");
var _shared = require("./shared");
const useDefaultizedDateTimeRangeFieldProps = props => {
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
exports.useDefaultizedDateTimeRangeFieldProps = useDefaultizedDateTimeRangeFieldProps;
const useMultiInputDateTimeRangeField = ({
  sharedProps: inSharedProps,
  startTextFieldProps,
  startInputRef,
  unstableStartFieldRef,
  endTextFieldProps,
  endInputRef,
  unstableEndFieldRef
}) => {
  const sharedProps = useDefaultizedDateTimeRangeFieldProps(inSharedProps);
  const adapter = (0, _internals.useLocalizationContext)();
  const {
    value: valueProp,
    defaultValue,
    format,
    shouldRespectLeadingZeros,
    timezone: timezoneProp,
    onChange,
    disabled,
    readOnly,
    selectedSections,
    onSelectedSectionsChange
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
        validationError: (0, _validateDateTimeRange.validateDateTimeRange)({
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
  }), _validateDateTimeRange.validateDateTimeRange, _valueManagers.rangeValueManager.isSameError, _valueManagers.rangeValueManager.defaultErrorState);
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
    onChange: handleStartDateChange,
    selectedSections,
    onSelectedSectionsChange
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
    onChange: handleEndDateChange,
    selectedSections,
    onSelectedSectionsChange
  });
  const startDateResponse = (0, _DateTimeField.unstable_useDateTimeField)({
    props: startFieldProps,
    inputRef: startInputRef
  });
  const endDateResponse = (0, _DateTimeField.unstable_useDateTimeField)({
    props: endFieldProps,
    inputRef: endInputRef
  });

  /* TODO: Undo this change when a clearable behavior for multiple input range fields is implemented */
  return {
    startDate: (0, _shared.excludeProps)(startDateResponse, ['clearable', 'onClear']),
    endDate: (0, _shared.excludeProps)(endDateResponse, ['clearable', 'onClear'])
  };
};
exports.useMultiInputDateTimeRangeField = useMultiInputDateTimeRangeField;