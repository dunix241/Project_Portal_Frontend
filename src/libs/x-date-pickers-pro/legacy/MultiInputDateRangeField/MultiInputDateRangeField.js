import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["slots", "slotProps", "components", "componentsProps", "disabled", "autoFocus", "unstableStartFieldRef", "unstableEndFieldRef", "className"],
  _excluded2 = ["onKeyDown", "ref", "readOnly", "inputMode"],
  _excluded3 = ["onKeyDown", "ref", "readOnly", "inputMode"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Stack from '@mui/material/Stack';
import MuiTextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled, useThemeProps } from '@mui/material/styles';
import { useSlotProps } from '@mui/base/utils';
import { unstable_composeClasses as composeClasses, unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import { splitFieldInternalAndForwardedProps, uncapitalizeObjectKeys } from '@mui/x-date-pickers/internals';
import { useMultiInputDateRangeField } from '../internals/hooks/useMultiInputRangeField/useMultiInputDateRangeField';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var multiInputDateRangeFieldClasses = generateUtilityClasses('MuiMultiInputDateRangeField', ['root', 'separator']);
export var getMultiInputDateRangeFieldUtilityClass = function getMultiInputDateRangeFieldUtilityClass(slot) {
  return generateUtilityClass('MuiMultiInputDateRangeField', slot);
};
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root'],
    separator: ['separator']
  };
  return composeClasses(slots, getMultiInputDateRangeFieldUtilityClass, classes);
};
var MultiInputDateRangeFieldRoot = styled( /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/_jsx(Stack, _extends({
    ref: ref,
    spacing: 2,
    direction: "row",
    alignItems: "baseline"
  }, props));
}), {
  name: 'MuiMultiInputDateRangeField',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})({});
var MultiInputDateRangeFieldSeparator = styled(function (props) {
  var _props$children;
  return /*#__PURE__*/_jsx(Typography, _extends({}, props, {
    children: (_props$children = props.children) != null ? _props$children : ' – '
  }));
}, {
  name: 'MuiMultiInputDateRangeField',
  slot: 'Separator',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.separator;
  }
})({});
/**
 * Demos:
 *
 * - [DateRangeField](http://mui.com/x/react-date-pickers/date-range-field/)
 * - [Fields](https://mui.com/x/react-date-pickers/fields/)
 *
 * API:
 *
 * - [MultiInputDateRangeField API](https://mui.com/x/api/multi-input-date-range-field/)
 */
