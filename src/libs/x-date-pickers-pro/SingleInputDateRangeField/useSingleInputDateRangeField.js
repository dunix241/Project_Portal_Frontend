import _extends from "@babel/runtime/helpers/esm/extends";
import { useUtils, useDefaultDates, applyDefaultDate, useField, splitFieldInternalAndForwardedProps } from '@mui/x-date-pickers/internals';
import { rangeValueManager, rangeFieldValueManager } from '../internals/utils/valueManagers';
import { validateDateRange } from '../internals/utils/validation/validateDateRange';
export const useDefaultizedDateRangeFieldProps = props => {
  var _props$disablePast, _props$disableFuture, _props$format;
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  return _extends({}, props, {
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    format: (_props$format = props.format) != null ? _props$format : utils.formats.keyboardDate,
    minDate: applyDefaultDate(utils, props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, props.maxDate, defaultDates.maxDate)
  });
};
export const useSingleInputDateRangeField = ({
  props: inProps,
  inputRef
}) => {
  const props = useDefaultizedDateRangeFieldProps(inProps);
  const {
    forwardedProps,
    internalProps
  } = splitFieldInternalAndForwardedProps(props, 'date');
  return useField({
    inputRef,
    forwardedProps,
    internalProps,
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateDateRange,
    valueType: 'date'
  });
};