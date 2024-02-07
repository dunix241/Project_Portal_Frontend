export var isRangeValid = function isRangeValid(utils, range) {
  return Boolean(range && range[0] && range[1] && !utils.isBefore(range[1], range[0]));
};
export var isWithinRange = function isWithinRange(utils, day, range) {
  return isRangeValid(utils, range) && utils.isWithinRange(day, range);
};
export var isStartOfRange = function isStartOfRange(utils, day, range) {
  return isRangeValid(utils, range) && utils.isSameDay(day, range[0]);
};
export var isEndOfRange = function isEndOfRange(utils, day, range) {
  return isRangeValid(utils, range) && utils.isSameDay(day, range[1]);
};