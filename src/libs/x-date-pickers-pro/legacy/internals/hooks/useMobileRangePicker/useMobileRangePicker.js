import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["props"];
import * as React from 'react';
import { useSlotProps } from '@mui/base/utils';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersLayout } from '@mui/x-date-pickers/PickersLayout';
import { usePicker, PickersModalDialog, useLocaleText } from '@mui/x-date-pickers/internals';
import useId from '@mui/utils/useId';
import { useEnrichedRangePickerFieldProps } from '../useEnrichedRangePickerFieldProps';
import { useRangePosition } from '../useRangePosition';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var useMobileRangePicker = function useMobileRangePicker(_ref) {
  var _fieldType, _innerSlotProps$toolb, _innerSlotProps$toolb2, _slots$layout;
  var props = _ref.props,
    pickerParams = _objectWithoutProperties(_ref, _excluded);
  var slots = props.slots,
    innerSlotProps = props.slotProps,
    className = props.className,
    sx = props.sx,
    format = props.format,
    formatDensity = props.formatDensity,
    timezone = props.timezone,
    label = props.label,
    inputRef = props.inputRef,
    readOnly = props.readOnly,
    disabled = props.disabled,
    disableOpenPicker = props.disableOpenPicker,
    localeText = props.localeText;
  var _useRangePosition = useRangePosition(props),
    rangePosition = _useRangePosition.rangePosition,
    onRangePositionChange = _useRangePosition.onRangePositionChange,
    singleInputFieldRef = _useRangePosition.singleInputFieldRef;
  var labelId = useId();
  var contextLocaleText = useLocaleText();
  var _usePicker = usePicker(_extends({}, pickerParams, {
      props: props,
      wrapperVariant: 'mobile',
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
    pickerFieldProps = _usePicker.fieldProps;
  var Field = slots.field;
  var fieldType = (_fieldType = Field.fieldType) != null ? _fieldType : 'multi-input';
  var fieldProps = useSlotProps({
    elementType: Field,
    externalSlotProps: innerSlotProps == null ? void 0 : innerSlotProps.field,
    additionalProps: _extends({}, pickerFieldProps, {
      readOnly: readOnly != null ? readOnly : true,
      disabled: disabled,
      className: className,
      sx: sx,
      format: format,
      formatDensity: formatDensity,
      timezone: timezone
    }, fieldType === 'single-input' && {
      inputRef: inputRef
    }),
    ownerState: props
  });
  var isToolbarHidden = (_innerSlotProps$toolb = innerSlotProps == null || (_innerSlotProps$toolb2 = innerSlotProps.toolbar) == null ? void 0 : _innerSlotProps$toolb2.hidden) != null ? _innerSlotProps$toolb : false;
  var enrichedFieldProps = useEnrichedRangePickerFieldProps({
    wrapperVariant: 'mobile',
    fieldType: fieldType,
    open: open,
    actions: actions,
    readOnly: readOnly,
    labelId: labelId,
    disableOpenPicker: disableOpenPicker,
    label: label,
    localeText: localeText,
    rangePosition: rangePosition,
    onRangePositionChange: onRangePositionChange,
    singleInputFieldRef: singleInputFieldRef,
    pickerSlots: slots,
    pickerSlotProps: innerSlotProps,
    fieldProps: fieldProps
  });
  var slotPropsForLayout = _extends({}, innerSlotProps, {
    toolbar: _extends({}, innerSlotProps == null ? void 0 : innerSlotProps.toolbar, {
      titleId: labelId,
      rangePosition: rangePosition,
      onRangePositionChange: onRangePositionChange
    })
  });
  var Layout = (_slots$layout = slots == null ? void 0 : slots.layout) != null ? _slots$layout : PickersLayout;
  var finalLocaleText = _extends({}, contextLocaleText, localeText);
  var labelledById = labelId;
  if (isToolbarHidden) {
    var labels = [];
    if (fieldType === 'multi-input') {
      if (finalLocaleText.start) {
        labels.push("".concat(labelId, "-start-label"));
      }
      if (finalLocaleText.end) {
        labels.push("".concat(labelId, "-end-label"));
      }
    } else if (label != null) {
      labels.push("".concat(labelId, "-label"));
    }
    labelledById = labels.length > 0 ? labels.join(' ') : undefined;
  }
  var slotProps = _extends({}, innerSlotProps, {
    mobilePaper: _extends({
      'aria-labelledby': labelledById
    }, innerSlotProps == null ? void 0 : innerSlotProps.mobilePaper)
  });
  var renderPicker = function renderPicker() {
    return /*#__PURE__*/_jsxs(LocalizationProvider, {
      localeText: localeText,
      children: [/*#__PURE__*/_jsx(Field, _extends({}, enrichedFieldProps)), /*#__PURE__*/_jsx(PickersModalDialog, _extends({}, actions, {
        open: open,
        slots: slots,
        slotProps: slotProps,
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