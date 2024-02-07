import _extends from "@babel/runtime/helpers/esm/extends";
import useEventCallback from '@mui/utils/useEventCallback';
import { unstable_useDateField as useDateField } from '@mui/x-date-pickers/DateField';
import { useLocalizationContext, useValidation, useControlledValueWithTimezone } from '@mui/x-date-pickers/internals';
import { useDefaultizedDateRangeFieldProps } from '../../../SingleInputDateRangeField/useSingleInputDateRangeField';
import { validateDateRange } from '../../utils/validation/validateDateRange';
import { rangeValueManager } from '../../utils/valueManagers';
import { excludeProps } from './shared';
export var useMultiInputDateRangeField = function useMultiInputDateRangeField(_ref) {
  var inSharedProps = _ref.sharedProps,
    startTextFieldProps = _ref.startTextFieldProps,
    startInputRef = _ref.startInputRef,
    unstableStartFieldRef = _ref.unstableStartFieldRef,
    endTextFieldProps = _ref.endTextFieldProps,
    endInputRef = _ref.endInputRef,
    unstableEndFieldRef = _ref.unstableEndFieldRef;
  var sharedProps = useDefaultizedDateRangeFieldProps(inSharedProps);
  var adapter = useLocalizationContext();
  var valueProp = sharedProps.value,
    defaultValue = sharedProps.defaultValue,
    format = sharedProps.format,
    formatDensity = sharedProps.formatDensity,
    shouldRespectLeadingZeros = sharedProps.shouldRespectLeadingZeros,
    onChange = sharedProps.onChange,
    disabled = sharedProps.disabled,
    readOnly = sharedProps.readOnly,
    selectedSections = sharedProps.selectedSections,
    onSelectedSectionsChange = sharedProps.onSelectedSectionsChange,
    timezoneProp = sharedProps.timezone;
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
        validationError: validateDateRange({
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
  }), validateDateRange, rangeValueManager.isSameError, rangeValueManager.defaultErrorState);
  var startFieldProps = _extends({
    error: !!validationError[0]
  }, startTextFieldProps, {
    disabled: disabled,
    readOnly: readOnly,
    format: format,
    formatDensity: formatDensity,
    shouldRespectLeadingZeros: shouldRespectLeadingZeros,
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
    formatDensity: formatDensity,
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
  var startDateResponse = useDateField({
    props: startFieldProps,
    inputRef: startInputRef
  });
  var endDateResponse = useDateField({
    props: endFieldProps,
    inputRef: endInputRef
  });

  /* TODO: Undo this change when a clearable behavior for multiple input range fields is implemented */
  return {
    startDate: excludeProps(startDateResponse, ['clearable', 'onClear']),
    endDate: excludeProps(endDateResponse, ['clearable', 'onClear'])
  };
};