import _extends from "@babel/runtime/helpers/esm/extends";
import useEventCallback from '@mui/utils/useEventCallback';
import { unstable_useDateTimeField as useDateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { applyDefaultDate, useDefaultDates, useLocalizationContext, useUtils, useValidation, useControlledValueWithTimezone } from '@mui/x-date-pickers/internals';
import { validateDateTimeRange } from '../../utils/validation/validateDateTimeRange';
import { rangeValueManager } from '../../utils/valueManagers';
import { excludeProps } from './shared';
export const useDefaultizedDateTimeRangeFieldProps = props => {
  var _props$ampm, _props$disablePast, _props$disableFuture, _props$format, _props$minDateTime, _props$maxDateTime, _props$minDateTime2, _props$maxDateTime2;
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const ampm = (_props$ampm = props.ampm) != null ? _props$ampm : utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.keyboardDateTime12h : utils.formats.keyboardDateTime24h;
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
export const useMultiInputDateTimeRangeField = ({
  sharedProps: inSharedProps,
  startTextFieldProps,
  startInputRef,
  unstableStartFieldRef,
  endTextFieldProps,
  endInputRef,
  unstableEndFieldRef
}) => {
  const sharedProps = useDefaultizedDateTimeRangeFieldProps(inSharedProps);
  const adapter = useLocalizationContext();
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
  } = useControlledValueWithTimezone({
    name: 'useMultiInputDateRangeField',
    timezone: timezoneProp,
    value: valueProp,
    defaultValue,
    onChange,
    valueManager: rangeValueManager
  });

  // TODO: Maybe export utility from `useField` instead of copy/pasting the logic
  const buildChangeHandler = index => {
    return (newDate, rawContext) => {
      const newDateRange = index === 0 ? [newDate, value[1]] : [value[0], newDate];
      const context = _extends({}, rawContext, {
        validationError: validateDateTimeRange({
          adapter,
          value: newDateRange,
          props: _extends({}, sharedProps, {
            timezone
          })
        })
      });
      handleValueChange(newDateRange, context);
    };
  };
  const handleStartDateChange = useEventCallback(buildChangeHandler(0));
  const handleEndDateChange = useEventCallback(buildChangeHandler(1));
  const validationError = useValidation(_extends({}, sharedProps, {
    value,
    timezone
  }), validateDateTimeRange, rangeValueManager.isSameError, rangeValueManager.defaultErrorState);
  const startFieldProps = _extends({
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
  const endFieldProps = _extends({
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
  const startDateResponse = useDateTimeField({
    props: startFieldProps,
    inputRef: startInputRef
  });
  const endDateResponse = useDateTimeField({
    props: endFieldProps,
    inputRef: endInputRef
  });

  /* TODO: Undo this change when a clearable behavior for multiple input range fields is implemented */
  return {
    startDate: excludeProps(startDateResponse, ['clearable', 'onClear']),
    endDate: excludeProps(endDateResponse, ['clearable', 'onClear'])
  };
};