import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["className", "day", "outsideCurrentMonth", "isEndOfHighlighting", "isEndOfPreviewing", "isHighlighting", "isPreviewing", "isStartOfHighlighting", "isStartOfPreviewing", "selected", "isVisuallySelected", "sx", "draggable", "isFirstVisibleCell", "isLastVisibleCell"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { alpha, styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { useUtils } from '@mui/x-date-pickers/internals';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { getDateRangePickerDayUtilityClass, dateRangePickerDayClasses } from './dateRangePickerDayClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var isHighlighting = ownerState.isHighlighting,
    outsideCurrentMonth = ownerState.outsideCurrentMonth,
    isStartOfHighlighting = ownerState.isStartOfHighlighting,
    isStartOfMonth = ownerState.isStartOfMonth,
    isEndOfHighlighting = ownerState.isEndOfHighlighting,
    isEndOfMonth = ownerState.isEndOfMonth,
    isPreviewing = ownerState.isPreviewing,
    isStartOfPreviewing = ownerState.isStartOfPreviewing,
    isEndOfPreviewing = ownerState.isEndOfPreviewing,
    isFirstVisibleCell = ownerState.isFirstVisibleCell,
    isLastVisibleCell = ownerState.isLastVisibleCell,
    isHiddenDayFiller = ownerState.isHiddenDayFiller,
    selected = ownerState.selected,
    classes = ownerState.classes;
  var slots = {
    root: ['root', isHighlighting && 'rangeIntervalDayHighlight', isStartOfHighlighting && 'rangeIntervalDayHighlightStart', isEndOfHighlighting && 'rangeIntervalDayHighlightEnd', outsideCurrentMonth && 'outsideCurrentMonth', isStartOfMonth && 'startOfMonth', isEndOfMonth && 'endOfMonth', isFirstVisibleCell && 'firstVisibleCell', isLastVisibleCell && 'lastVisibleCell', isHiddenDayFiller && 'hiddenDayFiller'],
    rangeIntervalPreview: ['rangeIntervalPreview', isPreviewing && 'rangeIntervalDayPreview', (isStartOfPreviewing || isStartOfMonth) && 'rangeIntervalDayPreviewStart', (isEndOfPreviewing || isEndOfMonth) && 'rangeIntervalDayPreviewEnd'],
    day: ['day', !selected && 'notSelectedDate', !isHighlighting && 'dayOutsideRangeInterval', !selected && isHighlighting && 'dayInsideRangeInterval']
  };
  return composeClasses(slots, getDateRangePickerDayUtilityClass, classes);
};
var endBorderStyle = {
  borderTopRightRadius: '50%',
  borderBottomRightRadius: '50%'
};
var startBorderStyle = {
  borderTopLeftRadius: '50%',
  borderBottomLeftRadius: '50%'
};
var DateRangePickerDayRoot = styled('div', {
  name: 'MuiDateRangePickerDay',
  slot: 'Root',
  overridesResolver: function overridesResolver(_, styles) {
    return [_defineProperty({}, "&.".concat(dateRangePickerDayClasses.rangeIntervalDayHighlight), styles.rangeIntervalDayHighlight), _defineProperty({}, "&.".concat(dateRangePickerDayClasses.rangeIntervalDayHighlightStart), styles.rangeIntervalDayHighlightStart), _defineProperty({}, "&.".concat(dateRangePickerDayClasses.rangeIntervalDayHighlightEnd), styles.rangeIntervalDayHighlightEnd), _defineProperty({}, "&.".concat(dateRangePickerDayClasses.firstVisibleCell), styles.firstVisibleCell), _defineProperty({}, "&.".concat(dateRangePickerDayClasses.lastVisibleCell), styles.lastVisibleCell), _defineProperty({}, "&.".concat(dateRangePickerDayClasses.startOfMonth), styles.startOfMonth), _defineProperty({}, "&.".concat(dateRangePickerDayClasses.endOfMonth), styles.endOfMonth), _defineProperty({}, "&.".concat(dateRangePickerDayClasses.outsideCurrentMonth), styles.outsideCurrentMonth), _defineProperty({}, "&.".concat(dateRangePickerDayClasses.hiddenDayFiller), styles.hiddenDayFiller), styles.root];
  }
})(function (_ref10) {
  var _extends2;
  var theme = _ref10.theme,
    ownerState = _ref10.ownerState;
  return ownerState.isHiddenDayFiller ? {} : _extends((_extends2 = {}, _defineProperty(_extends2, "&:first-of-type .".concat(dateRangePickerDayClasses.rangeIntervalDayPreview), _extends({}, startBorderStyle, {
    borderLeftColor: (theme.vars || theme).palette.divider
  })), _defineProperty(_extends2, "&:last-of-type .".concat(dateRangePickerDayClasses.rangeIntervalDayPreview), _extends({}, endBorderStyle, {
    borderRightColor: (theme.vars || theme).palette.divider
  })), _extends2), ownerState.isHighlighting && {
    borderRadius: 0,
    color: (theme.vars || theme).palette.primary.contrastText,
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.primary.mainChannel, " / ").concat(theme.vars.palette.action.focusOpacity, ")") : alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
    '&:first-of-type': startBorderStyle,
    '&:last-of-type': endBorderStyle
  }, (ownerState.isStartOfHighlighting || ownerState.isFirstVisibleCell) && _extends({}, startBorderStyle, {
    paddingLeft: 0
  }), (ownerState.isEndOfHighlighting || ownerState.isLastVisibleCell) && _extends({}, endBorderStyle, {
    paddingRight: 0
  }));
});
DateRangePickerDayRoot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  ownerState: PropTypes.object.isRequired
};
var DateRangePickerDayRangeIntervalPreview = styled('div', {
  name: 'MuiDateRangePickerDay',
  slot: 'RangeIntervalPreview',
  overridesResolver: function overridesResolver(_, styles) {
    return [_defineProperty({}, "&.".concat(dateRangePickerDayClasses.rangeIntervalDayPreview), styles.rangeIntervalDayPreview), _defineProperty({}, "&.".concat(dateRangePickerDayClasses.rangeIntervalDayPreviewStart), styles.rangeIntervalDayPreviewStart), _defineProperty({}, "&.".concat(dateRangePickerDayClasses.rangeIntervalDayPreviewEnd), styles.rangeIntervalDayPreviewEnd), styles.rangeIntervalPreview];
  }
})(function (_ref14) {
  var theme = _ref14.theme,
    ownerState = _ref14.ownerState;
  return _extends({
    // replace default day component margin with transparent border to avoid jumping on preview
    border: '2px solid transparent'
  }, ownerState.isPreviewing && !ownerState.isHiddenDayFiller && _extends({
    borderRadius: 0,
    border: "2px dashed ".concat((theme.vars || theme).palette.divider),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent'
  }, (ownerState.isStartOfPreviewing || ownerState.isFirstVisibleCell) && _extends({
    borderLeftColor: (theme.vars || theme).palette.divider
  }, startBorderStyle), (ownerState.isEndOfPreviewing || ownerState.isLastVisibleCell) && _extends({
    borderRightColor: (theme.vars || theme).palette.divider
  }, endBorderStyle)));
});
DateRangePickerDayRangeIntervalPreview.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  ownerState: PropTypes.object.isRequired
};
var DateRangePickerDayDay = styled(PickersDay, {
  name: 'MuiDateRangePickerDay',
  slot: 'Day',
  overridesResolver: function overridesResolver(_, styles) {
    return [_defineProperty({}, "&.".concat(dateRangePickerDayClasses.dayInsideRangeInterval), styles.dayInsideRangeInterval), _defineProperty({}, "&.".concat(dateRangePickerDayClasses.dayOutsideRangeInterval), styles.dayOutsideRangeInterval), _defineProperty({}, "&.".concat(dateRangePickerDayClasses.notSelectedDate), styles.notSelectedDate), styles.day];
  }
})(function (_ref18) {
  var ownerState = _ref18.ownerState;
  return _extends({
    // Required to overlap preview border
    transform: 'scale(1.1)',
    '& > *': {
      transform: 'scale(0.9)'
    }
  }, ownerState.draggable && {
    cursor: 'grab'
  }, ownerState.draggable && {
    touchAction: 'none'
  });
});
var DateRangePickerDayRaw = /*#__PURE__*/React.forwardRef(function DateRangePickerDay(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiDateRangePickerDay'
  });
  var className = props.className,
    day = props.day,
    outsideCurrentMonth = props.outsideCurrentMonth,
    isEndOfHighlighting = props.isEndOfHighlighting,
    isEndOfPreviewing = props.isEndOfPreviewing,
    isHighlighting = props.isHighlighting,
    isPreviewing = props.isPreviewing,
    isStartOfHighlighting = props.isStartOfHighlighting,
    isStartOfPreviewing = props.isStartOfPreviewing,
    _props$selected = props.selected,
    selected = _props$selected === void 0 ? false : _props$selected,
    isVisuallySelected = props.isVisuallySelected,
    sx = props.sx,
    draggable = props.draggable,
    isFirstVisibleCell = props.isFirstVisibleCell,
    isLastVisibleCell = props.isLastVisibleCell,
    other = _objectWithoutProperties(props, _excluded);
  var utils = useUtils();
  var isEndOfMonth = utils.isSameDay(day, utils.endOfMonth(day));
  var isStartOfMonth = utils.isSameDay(day, utils.startOfMonth(day));
  var shouldRenderHighlight = isHighlighting && !outsideCurrentMonth;
  var shouldRenderPreview = isPreviewing && !outsideCurrentMonth;
  var ownerState = _extends({}, props, {
    selected: selected,
    isStartOfMonth: isStartOfMonth,
    isEndOfMonth: isEndOfMonth,
    draggable: draggable,
    isFirstVisibleCell: isFirstVisibleCell,
    isLastVisibleCell: isLastVisibleCell,
    isHiddenDayFiller: outsideCurrentMonth && !other.showDaysOutsideCurrentMonth
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(DateRangePickerDayRoot, {
    className: clsx(classes.root, className),
    ownerState: ownerState,
    sx: sx,
    children: /*#__PURE__*/_jsx(DateRangePickerDayRangeIntervalPreview, {
      className: classes.rangeIntervalPreview,
      ownerState: ownerState,
      children: /*#__PURE__*/_jsx(DateRangePickerDayDay, _extends({}, other, {
        ref: ref,
        disableMargin: true,
        day: day,
        selected: isVisuallySelected,
        outsideCurrentMonth: outsideCurrentMonth,
        className: classes.day,
        ownerState: ownerState,
        draggable: draggable,
        isFirstVisibleCell: isFirstVisibleCell,
        isLastVisibleCell: isLastVisibleCell
      }))
    })
  });
});
process.env.NODE_ENV !== "production" ? DateRangePickerDayRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.shape({
      focusVisible: PropTypes.func.isRequired
    })
  })]),
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  className: PropTypes.string,
  component: PropTypes.elementType,
  /**
   * The date to show.
   */
  day: PropTypes.any.isRequired,
  /**
   * If `true`, renders as disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: PropTypes.bool,
  /**
   * If `true`, days are rendering without margin. Useful for displaying linked range of days.
   * @default false
   */
  disableMargin: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: PropTypes.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  isAnimating: PropTypes.bool,
  /**
   * Set to `true` if the `day` is the end of a highlighted date range.
   */
  isEndOfHighlighting: PropTypes.bool.isRequired,
  /**
   * Set to `true` if the `day` is the end of a previewing date range.
   */
  isEndOfPreviewing: PropTypes.bool.isRequired,
  /**
   * If `true`, day is the first visible cell of the month.
   * Either the first day of the month or the first day of the week depending on `showDaysOutsideCurrentMonth`.
   */
  isFirstVisibleCell: PropTypes.bool.isRequired,
  /**
   * Set to `true` if the `day` is in a highlighted date range.
   */
  isHighlighting: PropTypes.bool.isRequired,
  /**
   * If `true`, day is the last visible cell of the month.
   * Either the last day of the month or the last day of the week depending on `showDaysOutsideCurrentMonth`.
   */
  isLastVisibleCell: PropTypes.bool.isRequired,
  /**
   * Set to `true` if the `day` is in a preview date range.
   */
  isPreviewing: PropTypes.bool.isRequired,
  /**
   * Set to `true` if the `day` is the start of a highlighted date range.
   */
  isStartOfHighlighting: PropTypes.bool.isRequired,
  /**
   * Set to `true` if the `day` is the start of a previewing date range.
   */
  isStartOfPreviewing: PropTypes.bool.isRequired,
  /**
   * Indicates if the day should be visually selected.
   */
  isVisuallySelected: PropTypes.bool,
  onDaySelect: PropTypes.func.isRequired,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: PropTypes.func,
  onMouseEnter: PropTypes.func,
  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: PropTypes.bool.isRequired,
  /**
   * If `true`, renders as selected.
   * @default false
   */
  selected: PropTypes.bool,
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
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
  /**
   * If `true`, renders as today date.
   * @default false
   */
  today: PropTypes.bool,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: PropTypes.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.shape({
      pulsate: PropTypes.func.isRequired,
      start: PropTypes.func.isRequired,
      stop: PropTypes.func.isRequired
    })
  })])
} : void 0;

/**
 * Demos:
 *
 * - [DateRangePicker](https://mui.com/x/react-date-pickers/date-range-picker/)
 *
 * API:
 *
 * - [DateRangePickerDay API](https://mui.com/x/api/date-pickers/date-range-picker-day/)
 */
export var DateRangePickerDay = /*#__PURE__*/React.memo(DateRangePickerDayRaw);