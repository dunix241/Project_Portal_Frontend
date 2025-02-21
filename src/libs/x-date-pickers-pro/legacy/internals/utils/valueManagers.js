import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["value", "referenceDate"];
import { replaceInvalidDateByNull, addPositionPropertiesToSections, createDateStrForInputFromSections, areDatesEqual, getTodayDate, getDefaultReferenceDate } from '@mui/x-date-pickers/internals';
import { splitDateRangeSections, removeLastSeparator } from './date-fields-utils';
export var rangeValueManager = {
  emptyValue: [null, null],
  getTodayValue: function getTodayValue(utils, timezone, valueType) {
    return [getTodayDate(utils, timezone, valueType), getTodayDate(utils, timezone, valueType)];
  },
  getInitialReferenceValue: function getInitialReferenceValue(_ref) {
    var value = _ref.value,
      referenceDateProp = _ref.referenceDate,
      params = _objectWithoutProperties(_ref, _excluded);
    var shouldKeepStartDate = value[0] != null && params.utils.isValid(value[0]);
    var shouldKeepEndDate = value[1] != null && params.utils.isValid(value[1]);
    if (shouldKeepStartDate && shouldKeepEndDate) {
      return value;
    }
    var referenceDate = referenceDateProp != null ? referenceDateProp : getDefaultReferenceDate(params);
    return [shouldKeepStartDate ? value[0] : referenceDate, shouldKeepEndDate ? value[1] : referenceDate];
  },
  cleanValue: function cleanValue(utils, value) {
    return value.map(function (date) {
      return replaceInvalidDateByNull(utils, date);
    });
  },
  areValuesEqual: function areValuesEqual(utils, a, b) {
    return areDatesEqual(utils, a[0], b[0]) && areDatesEqual(utils, a[1], b[1]);
  },
  isSameError: function isSameError(a, b) {
    return b !== null && a[1] === b[1] && a[0] === b[0];
  },
  hasError: function hasError(error) {
    return error[0] != null || error[1] != null;
  },
  defaultErrorState: [null, null],
  getTimezone: function getTimezone(utils, value) {
    var timezoneStart = value[0] == null || !utils.isValid(value[0]) ? null : utils.getTimezone(value[0]);
    var timezoneEnd = value[1] == null || !utils.isValid(value[1]) ? null : utils.getTimezone(value[1]);
    if (timezoneStart != null && timezoneEnd != null && timezoneStart !== timezoneEnd) {
      throw new Error('MUI: The timezone of the start and the end date should be the same');
    }
    return timezoneStart != null ? timezoneStart : timezoneEnd;
  },
  setTimezone: function setTimezone(utils, timezone, value) {
    return [value[0] == null ? null : utils.setTimezone(value[0], timezone), value[1] == null ? null : utils.setTimezone(value[1], timezone)];
  }
};
export var rangeFieldValueManager = {
  updateReferenceValue: function updateReferenceValue(utils, value, prevReferenceValue) {
    var shouldKeepStartDate = value[0] != null && utils.isValid(value[0]);
    var shouldKeepEndDate = value[1] != null && utils.isValid(value[1]);
    if (!shouldKeepStartDate && !shouldKeepEndDate) {
      return prevReferenceValue;
    }
    if (shouldKeepStartDate && shouldKeepEndDate) {
      return value;
    }
    if (shouldKeepStartDate) {
      return [value[0], prevReferenceValue[0]];
    }
    return [prevReferenceValue[1], value[1]];
  },
  getSectionsFromValue: function getSectionsFromValue(utils, _ref2, fallbackSections, isRTL, getSectionsFromDate) {
    var _ref3 = _slicedToArray(_ref2, 2),
      start = _ref3[0],
      end = _ref3[1];
    var separatedFallbackSections = fallbackSections == null ? {
      startDate: null,
      endDate: null
    } : splitDateRangeSections(fallbackSections);
    var getSections = function getSections(newDate, fallbackDateSections, position) {
      var shouldReUsePrevDateSections = !utils.isValid(newDate) && !!fallbackDateSections;
      if (shouldReUsePrevDateSections) {
        return fallbackDateSections;
      }
      var sections = getSectionsFromDate(newDate);
      return sections.map(function (section, sectionIndex) {
        if (sectionIndex === sections.length - 1 && position === 'start') {
          return _extends({}, section, {
            dateName: position,
            endSeparator: "".concat(section.endSeparator).concat(isRTL ? "\u2069 \u2013 \u2066" : ' – ')
          });
        }
        return _extends({}, section, {
          dateName: position
        });
      });
    };
    return addPositionPropertiesToSections([].concat(_toConsumableArray(getSections(start, separatedFallbackSections.startDate, 'start')), _toConsumableArray(getSections(end, separatedFallbackSections.endDate, 'end'))), isRTL);
  },
  getValueStrFromSections: function getValueStrFromSections(sections, isRTL) {
    var dateRangeSections = splitDateRangeSections(sections);
    return createDateStrForInputFromSections([].concat(_toConsumableArray(dateRangeSections.startDate), _toConsumableArray(dateRangeSections.endDate)), isRTL);
  },
  parseValueStr: function parseValueStr(valueStr, referenceValue, parseDate) {
    // TODO: Improve because it would not work if the date format has `–` as a separator.
    var _valueStr$split = valueStr.split('–'),
      _valueStr$split2 = _slicedToArray(_valueStr$split, 2),
      startStr = _valueStr$split2[0],
      endStr = _valueStr$split2[1];
    return [startStr, endStr].map(function (dateStr, index) {
      if (dateStr == null) {
        return null;
      }
      return parseDate(dateStr.trim(), referenceValue[index]);
    });
  },
  getActiveDateManager: function getActiveDateManager(utils, state, activeSection) {
    var index = activeSection.dateName === 'start' ? 0 : 1;
    var updateDateInRange = function updateDateInRange(newDate, prevDateRange) {
      return index === 0 ? [newDate, prevDateRange[1]] : [prevDateRange[0], newDate];
    };
    return {
      date: state.value[index],
      referenceDate: state.referenceValue[index],
      getSections: function getSections(sections) {
        var dateRangeSections = splitDateRangeSections(sections);
        if (index === 0) {
          return removeLastSeparator(dateRangeSections.startDate);
        }
        return dateRangeSections.endDate;
      },
      getNewValuesFromNewActiveDate: function getNewValuesFromNewActiveDate(newActiveDate) {
        return {
          value: updateDateInRange(newActiveDate, state.value),
          referenceValue: newActiveDate == null || !utils.isValid(newActiveDate) ? state.referenceValue : updateDateInRange(newActiveDate, state.referenceValue)
        };
      }
    };
  }
};