import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { validateTime } from '@mui/x-date-pickers/internals';
import { isRangeValid } from '../date-utils';
export var validateTimeRange = function validateTimeRange(_ref) {
  var props = _ref.props,
    value = _ref.value,
    adapter = _ref.adapter;
  var _value = _slicedToArray(value, 2),
    start = _value[0],
    end = _value[1];
  var dateTimeValidations = [validateTime({
    adapter: adapter,
    value: start,
    props: props
  }), validateTime({
    adapter: adapter,
    value: end,
    props: props
  })];
  if (dateTimeValidations[0] || dateTimeValidations[1]) {
    return dateTimeValidations;
  }

  // for partial input
  if (start === null || end === null) {
    return [null, null];
  }
  if (!isRangeValid(adapter.utils, value)) {
    return ['invalidRange', 'invalidRange'];
  }
  return [null, null];
};