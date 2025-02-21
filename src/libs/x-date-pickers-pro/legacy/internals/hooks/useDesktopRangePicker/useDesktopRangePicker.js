import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["props"];
import * as React from 'react';
import { useSlotProps } from '@mui/base/utils';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersLayout } from '@mui/x-date-pickers/PickersLayout';
import { executeInTheNextEventLoopTick, getActiveElement, usePicker, PickersPopper } from '@mui/x-date-pickers/internals';
import { useEnrichedRangePickerFieldProps } from '../useEnrichedRangePickerFieldProps';
import { useRangePosition } from '../useRangePosition';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var useDesktopRangePicker = function useDesktopRangePicker(_ref) {
  var _fieldType, _slots$layout;
  var props = _ref.props,
    pickerParams = _objectWithoutProperties(_ref, _excluded);
  var slots = props.slots,
    slotProps = props.slotProps,
    className = props.className,
    sx = props.sx,
    format = props.format,
    formatDensity = props.formatDensity,
    timezone = props.timezone,
    label = props.label,
    inputRef = props.inputRef,
    readOnly = props.readOnly,
    disabled = props.disabled,
    autoFocus = props.autoFocus,
    disableOpenPicker = props.disableOpenPicker,
    localeText = props.localeText,
    reduceAnimations = props.reduceAnimations;
  var fieldContainerRef = React.useRef(null);
  var anchorRef = React.useRef(null);
  var popperRef = React.useRef(null);
  var _useRangePosition = useRangePosition(props),
    rangePosition = _useRangePosition.rangePosition,
    onRangePositionChange = _useRangePosition.onRangePositionChange,
    singleInputFieldRef = _useRangePosition.singleInputFieldRef;
  var _usePicker = usePicker(_extends({}, pickerParams, {
      props: props,
      wrapperVariant: 'desktop',
      autoFocusView: true,
      additionalViewProps: {
        rangePosition: rangePosition,
        onRangePositionChange: onRangePositionChange
      }
    })),
    open = _usePicker.open,
    actions = _usePicker.actions,
    layoutProps = _usePicker.layoutProps,
    renderCurrentView = _usePicker.renderCurrentView,
    shouldRestoreFocus = _usePicker.shouldRestoreFocus,
    pickerFieldProps = _usePicker.fieldProps;
  var handleBlur = function handleBlur() {
    executeInTheNextEventLoopTick(function () {
      var _fieldContainerRef$cu, _popperRef$current;
      if ((_fieldContainerRef$cu = fieldContainerRef.current) != null && _fieldContainerRef$cu.contains(getActiveElement(document)) || (_popperRef$current = popperRef.current) != null && _popperRef$current.contains(getActiveElement(document))) {
        return;
      }
      actions.onDismiss();
    });
  };
  var Field = slots.field;
  var fieldType = (_fieldType = Field.fieldType) != null ? _fieldType : 'multi-input';
  var fieldProps = useSlotProps({
    elementType: Field,
    externalSlotProps: slotProps == null ? void 0 : slotProps.field,
    additionalProps: _extends({}, pickerFieldProps, {
      readOnly: readOnly,
      disabled: disabled,
      className: className,
      sx: sx,
      format: format,
      formatDensity: formatDensity,
      timezone: timezone,
      autoFocus: autoFocus && !props.open,
      ref: fieldContainerRef
    }, fieldType === 'single-input' && {
      inputRef: inputRef
    }),
    ownerState: props
  });
  var enrichedFieldProps = useEnrichedRangePickerFieldProps({
    wrapperVariant: 'desktop',
    fieldType: fieldType,
    open: open,
    actions: actions,
    readOnly: readOnly,
    disableOpenPicker: disableOpenPicker,
    label: label,
    localeText: localeText,
    onBlur: handleBlur,
    rangePosition: rangePosition,
    onRangePositionChange: onRangePositionChange,
    singleInputFieldRef: singleInputFieldRef,
    pickerSlotProps: slotProps,
    pickerSlots: slots,
    fieldProps: fieldProps,
    anchorRef: anchorRef
  });
  var slotPropsForLayout = _extends({}, slotProps, {
    toolbar: _extends({}, slotProps == null ? void 0 : slotProps.toolbar, {
      rangePosition: rangePosition,
      onRangePositionChange: onRangePositionChange
    })
  });
  var Layout = (_slots$layout = slots == null ? void 0 : slots.layout) != null ? _slots$layout : PickersLayout;
  var renderPicker = function renderPicker() {
    return /*#__PURE__*/_jsxs(LocalizationProvider, {
      localeText: localeText,
      children: [/*#__PURE__*/_jsx(Field, _extends({}, enrichedFieldProps)), /*#__PURE__*/_jsx(PickersPopper, _extends({
        role: "tooltip",
        placement: "bottom-start",
        containerRef: popperRef,
        anchorEl: anchorRef.current,
        onBlur: handleBlur
      }, actions, {
        open: open,
        slots: slots,
        slotProps: slotProps,
        shouldRestoreFocus: shouldRestoreFocus,
        reduceAnimations: reduceAnimations,
        children: /*#__PURE__*/_jsx(Layout, _extends({}, layoutProps, slotProps == null ? void 0 : slotProps.layout, {
          slots: slots,
          slotProps: slotPropsForLayout,
          children: renderCurrentView()
        }))
      }))]
    });
  };
  return {
    renderPicker: renderPicker
  };
};