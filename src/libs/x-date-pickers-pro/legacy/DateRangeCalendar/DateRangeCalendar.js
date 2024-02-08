import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["value", "defaultValue", "referenceDate", "onChange", "className", "disableFuture", "disablePast", "minDate", "maxDate", "shouldDisableDate", "reduceAnimations", "onMonthChange", "defaultCalendarMonth", "rangePosition", "defaultRangePosition", "onRangePositionChange", "calendars", "currentMonthCalendarPosition", "components", "componentsProps", "slots", "slotProps", "loading", "renderLoading", "disableHighlightToday", "readOnly", "disabled", "showDaysOutsideCurrentMonth", "dayOfWeekFormatter", "disableAutoMonthSwitching", "autoFocus", "fixedWeekNumber", "disableDragEditing", "displayWeekNumber", "timezone"],
  _excluded2 = ["isDragging", "rangeDragDay", "draggingDatePosition"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useEventCallback from '@mui/utils/useEventCallback';
import useMediaQuery from '@mui/material/useMediaQuery';
import { resolveComponentProps } from '@mui/base/utils';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { PickersCalendarHeader } from '@mui/x-date-pickers/PickersCalendarHeader';
import { applyDefaultDate, DAY_MARGIN, DayCalendar, useDefaultReduceAnimations, PickersArrowSwitcher, useCalendarState, useDefaultDates, useLocaleText, useNextMonthDisabled, usePreviousMonthDisabled, useUtils, useNow, uncapitalizeObjectKeys, DEFAULT_DESKTOP_MODE_MEDIA_QUERY, buildWarning, useControlledValueWithTimezone } from '@mui/x-date-pickers/internals';
import { dateRangeCalendarClasses, getDateRangeCalendarUtilityClass } from './dateRangeCalendarClasses';
import { isEndOfRange, isRangeValid, isStartOfRange, isWithinRange } from '../internals/utils/date-utils';
import { calculateRangeChange, calculateRangePreview } from '../internals/utils/date-range-manager';
import { DateRangePickerDay, dateRangePickerDayClasses as dayClasses } from '../DateRangePickerDay';
import { rangeValueManager } from '../internals/utils/valueManagers';
import { useDragRange } from './useDragRange';
import { useRangePosition } from '../internals/hooks/useRangePosition';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var DateRangeCalendarRoot = styled('div', {
  name: 'MuiDateRangeCalendar',
  slot: 'Root',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.root;
  }
})({
  display: 'flex',
  flexDirection: 'row'
});
var DateRangeCalendarMonthContainer = styled('div', {
  name: 'MuiDateRangeCalendar',
  slot: 'Container',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.monthContainer;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    '&:not(:last-of-type)': {
      borderRight: "1px solid ".concat((theme.vars || theme).palette.divider)
    }
  };
});
var DateRangeCalendarArrowSwitcher = styled(PickersArrowSwitcher)({
  padding: '16px 16px 8px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});
var DAY_RANGE_SIZE = 40;
var weeksContainerHeight = (DAY_RANGE_SIZE + DAY_MARGIN * 2) * 6;
var warnInvalidCurrentMonthCalendarPosition = buildWarning(['The `currentMonthCalendarPosition` prop must be an integer between `1` and the amount of calendars rendered.', 'For example if you have 2 calendars rendered, it should be equal to either 1 or 2.']);
var DayCalendarForRange = styled(DayCalendar)(function (_ref2) {
  var _$concat, _ref3;
  var theme = _ref2.theme;
  return _ref3 = {
    minWidth: 312,
    minHeight: weeksContainerHeight
  }, _defineProperty(_ref3, "&.".concat(dateRangeCalendarClasses.dayDragging), (_$concat = {}, _defineProperty(_$concat, "& .".concat(dayClasses.day), {
    cursor: 'grabbing'
  }), _defineProperty(_$concat, "& .".concat(dayClasses.root, ":not(.").concat(dayClasses.rangeIntervalDayHighlightStart, "):not(.").concat(dayClasses.rangeIntervalDayHighlightEnd, ") .").concat(dayClasses.day, ":not(.").concat(dayClasses.notSelectedDate, ")"), {
    // we can't override `PickersDay` background color here, because it's styles take precedence
    opacity: 0.6
  }), _$concat)), _defineProperty(_ref3, "&:not(.".concat(dateRangeCalendarClasses.dayDragging, ") .").concat(dayClasses.dayOutsideRangeInterval), {
    '@media (pointer: fine)': {
      '&:hover': {
        border: "1px solid ".concat((theme.vars || theme).palette.grey[500])
      }
    }
  }), _ref3;
});
function useDateRangeCalendarDefaultizedProps(props, name) {
  var _themeProps$renderLoa, _themeProps$reduceAni, _props$loading, _props$disablePast, _props$disableFuture, _themeProps$calendars, _themeProps$disableDr;
  var utils = useUtils();
  var defaultDates = useDefaultDates();
  var defaultReduceAnimations = useDefaultReduceAnimations();
  var themeProps = useThemeProps({
    props: props,
    name: name
  });
  return _extends({}, themeProps, {
    renderLoading: (_themeProps$renderLoa = themeProps.renderLoading) != null ? _themeProps$renderLoa : function () {
      return /*#__PURE__*/_jsx("span", {
        children: "..."
      });
    },
    reduceAnimations: (_themeProps$reduceAni = themeProps.reduceAnimations) != null ? _themeProps$reduceAni : defaultReduceAnimations,
    loading: (_props$loading = props.loading) != null ? _props$loading : false,
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    minDate: applyDefaultDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, themeProps.maxDate, defaultDates.maxDate),
    calendars: (_themeProps$calendars = themeProps.calendars) != null ? _themeProps$calendars : 2,
    disableDragEditing: (_themeProps$disableDr = themeProps.disableDragEditing) != null ? _themeProps$disableDr : false
  });
}
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    isDragging = ownerState.isDragging;
  var slots = {
    root: ['root'],
    monthContainer: ['monthContainer'],
    dayCalendar: [isDragging && 'dayDragging']
  };
  return composeClasses(slots, getDateRangeCalendarUtilityClass, classes);
};
/**
 * Demos:
 *
 * - [DateRangePicker](https://mui.com/x/react-date-pickers/date-range-picker/)
 * - [DateRangeCalendar](https://mui.com/x/react-date-pickers/date-range-calendar/)
 *
 * API:
 *
 * - [DateRangeCalendar API](https://mui.com/x/api/date-pickers/date-range-calendar/)
 */
