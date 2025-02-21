import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
var _excluded = ["value", "rangePosition", "onRangePositionChange", "toolbarFormat", "className"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { PickersToolbar, PickersToolbarButton, useUtils, useLocaleText } from '@mui/x-date-pickers/internals';
import { getDateRangePickerToolbarUtilityClass } from './dateRangePickerToolbarClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root'],
    container: ['container']
  };
  return composeClasses(slots, getDateRangePickerToolbarUtilityClass, classes);
};
var DateRangePickerToolbarRoot = styled(PickersToolbar, {
  name: 'MuiDateRangePickerToolbar',
  slot: 'Root',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.root;
  }
})({});
var DateRangePickerToolbarContainer = styled('div', {
  name: 'MuiDateRangePickerToolbar',
  slot: 'Container',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.container;
  }
})({
  display: 'flex'
});

/**
 * Demos:
 *
 * - [DateRangePicker](https://mui.com/x/react-date-pickers/date-range-picker/)
 * - [Custom components](https://mui.com/x/react-date-pickers/custom-components/)
 *
 * API:
 *
 * - [DateRangePickerToolbar API](https://mui.com/x/api/date-pickers/date-range-picker-toolbar/)
 */
var DateRangePickerToolbar = /*#__PURE__*/React.forwardRef(function DateRangePickerToolbar(inProps, ref) {
  var utils = useUtils();
  var props = useThemeProps({
    props: inProps,
    name: 'MuiDateRangePickerToolbar'
  });
  var _props$value = _slicedToArray(props.value, 2),
    start = _props$value[0],
    end = _props$value[1],
    rangePosition = props.rangePosition,
    onRangePositionChange = props.onRangePositionChange,
    toolbarFormat = props.toolbarFormat,
    className = props.className,
    other = _objectWithoutProperties(props, _excluded);
  var localeText = useLocaleText();
  var startDateValue = start ? utils.formatByString(start, toolbarFormat || utils.formats.shortDate) : localeText.start;
  var endDateValue = end ? utils.formatByString(end, toolbarFormat || utils.formats.shortDate) : localeText.end;
  var ownerState = props;
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(DateRangePickerToolbarRoot, _extends({}, other, {
    toolbarTitle: localeText.dateRangePickerToolbarTitle,
    isLandscape: false,
    className: clsx(className, classes.root),
    ownerState: ownerState,
    ref: ref,
    children: /*#__PURE__*/_jsxs(DateRangePickerToolbarContainer, {
      className: classes.container,
      children: [/*#__PURE__*/_jsx(PickersToolbarButton, {
        variant: start !== null ? 'h5' : 'h6',
        value: startDateValue,
        selected: rangePosition === 'start',
        onClick: function onClick() {
          return onRangePositionChange('start');
        }
      }), /*#__PURE__*/_jsxs(Typography, {
        variant: "h5",
        children: ["\xA0", '–', "\xA0"]
      }), /*#__PURE__*/_jsx(PickersToolbarButton, {
        variant: end !== null ? 'h5' : 'h6',
        value: endDateValue,
        selected: rangePosition === 'end',
        onClick: function onClick() {
          return onRangePositionChange('end');
        }
      })]
    })
  }));
});
process.env.NODE_ENV !== "production" ? DateRangePickerToolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  classes: PropTypes.object,
  /**
   * className applied to the root component.
   */
  className: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * If `true`, show the toolbar even in desktop mode.
   * @default `true` for Desktop, `false` for Mobile.
   */
  hidden: PropTypes.bool,
  onRangePositionChange: PropTypes.func.isRequired,
  rangePosition: PropTypes.oneOf(['end', 'start']).isRequired,
  readOnly: PropTypes.bool,
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  titleId: PropTypes.string,
  /**
   * Toolbar date format.
   */
  toolbarFormat: PropTypes.string,
  /**
   * Toolbar value placeholder—it is displayed when the value is empty.
   * @default "––"
   */
  toolbarPlaceholder: PropTypes.node,
  value: PropTypes.arrayOf(PropTypes.any).isRequired
} : void 0;
export { DateRangePickerToolbar };