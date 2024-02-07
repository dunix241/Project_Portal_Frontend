import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["props", "ref"];
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersLayout } from '@mui/x-date-pickers/PickersLayout';
import { usePicker, DIALOG_WIDTH } from '@mui/x-date-pickers/internals';
import { useRangePosition } from '../useRangePosition';
import { jsx as _jsx } from "react/jsx-runtime";
var PickerStaticLayout = styled(PickersLayout)(function (_ref) {
  var theme = _ref.theme;
  return {
    overflow: 'hidden',
    minWidth: DIALOG_WIDTH,
    backgroundColor: (theme.vars || theme).palette.background.paper
  };
});

/**
 * Hook managing all the range static pickers:
 * - StaticDateRangePicker
 */
export var useStaticRangePicker = function useStaticRangePicker(_ref2) {
  var _slots$layout;
  var props = _ref2.props,
    ref = _ref2.ref,
    pickerParams = _objectWithoutProperties(_ref2, _excluded);
  var localeText = props.localeText,
    slots = props.slots,
    slotProps = props.slotProps,
    className = props.className,
    sx = props.sx,
    displayStaticWrapperAs = props.displayStaticWrapperAs,
    autoFocus = props.autoFocus;
  var _useRangePosition = useRangePosition(props),
    rangePosition = _useRangePosition.rangePosition,
    onRangePositionChange = _useRangePosition.onRangePositionChange;
  var _usePicker = usePicker(_extends({}, pickerParams, {
      props: props,
      autoFocusView: autoFocus != null ? autoFocus : false,
      additionalViewProps: {
        rangePosition: rangePosition,
        onRangePositionChange: onRangePositionChange
      },
      wrapperVariant: displayStaticWrapperAs
    })),
    layoutProps = _usePicker.layoutProps,
    renderCurrentView = _usePicker.renderCurrentView;
  var Layout = (_slots$layout = slots == null ? void 0 : slots.layout) != null ? _slots$layout : PickerStaticLayout;
  var slotPropsForLayout = _extends({}, slotProps, {
    toolbar: _extends({}, slotProps == null ? void 0 : slotProps.toolbar, {
      rangePosition: rangePosition,
      onRangePositionChange: onRangePositionChange
    })
  });
  var renderPicker = function renderPicker() {
    var _slotProps$layout, _slotProps$layout2, _slotProps$layout3;
    return /*#__PURE__*/_jsx(LocalizationProvider, {
      localeText: localeText,
      children: /*#__PURE__*/_jsx(Layout, _extends({}, layoutProps, slotProps == null ? void 0 : slotProps.layout, {
        slots: slots,
        slotProps: slotPropsForLayout,
        sx: [].concat(_toConsumableArray(Array.isArray(sx) ? sx : [sx]), _toConsumableArray(Array.isArray(slotProps == null || (_slotProps$layout = slotProps.layout) == null ? void 0 : _slotProps$layout.sx) ? slotProps.layout.sx : [slotProps == null || (_slotProps$layout2 = slotProps.layout) == null ? void 0 : _slotProps$layout2.sx])),
        className: clsx(className, slotProps == null || (_slotProps$layout3 = slotProps.layout) == null ? void 0 : _slotProps$layout3.className),
        ref: ref,
        children: renderCurrentView()
      }))
    });
  };
  return {
    renderPicker: renderPicker
  };
};