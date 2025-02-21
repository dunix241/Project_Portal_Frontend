import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
export function calculateRangeChange(_ref) {
  var utils = _ref.utils,
    range = _ref.range,
    selectedDate = _ref.newDate,
    rangePosition = _ref.rangePosition,
    _ref$allowRangeFlip = _ref.allowRangeFlip,
    allowRangeFlip = _ref$allowRangeFlip === void 0 ? false : _ref$allowRangeFlip;
  var _range = _slicedToArray(range, 2),
    start = _range[0],
    end = _range[1];
  if (rangePosition === 'start') {
    var _truthyResult = allowRangeFlip ? {
      nextSelection: 'start',
      newRange: [end, selectedDate]
    } : {
      nextSelection: 'end',
      newRange: [selectedDate, null]
    };
    return Boolean(end) && utils.isAfter(selectedDate, end) ? _truthyResult : {
      nextSelection: 'end',
      newRange: [selectedDate, end]
    };
  }
  var truthyResult = allowRangeFlip ? {
    nextSelection: 'end',
    newRange: [selectedDate, start]
  } : {
    nextSelection: 'end',
    newRange: [selectedDate, null]
  };
  return Boolean(start) && utils.isBefore(selectedDate, start) ? truthyResult : {
    nextSelection: 'start',
    newRange: [start, selectedDate]
  };
}
export function calculateRangePreview(options) {
  if (options.newDate == null) {
    return [null, null];
  }
  var _options$range = _slicedToArray(options.range, 2),
    start = _options$range[0],
    end = _options$range[1];
  var _calculateRangeChange = calculateRangeChange(options),
    newRange = _calculateRangeChange.newRange;
  if (!start || !end) {
    return newRange;
  }
  var _newRange = _slicedToArray(newRange, 2),
    previewStart = _newRange[0],
    previewEnd = _newRange[1];
  return options.rangePosition === 'end' ? [end, previewEnd] : [previewStart, start];
}