var MultiInputDateRangeField = /*#__PURE__*/React.forwardRef(function MultiInputDateRangeField(inProps, ref) {
  var _slots$root, _slots$textField, _slots$separator, _slotProps$separator;
  var themeProps = useThemeProps({
    props: inProps,
    name: 'MuiMultiInputDateRangeField'
  });
  var _splitFieldInternalAn = splitFieldInternalAndForwardedProps(themeProps, 'date'),
    dateFieldInternalProps = _splitFieldInternalAn.internalProps,
    forwardedProps = _splitFieldInternalAn.forwardedProps;
  var innerSlots = forwardedProps.slots,
    innerSlotProps = forwardedProps.slotProps,
    components = forwardedProps.components,
    componentsProps = forwardedProps.componentsProps,
    disabled = forwardedProps.disabled,
    autoFocus = forwardedProps.autoFocus,
    unstableStartFieldRef = forwardedProps.unstableStartFieldRef,
    unstableEndFieldRef = forwardedProps.unstableEndFieldRef,
    className = forwardedProps.className,
    otherForwardedProps = _objectWithoutProperties(forwardedProps, _excluded);
  var slots = innerSlots != null ? innerSlots : uncapitalizeObjectKeys(components);
  var slotProps = innerSlotProps != null ? innerSlotProps : componentsProps;
  var ownerState = themeProps;
  var classes = useUtilityClasses(ownerState);
  var Root = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : MultiInputDateRangeFieldRoot;
  var rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps == null ? void 0 : slotProps.root,
    externalForwardedProps: otherForwardedProps,
    additionalProps: {
      ref: ref
    },
    ownerState: ownerState,
    className: clsx(className, classes.root)
  });
  var TextField = (_slots$textField = slots == null ? void 0 : slots.textField) != null ? _slots$textField : MuiTextField;
  var startTextFieldProps = useSlotProps({
    elementType: TextField,
    externalSlotProps: slotProps == null ? void 0 : slotProps.textField,
    additionalProps: {
      autoFocus: autoFocus
    },
    ownerState: _extends({}, ownerState, {
      position: 'start'
    })
  });
  var endTextFieldProps = useSlotProps({
    elementType: TextField,
    externalSlotProps: slotProps == null ? void 0 : slotProps.textField,
    ownerState: _extends({}, ownerState, {
      position: 'end'
    })
  });
  var Separator = (_slots$separator = slots == null ? void 0 : slots.separator) != null ? _slots$separator : MultiInputDateRangeFieldSeparator;
  var separatorProps = useSlotProps({
    elementType: Separator,
    externalSlotProps: (_slotProps$separator = slotProps == null ? void 0 : slotProps.separator) != null ? _slotProps$separator : componentsProps == null ? void 0 : componentsProps.separator,
    ownerState: ownerState,
    className: classes.separator
  });
  var _useMultiInputDateRan = useMultiInputDateRangeField({
      sharedProps: _extends({}, dateFieldInternalProps, {
        disabled: disabled
      }),
      startTextFieldProps: startTextFieldProps,
      endTextFieldProps: endTextFieldProps,
      unstableStartFieldRef: unstableStartFieldRef,
      unstableEndFieldRef: unstableEndFieldRef,
      startInputRef: startTextFieldProps.inputRef,
      endInputRef: endTextFieldProps.inputRef
    }),
    _useMultiInputDateRan2 = _useMultiInputDateRan.startDate,
    onStartInputKeyDown = _useMultiInputDateRan2.onKeyDown,
    startInputRef = _useMultiInputDateRan2.ref,
    startReadOnly = _useMultiInputDateRan2.readOnly,
    startInputMode = _useMultiInputDateRan2.inputMode,
    startDateProps = _objectWithoutProperties(_useMultiInputDateRan2, _excluded2),
    _useMultiInputDateRan3 = _useMultiInputDateRan.endDate,
    onEndInputKeyDown = _useMultiInputDateRan3.onKeyDown,
    endInputRef = _useMultiInputDateRan3.ref,
    endReadOnly = _useMultiInputDateRan3.readOnly,
    endInputMode = _useMultiInputDateRan3.inputMode,
    endDateProps = _objectWithoutProperties(_useMultiInputDateRan3, _excluded3);
  return /*#__PURE__*/_jsxs(Root, _extends({}, rootProps, {
    children: [/*#__PURE__*/_jsx(TextField, _extends({
      fullWidth: true
    }, startDateProps, {
      InputProps: _extends({}, startDateProps.InputProps, {
        readOnly: startReadOnly
      }),
      inputProps: _extends({}, startDateProps.inputProps, {
        ref: startInputRef,
        inputMode: startInputMode,
        onKeyDown: onStartInputKeyDown
      })
    })), /*#__PURE__*/_jsx(Separator, _extends({}, separatorProps)), /*#__PURE__*/_jsx(TextField, _extends({
      fullWidth: true
    }, endDateProps, {
      InputProps: _extends({}, endDateProps.InputProps, {
        readOnly: endReadOnly
      }),
      inputProps: _extends({}, endDateProps.inputProps, {
        ref: endInputRef,
        readOnly: endReadOnly,
        inputMode: endInputMode,
        onKeyDown: onEndInputKeyDown
      })
    }))]
  }));
});
process.env.NODE_ENV !== "production" ? MultiInputDateRangeField.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  className: PropTypes.string,
  component: PropTypes.elementType,
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
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.arrayOf(PropTypes.any),
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: PropTypes.oneOfType([PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']), PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])), PropTypes.object]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: PropTypes.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: PropTypes.bool,
  /**
   * Add an element between each child.
   */
  divider: PropTypes.node,
  /**
   * Format of the date when rendered in the input(s).
   */
  format: PropTypes.string,
  /**
   * Density of the format when rendered in the input.
   * Setting `formatDensity` to `"spacious"` will add a space before and after each `/`, `-` and `.` character.
   * @default "dense"
   */
  formatDensity: PropTypes.oneOf(['dense', 'spacious']),
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
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the error associated to the current value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TError} error The new error.
   * @param {TValue} value The value associated to the error.
   */
  onError: PropTypes.func,
  /**
   * Callback fired when the selected sections change.
   * @param {FieldSelectedSections} newValue The new selected sections.
   */
  onSelectedSectionsChange: PropTypes.func,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   * @default false
   */
  readOnly: PropTypes.bool,
  /**
   * The date used to generate a part of the new value that is not present in the format when both `value` and `defaultValue` are empty.
   * For example, on time fields it will be used to determine the date to set.
   * @default The closest valid date using the validation props, except callbacks such as `shouldDisableDate`. Value is rounded to the most granular section used.
   */
  referenceDate: PropTypes.any,
  /**
   * The currently selected sections.
   * This prop accept four formats:
   * 1. If a number is provided, the section at this index will be selected.
   * 2. If an object with a `startIndex` and `endIndex` properties are provided, the sections between those two indexes will be selected.
   * 3. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
   * 4. If `null` is provided, no section will be selected
   * If not provided, the selected sections will be handled internally.
   */
  selectedSections: PropTypes.oneOfType([PropTypes.oneOf(['all', 'day', 'hours', 'meridiem', 'minutes', 'month', 'seconds', 'weekDay', 'year']), PropTypes.number, PropTypes.shape({
    endIndex: PropTypes.number.isRequired,
    startIndex: PropTypes.number.isRequired
  })]),
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
   * If `true`, the format will respect the leading zeroes (e.g: on dayjs, the format `M/D/YYYY` will render `8/16/2018`)
   * If `false`, the format will always add leading zeroes (e.g: on dayjs, the format `M/D/YYYY` will render `08/16/2018`)
   *
   * Warning n°1: Luxon is not able to respect the leading zeroes when using macro tokens (e.g: "DD"), so `shouldRespectLeadingZeros={true}` might lead to inconsistencies when using `AdapterLuxon`.
   *
   * Warning n°2: When `shouldRespectLeadingZeros={true}`, the field will add an invisible character on the sections containing a single digit to make sure `onChange` is fired.
   * If you need to get the clean value from the input, you can remove this character using `input.value.replace(/\u200e/g, '')`.
   *
   * Warning n°3: When used in strict mode, dayjs and moment require to respect the leading zeros.
   * This mean that when using `shouldRespectLeadingZeros={false}`, if you retrieve the value directly from the input (not listening to `onChange`) and your format contains tokens without leading zeros, the value will not be parsed by your library.
   *
   * @default `false`
   */
  shouldRespectLeadingZeros: PropTypes.bool,
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
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])), PropTypes.number, PropTypes.object, PropTypes.string]),
  style: PropTypes.object,
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
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
  unstableEndFieldRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  unstableStartFieldRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.
   * @default false
   */
  useFlexGap: PropTypes.bool,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: PropTypes.arrayOf(PropTypes.any)
} : void 0;
export { MultiInputDateRangeField };