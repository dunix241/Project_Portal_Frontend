import _extends from "@babel/runtime/helpers/esm/extends";
import useEventCallback from '@mui/utils/useEventCallback';
import { unstable_useDateField as useDateField } from '@mui/x-date-pickers/DateField';
import { useLocalizationContext, useValidation, useControlledValueWithTimezone } from '@mui/x-date-pickers/internals';
import { useDefaultizedDateRangeFieldProps } from '../../../SingleInputDateRangeField/useSingleInputDateRangeField';
import { validateDateRange } from '../../utils/validation/validateDateRange';
import { rangeValueManager } from '../../utils/valueManagers';
import { excludeProps } from './shared';
export const useMultiInputDateRangeField = ({
  sharedProps: inSharedProps,
  startTextFieldProps,
  startInputRef,
  unstableStartFieldRef,
  endTextFieldProps,
  endInputRef,
  unstableEndFieldRef
}) => {
  const sharedProps = useDefaultizedDateRangeFieldProps(inSharedProps);
  const adapter = useLocalizationContext();
  const {
    value: valueProp,
    defaultValue,
    format,
    formatDensity,
    shouldRespectLeadingZeros,
    onChange,
    disabled,
    readOnly,
    selectedSections,
    onSelectedSectionsChange,
    timezone: timezoneProp
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
        validationError: validateDateRange({
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
  }), validateDateRange, rangeValueManager.isSameError, rangeValueManager.defaultErrorState);
  const startFieldProps = _extends({
    error: !!validationError[0]
  }, startTextFieldProps, {
    disabled,
    readOnly,
    format,
    formatDensity,
    shouldRespectLeadingZeros,
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
    formatDensity,
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
  const startDateResponse = useDateField({
    props: startFieldProps,
    inputRef: startInputRef
  });
  const endDateResponse = useDateField({
    props: endFieldProps,
    inputRef: endInputRef
  });

  /* TODO: Undo this change when a clearable behavior for multiple input range fields is implemented */
  return {
    startDate: excludeProps(startDateResponse, ['clearable', 'onClear']),
    endDate: excludeProps(endDateResponse, ['clearable', 'onClear'])
  };
};