import _extends from "@babel/runtime/helpers/esm/extends";
import { useUtils, useField, splitFieldInternalAndForwardedProps } from '@mui/x-date-pickers/internals';
import { rangeValueManager, rangeFieldValueManager } from '../internals/utils/valueManagers';
import { validateTimeRange } from '../internals/utils/validation/validateTimeRange';
export const useDefaultizedTimeRangeFieldProps = props => {
  var _props$ampm, _props$disablePast, _props$disableFuture, _props$format;
  const utils = useUtils();
  const ampm = (_props$ampm = props.ampm) != null ? _props$ampm : utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.fullTime12h : utils.formats.fullTime24h;
  return _extends({}, props, {
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    format: (_props$format = props.format) != null ? _props$format : defaultFormat
  });
};
export const useSingleInputTimeRangeField = ({
  props: inProps,
  inputRef
}) => {
  const props = useDefaultizedTimeRangeFieldProps(inProps);
  const {
    forwardedProps,
    internalProps
  } = splitFieldInternalAndForwardedProps(props, 'time');
  return useField({
    inputRef,
    forwardedProps,
    internalProps,
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateTimeRange,
    valueType: 'time'
  });
};