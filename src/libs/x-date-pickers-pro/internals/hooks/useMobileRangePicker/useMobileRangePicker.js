import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import { useSlotProps } from '@mui/base/utils';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersLayout } from '@mui/x-date-pickers/PickersLayout';
import { PickersModalDialog, useLocaleText, usePicker } from '@mui/x-date-pickers/internals';
import useId from '@mui/utils/useId';
import { useEnrichedRangePickerFieldProps } from '../useEnrichedRangePickerFieldProps';
import { useRangePosition } from '../useRangePosition';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

const _excluded = ["props"];
export const useMobileRangePicker = _ref => {
  var _fieldType, _innerSlotProps$toolb, _innerSlotProps$toolb2, _slots$layout;

  let {
      props
    } = _ref,
    pickerParams = _objectWithoutPropertiesLoose(_ref, _excluded);

  const {
    slots,
    slotProps: innerSlotProps,
    className,
    sx,
    format,
    formatDensity,
    timezone,
    label,
    inputRef,
    readOnly,
    disabled,
    disableOpenPicker,
    localeText
  } = props;
  const {
    rangePosition,
    onRangePositionChange,
    singleInputFieldRef
  } = useRangePosition(props);
  const labelId = useId();
  const contextLocaleText = useLocaleText();
  const {
    open,
    actions,
    layoutProps,
    renderCurrentView,
    fieldProps: pickerFieldProps
  } = usePicker(_extends({}, pickerParams, {
    props,
    wrapperVariant: 'mobile',
    autoFocusView: true,
    additionalViewProps: {
      rangePosition,
      onRangePositionChange
    }
  }));
  const Field = slots.field;
  const fieldType = (_fieldType = Field.fieldType) != null ? _fieldType : 'multi-input';
  const fieldProps = useSlotProps({
    elementType: Field,
    externalSlotProps: innerSlotProps == null ? void 0 : innerSlotProps.field,
    additionalProps: _extends({}, pickerFieldProps, {
      readOnly: readOnly != null ? readOnly : true,
      disabled,
      className,
      sx,
      format,
      formatDensity,
      timezone
    }, fieldType === 'single-input' && {
      inputRef
    }),
    ownerState: props
  });
  const isToolbarHidden = (_innerSlotProps$toolb = innerSlotProps == null || (_innerSlotProps$toolb2 = innerSlotProps.toolbar) == null ? void 0 : _innerSlotProps$toolb2.hidden) != null ? _innerSlotProps$toolb : false;
  const enrichedFieldProps = useEnrichedRangePickerFieldProps({
    wrapperVariant: 'mobile',
    fieldType,
    open,
    actions,
    readOnly,
    labelId,
    disableOpenPicker,
    label,
    localeText,
    rangePosition,
    onRangePositionChange,
    singleInputFieldRef,
    pickerSlots: slots,
    pickerSlotProps: innerSlotProps,
    fieldProps
  });
  const slotPropsForLayout = _extends({}, innerSlotProps, {
    toolbar: _extends({}, innerSlotProps == null ? void 0 : innerSlotProps.toolbar, {
      titleId: labelId,
      rangePosition,
      onRangePositionChange
    })
  });
  const Layout = (_slots$layout = slots == null ? void 0 : slots.layout) != null ? _slots$layout : PickersLayout;
  const finalLocaleText = _extends({}, contextLocaleText, localeText);
  let labelledById = labelId;
  if (isToolbarHidden) {
    const labels = [];
    if (fieldType === 'multi-input') {
      if (finalLocaleText.start) {
        labels.push(`${labelId}-start-label`);
      }
      if (finalLocaleText.end) {
        labels.push(`${labelId}-end-label`);
      }
    } else if (label != null) {
      labels.push(`${labelId}-label`);
    }
    labelledById = labels.length > 0 ? labels.join(' ') : undefined;
  }
  const slotProps = _extends({}, innerSlotProps, {
    mobilePaper: _extends({
      'aria-labelledby': labelledById
    }, innerSlotProps == null ? void 0 : innerSlotProps.mobilePaper)
  });
  const renderPicker = () => /*#__PURE__*/_jsxs(LocalizationProvider, {
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
  return {
    renderPicker
  };
};