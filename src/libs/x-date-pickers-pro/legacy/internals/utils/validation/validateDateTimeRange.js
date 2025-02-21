import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
var _excluded = ["shouldDisableDate"];
import { validateDateTime } from '@mui/x-date-pickers/internals';
import { isRangeValid } from '../date-utils';
export var validateDateTimeRange = function validateDateTimeRange(_ref) {
  var props = _ref.props,
    value = _ref.value,
    adapter = _ref.adapter;
  var _value = _slicedToArray(value, 2),
    start = _value[0],
    end = _value[1];
  var _shouldDisableDate = props.shouldDisableDate,
    otherProps = _objectWithoutProperties(props, _excluded);
  var dateTimeValidations = [validateDateTime({
    adapter: adapter,
    value: start,
    props: _extends({}, otherProps, {
      shouldDisableDate: function shouldDisableDate(day) {
        return !!(_shouldDisableDate != null && _shouldDisableDate(day, 'start'));
      }
    })
  }), validateDateTime({
    adapter: adapter,
    value: end,
    props: _extends({}, otherProps, {
      shouldDisableDate: function shouldDisableDate(day) {
        return !!(_shouldDisableDate != null && _shouldDisableDate(day, 'end'));
      }
    })
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