var DateRangeCalendar = /*#__PURE__*/React.forwardRef(function DateRangeCalendar(inProps, ref) {
  var props = useDateRangeCalendarDefaultizedProps(inProps, 'MuiDateRangeCalendar');
  var shouldHavePreview = useMediaQuery(DEFAULT_DESKTOP_MODE_MEDIA_QUERY, {
    defaultMatches: false
  });
  var valueProp = props.value,
    defaultValue = props.defaultValue,
    referenceDate = props.referenceDate,
    onChange = props.onChange,
    className = props.className,
    disableFuture = props.disableFuture,
    disablePast = props.disablePast,
    minDate = props.minDate,
    maxDate = props.maxDate,
    shouldDisableDate = props.shouldDisableDate,
    reduceAnimations = props.reduceAnimations,
    onMonthChange = props.onMonthChange,
    defaultCalendarMonth = props.defaultCalendarMonth,
    rangePositionProp = props.rangePosition,
    inDefaultRangePosition = props.defaultRangePosition,
    inOnRangePositionChange = props.onRangePositionChange,
    calendars = props.calendars,
    _props$currentMonthCa = props.currentMonthCalendarPosition,
    currentMonthCalendarPosition = _props$currentMonthCa === void 0 ? 1 : _props$currentMonthCa,
    components = props.components,
    componentsProps = props.componentsProps,
    innerSlots = props.slots,
    innerSlotProps = props.slotProps,
    loading = props.loading,
    renderLoading = props.renderLoading,
    disableHighlightToday = props.disableHighlightToday,
    readOnly = props.readOnly,
    disabled = props.disabled,
    showDaysOutsideCurrentMonth = props.showDaysOutsideCurrentMonth,
    dayOfWeekFormatter = props.dayOfWeekFormatter,
    disableAutoMonthSwitching = props.disableAutoMonthSwitching,
    autoFocus = props.autoFocus,
    fixedWeekNumber = props.fixedWeekNumber,
    disableDragEditing = props.disableDragEditing,
    displayWeekNumber = props.displayWeekNumber,
    timezoneProp = props.timezone,
    other = _objectWithoutProperties(props, _excluded);
  var _useControlledValueWi = useControlledValueWithTimezone({
      name: 'DateRangeCalendar',
      timezone: timezoneProp,
      value: valueProp,
      defaultValue: defaultValue,
      onChange: onChange,
      valueManager: rangeValueManager
    }),
    value = _useControlledValueWi.value,
    handleValueChange = _useControlledValueWi.handleValueChange,
    timezone = _useControlledValueWi.timezone;
  var utils = useUtils();
  var localeText = useLocaleText();
  var now = useNow(timezone);
  var slots = innerSlots != null ? innerSlots : uncapitalizeObjectKeys(components);
  var slotProps = innerSlotProps != null ? innerSlotProps : componentsProps;
  var _useRangePosition = useRangePosition({
      rangePosition: rangePositionProp,
      defaultRangePosition: inDefaultRangePosition,
      onRangePositionChange: inOnRangePositionChange
    }),
    rangePosition = _useRangePosition.rangePosition,
    onRangePositionChange = _useRangePosition.onRangePositionChange;
  var handleDatePositionChange = useEventCallback(function (position) {
    if (rangePosition !== position) {
      onRangePositionChange(position);
    }
  });
  var handleSelectedDayChange = useEventCallback(function (newDate, selectionState) {
    var allowRangeFlip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var _calculateRangeChange = calculateRangeChange({
        newDate: newDate,
        utils: utils,
        range: value,
        rangePosition: rangePosition,
        allowRangeFlip: allowRangeFlip
      }),
      nextSelection = _calculateRangeChange.nextSelection,
      newRange = _calculateRangeChange.newRange;
    onRangePositionChange(nextSelection);
    var isFullRangeSelected = rangePosition === 'end' && isRangeValid(utils, newRange);
    handleValueChange(newRange, isFullRangeSelected ? 'finish' : 'partial');
  });
  var handleDrop = useEventCallback(function (newDate) {
    handleSelectedDayChange(newDate, undefined, true);
  });
  var shouldDisableDragEditing = disableDragEditing || disabled || readOnly;

  // Range going for the start of the start day to the end of the end day.
  // This makes sure that `isWithinRange` works with any time in the start and end day.
  var valueDayRange = React.useMemo(function () {
    return [value[0] == null || !utils.isValid(value[0]) ? value[0] : utils.startOfDay(value[0]), value[1] == null || !utils.isValid(value[1]) ? value[1] : utils.endOfDay(value[1])];
  }, [value, utils]);
  var _useDragRange = useDragRange({
      disableDragEditing: shouldDisableDragEditing,
      onDrop: handleDrop,
      onDatePositionChange: handleDatePositionChange,
      utils: utils,
      dateRange: valueDayRange,
      timezone: timezone
    }),
    isDragging = _useDragRange.isDragging,
    rangeDragDay = _useDragRange.rangeDragDay,
    draggingDatePosition = _useDragRange.draggingDatePosition,
    dragEventHandlers = _objectWithoutProperties(_useDragRange, _excluded2);
  var ownerState = _extends({}, props, {
    isDragging: isDragging
  });
  var classes = useUtilityClasses(ownerState);
  var draggingRange = React.useMemo(function () {
    if (!valueDayRange[0] || !valueDayRange[1] || !rangeDragDay) {
      return [null, null];
    }
    var newRange = calculateRangeChange({
      utils: utils,
      range: valueDayRange,
      newDate: rangeDragDay,
      rangePosition: rangePosition,
      allowRangeFlip: true
    }).newRange;
    return newRange[0] !== null && newRange[1] !== null ? [utils.startOfDay(newRange[0]), utils.endOfDay(newRange[1])] : newRange;
  }, [rangePosition, rangeDragDay, utils, valueDayRange]);
  var wrappedShouldDisableDate = React.useMemo(function () {
    if (!shouldDisableDate) {
      return undefined;
    }
    return function (dayToTest) {
      return shouldDisableDate(dayToTest, draggingDatePosition || rangePosition);
    };
  }, [shouldDisableDate, rangePosition, draggingDatePosition]);
  var _useCalendarState = useCalendarState({
      value: value[0] || value[1],
      referenceDate: referenceDate,
      defaultCalendarMonth: defaultCalendarMonth,
      disableFuture: disableFuture,
      disablePast: disablePast,
      disableSwitchToMonthOnDayFocus: true,
      maxDate: maxDate,
      minDate: minDate,
      onMonthChange: onMonthChange,
      reduceAnimations: reduceAnimations,
      shouldDisableDate: wrappedShouldDisableDate,
      timezone: timezone
    }),
    calendarState = _useCalendarState.calendarState,
    changeFocusedDay = _useCalendarState.changeFocusedDay,
    changeMonth = _useCalendarState.changeMonth,
    handleChangeMonth = _useCalendarState.handleChangeMonth,
    onMonthSwitchingAnimationEnd = _useCalendarState.onMonthSwitchingAnimationEnd;
  var prevValue = React.useRef(null);
  React.useEffect(function () {
    var _prevValue$current, _prevValue$current2;
    var date = rangePosition === 'start' ? value[0] : value[1];
    if (!date || !utils.isValid(date)) {
      return;
    }
    var prevDate = rangePosition === 'start' ? (_prevValue$current = prevValue.current) == null ? void 0 : _prevValue$current[0] : (_prevValue$current2 = prevValue.current) == null ? void 0 : _prevValue$current2[1];
    prevValue.current = value;

    // The current date did not change, this call comes either from a `rangePosition` change or a change in the other date.
    // In both cases, we don't want to change the visible month(s).
    if (disableAutoMonthSwitching && prevDate && utils.isEqual(prevDate, date)) {
      return;
    }
    var displayingMonthRange = calendars - 1;
    var currentMonthNumber = utils.getMonth(calendarState.currentMonth);
    var requestedMonthNumber = utils.getMonth(date);
    if (!utils.isSameYear(calendarState.currentMonth, date) || requestedMonthNumber < currentMonthNumber || requestedMonthNumber > currentMonthNumber + displayingMonthRange) {
      var newMonth = rangePosition === 'start' ? date :
      // If need to focus end, scroll to the state when "end" is displaying in the last calendar
      utils.addMonths(date, -displayingMonthRange);
      changeMonth(newMonth);
    }
  }, [rangePosition, value]); // eslint-disable-line

  var selectNextMonth = React.useCallback(function () {
    changeMonth(utils.addMonths(calendarState.currentMonth, 1));
  }, [changeMonth, calendarState.currentMonth, utils]);
  var selectPreviousMonth = React.useCallback(function () {
    changeMonth(utils.addMonths(calendarState.currentMonth, -1));
  }, [changeMonth, calendarState.currentMonth, utils]);
  var isNextMonthDisabled = useNextMonthDisabled(calendarState.currentMonth, {
    disableFuture: disableFuture,
    maxDate: maxDate,
    timezone: timezone
  });
  var isPreviousMonthDisabled = usePreviousMonthDisabled(calendarState.currentMonth, {
    disablePast: disablePast,
    minDate: minDate,
    timezone: timezone
  });
  var baseDateValidationProps = {
    disablePast: disablePast,
    disableFuture: disableFuture,
    maxDate: maxDate,
    minDate: minDate
  };
  var commonViewProps = {
    disableHighlightToday: disableHighlightToday,
    readOnly: readOnly,
    disabled: disabled
  };

  // When disabled, limit the view to the selected date
  var minDateWithDisabled = disabled && value[0] || minDate;
  var maxDateWithDisabled = disabled && value[1] || maxDate;
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    rangePreviewDay = _React$useState2[0],
    setRangePreviewDay = _React$useState2[1];
  var CalendarTransitionProps = React.useMemo(function () {
    return {
      onMouseLeave: function onMouseLeave() {
        return setRangePreviewDay(null);
      }
    };
  }, []);
  var previewingRange = calculateRangePreview({
    utils: utils,
    range: valueDayRange,
    newDate: rangePreviewDay,
    rangePosition: rangePosition
  });
  var handleDayMouseEnter = useEventCallback(function (event, newPreviewRequest) {
    if (!isWithinRange(utils, newPreviewRequest, valueDayRange)) {
      setRangePreviewDay(newPreviewRequest);
    } else {
      setRangePreviewDay(null);
    }
  });
  var slotsForDayCalendar = _extends({
    day: DateRangePickerDay
  }, slots);
  var slotPropsForDayCalendar = _extends({}, slotProps, {
    day: function day(dayOwnerState) {
      var _resolveComponentProp;
      var day = dayOwnerState.day;
      var isSelectedStartDate = isStartOfRange(utils, day, valueDayRange);
      var isSelectedEndDate = isEndOfRange(utils, day, valueDayRange);
      var shouldInitDragging = !shouldDisableDragEditing && valueDayRange[0] && valueDayRange[1];
      var isElementDraggable = shouldInitDragging && (isSelectedStartDate || isSelectedEndDate);
      var datePosition;
      if (isSelectedStartDate) {
        datePosition = 'start';
      } else if (isSelectedEndDate) {
        datePosition = 'end';
      }
      var isStartOfHighlighting = isDragging ? isStartOfRange(utils, day, draggingRange) : isSelectedStartDate;
      var isEndOfHighlighting = isDragging ? isEndOfRange(utils, day, draggingRange) : isSelectedEndDate;
      return _extends({
        isPreviewing: shouldHavePreview ? isWithinRange(utils, day, previewingRange) : false,
        isStartOfPreviewing: shouldHavePreview ? isStartOfRange(utils, day, previewingRange) : false,
        isEndOfPreviewing: shouldHavePreview ? isEndOfRange(utils, day, previewingRange) : false,
        isHighlighting: isWithinRange(utils, day, isDragging ? draggingRange : valueDayRange),
        isStartOfHighlighting: isStartOfHighlighting,
        isEndOfHighlighting: isDragging ? isEndOfRange(utils, day, draggingRange) : isSelectedEndDate,
        onMouseEnter: shouldHavePreview ? handleDayMouseEnter : undefined,
        // apply selected styling to the dragging start or end day
        isVisuallySelected: dayOwnerState.selected || isDragging && (isStartOfHighlighting || isEndOfHighlighting),
        'data-position': datePosition
      }, dragEventHandlers, {
        draggable: isElementDraggable ? true : undefined
      }, (_resolveComponentProp = resolveComponentProps(slotProps == null ? void 0 : slotProps.day, dayOwnerState)) != null ? _resolveComponentProp : {});
    }
  });
  var calendarMonths = React.useMemo(function () {
    return Array.from({
      length: calendars
    }).map(function (_, index) {
      return index;
    });
  }, [calendars]);
  var visibleMonths = React.useMemo(function () {
    if (process.env.NODE_ENV !== 'production') {
      if (currentMonthCalendarPosition > calendars || currentMonthCalendarPosition < 1) {
        warnInvalidCurrentMonthCalendarPosition();
      }
    }
    var firstMonth = utils.addMonths(calendarState.currentMonth, 1 - currentMonthCalendarPosition);
    return Array.from({
      length: calendars
    }).map(function (_, index) {
      return utils.addMonths(firstMonth, index);
    });
  }, [utils, calendarState.currentMonth, calendars, currentMonthCalendarPosition]);
  var focusedMonth = React.useMemo(function () {
    var _visibleMonths$find;
    if (!autoFocus) {
      return null;
    }

    // The focus priority of the "day" view is as follows:
    // 1. Month of the `start` date
    // 2. Month of the `end` date
    // 3. Month of the current date
    // 4. First visible month

    if (value[0] != null) {
      return visibleMonths.find(function (month) {
        return utils.isSameMonth(month, value[0]);
      });
    }
    if (value[1] != null) {
      return visibleMonths.find(function (month) {
        return utils.isSameMonth(month, value[1]);
      });
    }
    return (_visibleMonths$find = visibleMonths.find(function (month) {
      return utils.isSameMonth(month, now);
    })) != null ? _visibleMonths$find : visibleMonths[0];
  }, [utils, value, visibleMonths, autoFocus, now]);
  return /*#__PURE__*/_jsxs(DateRangeCalendarRoot, _extends({
    ref: ref,
    className: clsx(className, classes.root),
    ownerState: ownerState
  }, other, {
    children: [/*#__PURE__*/calendarMonths.map(function (month, index) {
      return /*#__PURE__*/_jsxs(DateRangeCalendarMonthContainer, {
        className: classes.monthContainer,
        children: [calendars === 1 ? /*#__PURE__*/_jsx(PickersCalendarHeader, {
          views: ['day'],
          view: 'day',
          currentMonth: calendarState.currentMonth,
          onMonthChange: function onMonthChange(newMonth, direction) {
            return handleChangeMonth({
              newMonth: newMonth,
              direction: direction
            });
          },
          minDate: minDateWithDisabled,
          maxDate: maxDateWithDisabled,
          disabled: disabled,
          disablePast: disablePast,
          disableFuture: disableFuture,
          reduceAnimations: reduceAnimations,
          slots: slots,
          slotProps: slotProps,
          timezone: timezone
        }) : /*#__PURE__*/_jsx(DateRangeCalendarArrowSwitcher, {
          onGoToPrevious: selectPreviousMonth,
          onGoToNext: selectNextMonth,
          isPreviousHidden: index !== 0,
          isPreviousDisabled: isPreviousMonthDisabled,
          previousLabel: localeText.previousMonth,
          isNextHidden: index !== calendars - 1,
          isNextDisabled: isNextMonthDisabled,
          nextLabel: localeText.nextMonth,
          slots: slots,
          slotProps: slotProps,
          children: utils.format(visibleMonths[month], 'monthAndYear')
        }), /*#__PURE__*/_jsx(DayCalendarForRange, _extends({
          className: classes.dayCalendar
        }, calendarState, baseDateValidationProps, commonViewProps, {
          onMonthSwitchingAnimationEnd: onMonthSwitchingAnimationEnd,
          onFocusedDayChange: changeFocusedDay,
          reduceAnimations: reduceAnimations,
          selectedDays: value,
          onSelectedDaysChange: handleSelectedDayChange,
          currentMonth: visibleMonths[month],
          TransitionProps: CalendarTransitionProps,
          shouldDisableDate: wrappedShouldDisableDate,
          showDaysOutsideCurrentMonth: calendars === 1 && showDaysOutsideCurrentMonth,
          dayOfWeekFormatter: dayOfWeekFormatter,
          loading: loading,
          renderLoading: renderLoading,
          slots: slotsForDayCalendar,
          slotProps: slotPropsForDayCalendar,
          autoFocus: month === focusedMonth,
          fixedWeekNumber: fixedWeekNumber,
          displayWeekNumber: displayWeekNumber,
          timezone: timezone
        }), index)]
      }, month);
    })]
  }));
});
process.env.NODE_ENV !== "production" ? DateRangeCalendar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the main element is focused during the first mount.
   * This main element is:
   * - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
   * - the `input` element if there is a field rendered.
   */
  autoFocus: PropTypes.bool,
  /**
   * The number of calendars to render.
   * @default 2
   */
  calendars: PropTypes.oneOf([1, 2, 3]),
  classes: PropTypes.object,
  className: PropTypes.string,
  /**
   * Overridable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components: PropTypes.object,
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps: PropTypes.object,
  /**
   * Position the current month is rendered in.
   * @default 1
   */
  currentMonthCalendarPosition: PropTypes.oneOf([1, 2, 3]),
  /**
   * Formats the day of week displayed in the calendar header.
   * @param {string} day The day of week provided by the adapter.  Deprecated, will be removed in v7: Use `date` instead.
   * @param {TDate} date The date of the day of week provided by the adapter.
   * @returns {string} The name to display.
   * @default (_day: string, date: TDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
   */
  dayOfWeekFormatter: PropTypes.func,
  /**
   * Default calendar month displayed when `value={[null, null]}`.
   * @deprecated Consider using `referenceDate` instead.
   */
  defaultCalendarMonth: PropTypes.any,
  /**
   * The initial position in the edited date range.
   * Used when the component is not controlled.
   * @default 'start'
   */
  defaultRangePosition: PropTypes.oneOf(['end', 'start']),
  /**
   * The default selected value.
   * Used when the component is not controlled.
   */
  defaultValue: PropTypes.arrayOf(PropTypes.any),
  /**
   * If `true`, after selecting `start` date calendar will not automatically switch to the month of `end` date.
   * @default false
   */
  disableAutoMonthSwitching: PropTypes.bool,
  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, editing dates by dragging is disabled.
   * @default false
   */
  disableDragEditing: PropTypes.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: PropTypes.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: PropTypes.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: PropTypes.bool,
  /**
   * If `true`, the week number will be display in the calendar.
   */
  displayWeekNumber: PropTypes.bool,
  /**
   * Calendar will show more weeks in order to match this value.
   * Put it to 6 for having fix number of week in Gregorian calendars
   * @default undefined
   */
  fixedWeekNumber: PropTypes.number,
  /**
   * If `true`, calls `renderLoading` instead of rendering the day calendar.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Maximal selectable date.
   */
  maxDate: PropTypes.any,
  /**
   * Minimal selectable date.
   */
  minDate: PropTypes.any,
  /**
   * Callback fired when the value changes.
   * @template TDate
   * @param {DateRange<TDate>} value The new value.
   * @param {PickerSelectionState | undefined} selectionState Indicates if the date range selection is complete.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired on month change.
   * @template TDate
   * @param {TDate} month The new month.
   */
  onMonthChange: PropTypes.func,
  /**
   * Callback fired when the range position changes.
   * @param {RangePosition} rangePosition The new range position.
   */
  onRangePositionChange: PropTypes.func,
  /**
   * The position in the currently edited date range.
   * Used when the component position is controlled.
   */
  rangePosition: PropTypes.oneOf(['end', 'start']),
  /**
   * Make picker read only.
   * @default false
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, disable heavy animations.
   * @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
   */
  reduceAnimations: PropTypes.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid date using the validation props, except callbacks such as `shouldDisableDate`.
   */
  referenceDate: PropTypes.any,
  /**
   * Component displaying when passed `loading` true.
   * @returns {React.ReactNode} The node to render when loading.
   * @default () => "..."
   */
  renderLoading: PropTypes.func,
  /**
   * Disable specific date.
   *
   * Warning: This function can be called multiple times (e.g. when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
   *
   * @template TDate
   * @param {TDate} day The date to test.
   * @param {string} position The date to test, 'start' or 'end'.
   * @returns {boolean} Returns `true` if the date should be disabled.
   */
  shouldDisableDate: PropTypes.func,
  /**
   * If `true`, days outside the current month are rendered:
   *
   * - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
   *
   * - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
   *
   * - ignored if `calendars` equals more than `1` on range pickers.
   * @default false
   */
  showDaysOutsideCurrentMonth: PropTypes.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: PropTypes.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documention} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: PropTypes.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: PropTypes.arrayOf(PropTypes.any)
} : void 0;
export { DateRangeCalendar };