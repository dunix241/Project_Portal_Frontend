import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
var _excluded = ["shouldDisableDate"];
import { validateDate } from '@mui/x-date-pickers/internals';
import { isRangeValid } from '../date-utils';
export var validateDateRange = function validateDateRange(_ref) {
  var props = _ref.props,
    value = _ref.value,
    adapter = _ref.adapter;
  var _value = _slicedToArray(value, 2),
    start = _value[0],
    end = _value[1];
  var _shouldDisableDate = props.shouldDisableDate,
    otherProps = _objectWithoutProperties(props, _excluded);
  var dateValidations = [validateDate({
    adapter: adapter,
    value: start,
    props: _extends({}, otherProps, {
      shouldDisableDate: function shouldDisableDate(day) {
        return !!(_shouldDisableDate != null && _shouldDisableDate(day, 'start'));
      }
    })
  }), validateDate({
    adapter: adapter,
    value: end,
    props: _extends({}, otherProps, {
      shouldDisableDate: function shouldDisableDate(day) {
        return !!(_shouldDisableDate != null && _shouldDisableDate(day, 'end'));
      }
    })
  })];
  if (dateValidations[0] || dateValidations[1]) {
    return dateValidations;
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