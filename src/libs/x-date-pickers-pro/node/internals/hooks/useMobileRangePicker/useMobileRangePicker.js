"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMobileRangePicker = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/base/utils");
var _LocalizationProvider = require("@mui/x-date-pickers/LocalizationProvider");
var _PickersLayout = require("@mui/x-date-pickers/PickersLayout");
var _internals = require("@mui/x-date-pickers/internals");
var _useId = _interopRequireDefault(require("@mui/utils/useId"));
var _useEnrichedRangePickerFieldProps = require("../useEnrichedRangePickerFieldProps");
var _useRangePosition = require("../useRangePosition");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["props"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useMobileRangePicker = _ref => {
  let {
      props
    } = _ref,
    pickerParams = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
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
  } = (0, _useRangePosition.useRangePosition)(props);
  const labelId = (0, _useId.default)();
  const contextLocaleText = (0, _internals.useLocaleText)();
  const {
    open,
    actions,
    layoutProps,
    renderCurrentView,
    fieldProps: pickerFieldProps
  } = (0, _internals.usePicker)((0, _extends2.default)({}, pickerParams, {
    props,
    wrapperVariant: 'mobile',
    autoFocusView: true,
    additionalViewProps: {
      rangePosition,
      onRangePositionChange
    }
  }));
  const Field = slots.field;
  const fieldType = Field.fieldType ?? 'multi-input';
  const fieldProps = (0, _utils.useSlotProps)({
    elementType: Field,
    externalSlotProps: innerSlotProps?.field,
    additionalProps: (0, _extends2.default)({}, pickerFieldProps, {
      readOnly: readOnly ?? true,
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
  const isToolbarHidden = innerSlotProps?.toolbar?.hidden ?? false;
  const enrichedFieldProps = (0, _useEnrichedRangePickerFieldProps.useEnrichedRangePickerFieldProps)({
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
  const slotPropsForLayout = (0, _extends2.default)({}, innerSlotProps, {
    toolbar: (0, _extends2.default)({}, innerSlotProps?.toolbar, {
      titleId: labelId,
      rangePosition,
      onRangePositionChange
    })
  });
  const Layout = slots?.layout ?? _PickersLayout.PickersLayout;
  const finalLocaleText = (0, _extends2.default)({}, contextLocaleText, localeText);
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
  const slotProps = (0, _extends2.default)({}, innerSlotProps, {
    mobilePaper: (0, _extends2.default)({
      'aria-labelledby': labelledById
    }, innerSlotProps?.mobilePaper)
  });
  const renderPicker = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_LocalizationProvider.LocalizationProvider, {
    localeText: localeText,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Field, (0, _extends2.default)({}, enrichedFieldProps)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_internals.PickersModalDialog, (0, _extends2.default)({}, actions, {
      open: open,
      slots: slots,
      slotProps: slotProps,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Layout, (0, _extends2.default)({}, layoutProps, slotProps?.layout, {
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
exports.useMobileRangePicker = useMobileRangePicker;