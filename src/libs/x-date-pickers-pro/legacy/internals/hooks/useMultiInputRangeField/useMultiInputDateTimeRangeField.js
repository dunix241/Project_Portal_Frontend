import _extends from "@babel/runtime/helpers/esm/extends";
import useEventCallback from '@mui/utils/useEventCallback';
import { unstable_useDateTimeField as useDateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { applyDefaultDate, useDefaultDates, useLocalizationContext, useUtils, useValidation, useControlledValueWithTimezone } from '@mui/x-date-pickers/internals';
import { validateDateTimeRange } from '../../utils/validation/validateDateTimeRange';
import { rangeValueManager } from '../../utils/valueManagers';
import { excludeProps } from './shared';
export var useDefaultizedDateTimeRangeFieldProps = function useDefaultizedDateTimeRangeFieldProps(props) {
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
export var useMultiInputDateTimeRangeField = function useMultiInputDateTimeRangeField(_ref) {
  var inSharedProps = _ref.sharedProps,
    startTextFieldProps = _ref.startTextFieldProps,
    startInputRef = _ref.startInputRef,
    unstableStartFieldRef = _ref.unstableStartFieldRef,
    endTextFieldProps = _ref.endTextFieldProps,
    endInputRef = _ref.endInputRef,
    unstableEndFieldRef = _ref.unstableEndFieldRef;
  var sharedProps = useDefaultizedDateTimeRangeFieldProps(inSharedProps);
  var adapter = useLocalizationContext();
  var valueProp = sharedProps.value,
    defaultValue = sharedProps.defaultValue,
    format = sharedProps.format,
    shouldRespectLeadingZeros = sharedProps.shouldRespectLeadingZeros,
    timezoneProp = sharedProps.timezone,
    onChange = sharedProps.onChange,
    disabled = sharedProps.disabled,
    readOnly = sharedProps.readOnly,
    selectedSections = sharedProps.selectedSections,
    onSelectedSectionsChange = sharedProps.onSelectedSectionsChange;
  var _useControlledValueWi = useControlledValueWithTimezone({
      name: 'useMultiInputDateRangeField',
      timezone: timezoneProp,
      value: valueProp,
      defaultValue: defaultValue,
      onChange: onChange,
      valueManager: rangeValueManager
    }),
    value = _useControlledValueWi.value,
    handleValueChange = _useControlledValueWi.handleValueChange,
    timezone = _useControlledValueWi.timezone;

  // TODO: Maybe export utility from `useField` instead of copy/pasting the logic
  var buildChangeHandler = function buildChangeHandler(index) {
    return function (newDate, rawContext) {
      var newDateRange = index === 0 ? [newDate, value[1]] : [value[0], newDate];
      var context = _extends({}, rawContext, {
        validationError: validateDateTimeRange({
          adapter: adapter,
          value: newDateRange,
          props: _extends({}, sharedProps, {
            timezone: timezone
          })
        })
      });
      handleValueChange(newDateRange, context);
    };
  };
  var handleStartDateChange = useEventCallback(buildChangeHandler(0));
  var handleEndDateChange = useEventCallback(buildChangeHandler(1));
  var validationError = useValidation(_extends({}, sharedProps, {
    value: value,
    timezone: timezone
  }), validateDateTimeRange, rangeValueManager.isSameError, rangeValueManager.defaultErrorState);
  var startFieldProps = _extends({
    error: !!validationError[0]
  }, startTextFieldProps, {
    format: format,
    shouldRespectLeadingZeros: shouldRespectLeadingZeros,
    disabled: disabled,
    readOnly: readOnly,
    timezone: timezone,
    unstableFieldRef: unstableStartFieldRef,
    value: valueProp === undefined ? undefined : valueProp[0],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[0],
    onChange: handleStartDateChange,
    selectedSections: selectedSections,
    onSelectedSectionsChange: onSelectedSectionsChange
  });
  var endFieldProps = _extends({
    error: !!validationError[1]
  }, endTextFieldProps, {
    format: format,
    shouldRespectLeadingZeros: shouldRespectLeadingZeros,
    disabled: disabled,
    readOnly: readOnly,
    timezone: timezone,
    unstableFieldRef: unstableEndFieldRef,
    value: valueProp === undefined ? undefined : valueProp[1],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[1],
    onChange: handleEndDateChange,
    selectedSections: selectedSections,
    onSelectedSectionsChange: onSelectedSectionsChange
  });
  var startDateResponse = useDateTimeField({
    props: startFieldProps,
    inputRef: startInputRef
  });
  var endDateResponse = useDateTimeField({
    props: endFieldProps,
    inputRef: endInputRef
  });

  /* TODO: Undo this change when a clearable behavior for multiple input range fields is implemented */
  return {
    startDate: excludeProps(startDateResponse, ['clearable', 'onClear']),
    endDate: excludeProps(endDateResponse, ['clearable', 'onClear'])
  };
};