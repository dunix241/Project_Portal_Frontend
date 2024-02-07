import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["props"];
import * as React from 'react';
import { useSlotProps } from '@mui/base/utils';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersLayout } from '@mui/x-date-pickers/PickersLayout';
import { executeInTheNextEventLoopTick, getActiveElement, usePicker, PickersPopper } from '@mui/x-date-pickers/internals';
import { useEnrichedRangePickerFieldProps } from '../useEnrichedRangePickerFieldProps';
import { useRangePosition } from '../useRangePosition';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const useDesktopRangePicker = _ref => {
  var _fieldType, _slots$layout;
  let {
      props
    } = _ref,
    pickerParams = _objectWithoutPropertiesLoose(_ref, _excluded);
  const {
    slots,
    slotProps,
    className,
    sx,
    format,
    formatDensity,
    timezone,
    label,
    inputRef,
    readOnly,
    disabled,
    autoFocus,
    disableOpenPicker,
    localeText,
    reduceAnimations
  } = props;
  const fieldContainerRef = React.useRef(null);
  const anchorRef = React.useRef(null);
  const popperRef = React.useRef(null);
  const {
    rangePosition,
    onRangePositionChange,
    singleInputFieldRef
  } = useRangePosition(props);
  const {
    open,
    actions,
    layoutProps,
    renderCurrentView,
    shouldRestoreFocus,
    fieldProps: pickerFieldProps
  } = usePicker(_extends({}, pickerParams, {
    props,
    wrapperVariant: 'desktop',
    autoFocusView: true,
    additionalViewProps: {
      rangePosition,
      onRangePositionChange
    }
  }));
  const handleBlur = () => {
    executeInTheNextEventLoopTick(() => {
      var _fieldContainerRef$cu, _popperRef$current;
      if ((_fieldContainerRef$cu = fieldContainerRef.current) != null && _fieldContainerRef$cu.contains(getActiveElement(document)) || (_popperRef$current = popperRef.current) != null && _popperRef$current.contains(getActiveElement(document))) {
        return;
      }
      actions.onDismiss();
    });
  };
  const Field = slots.field;
  const fieldType = (_fieldType = Field.fieldType) != null ? _fieldType : 'multi-input';
  const fieldProps = useSlotProps({
    elementType: Field,
    externalSlotProps: slotProps == null ? void 0 : slotProps.field,
    additionalProps: _extends({}, pickerFieldProps, {
      readOnly,
      disabled,
      className,
      sx,
      format,
      formatDensity,
      timezone,
      autoFocus: autoFocus && !props.open,
      ref: fieldContainerRef
    }, fieldType === 'single-input' && {
      inputRef
    }),
    ownerState: props
  });
  const enrichedFieldProps = useEnrichedRangePickerFieldProps({
    wrapperVariant: 'desktop',
    fieldType,
    open,
    actions,
    readOnly,
    disableOpenPicker,
    label,
    localeText,
    onBlur: handleBlur,
    rangePosition,
    onRangePositionChange,
    singleInputFieldRef,
    pickerSlotProps: slotProps,
    pickerSlots: slots,
    fieldProps,
    anchorRef
  });
  const slotPropsForLayout = _extends({}, slotProps, {
    toolbar: _extends({}, slotProps == null ? void 0 : slotProps.toolbar, {
      rangePosition,
      onRangePositionChange
    })
  });
  const Layout = (_slots$layout = slots == null ? void 0 : slots.layout) != null ? _slots$layout : PickersLayout;
  const renderPicker = () => /*#__PURE__*/_jsxs(LocalizationProvider, {
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
  return {
    renderPicker
  };
};