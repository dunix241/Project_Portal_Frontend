import _extends from "@babel/runtime/helpers/esm/extends";
import { useUtils, useField, splitFieldInternalAndForwardedProps } from '@mui/x-date-pickers/internals';
import { rangeValueManager, rangeFieldValueManager } from '../internals/utils/valueManagers';
import { validateTimeRange } from '../internals/utils/validation/validateTimeRange';
export var useDefaultizedTimeRangeFieldProps = function useDefaultizedTimeRangeFieldProps(props) {
  var _props$ampm, _props$disablePast, _props$disableFuture, _props$format;
  var utils = useUtils();
  var ampm = (_props$ampm = props.ampm) != null ? _props$ampm : utils.is12HourCycleInCurrentLocale();
  var defaultFormat = ampm ? utils.formats.fullTime12h : utils.formats.fullTime24h;
  return _extends({}, props, {
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    format: (_props$format = props.format) != null ? _props$format : defaultFormat
  });
};
export var useSingleInputTimeRangeField = function useSingleInputTimeRangeField(_ref) {
  var inProps = _ref.props,
    inputRef = _ref.inputRef;
  var props = useDefaultizedTimeRangeFieldProps(inProps);
  var _splitFieldInternalAn = splitFieldInternalAndForwardedProps(props, 'time'),
    forwardedProps = _splitFieldInternalAn.forwardedProps,
    internalProps = _splitFieldInternalAn.internalProps;
  return useField({
    inputRef: inputRef,
    forwardedProps: forwardedProps,
    internalProps: internalProps,
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateTimeRange,
    valueType: 'time'
  });
};