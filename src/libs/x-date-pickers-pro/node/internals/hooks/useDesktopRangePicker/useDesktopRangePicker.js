"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDesktopRangePicker = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/base/utils");
var _LocalizationProvider = require("@mui/x-date-pickers/LocalizationProvider");
var _PickersLayout = require("@mui/x-date-pickers/PickersLayout");
var _internals = require("@mui/x-date-pickers/internals");
var _useEnrichedRangePickerFieldProps = require("../useEnrichedRangePickerFieldProps");
var _useRangePosition = require("../useRangePosition");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["props"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useDesktopRangePicker = _ref => {
  let {
      props
    } = _ref,
    pickerParams = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
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
  } = (0, _useRangePosition.useRangePosition)(props);
  const {
    open,
    actions,
    layoutProps,
    renderCurrentView,
    shouldRestoreFocus,
    fieldProps: pickerFieldProps
  } = (0, _internals.usePicker)((0, _extends2.default)({}, pickerParams, {
    props,
    wrapperVariant: 'desktop',
    autoFocusView: true,
    additionalViewProps: {
      rangePosition,
      onRangePositionChange
    }
  }));
  const handleBlur = () => {
    (0, _internals.executeInTheNextEventLoopTick)(() => {
      if (fieldContainerRef.current?.contains((0, _internals.getActiveElement)(document)) || popperRef.current?.contains((0, _internals.getActiveElement)(document))) {
        return;
      }
      actions.onDismiss();
    });
  };
  const Field = slots.field;
  const fieldType = Field.fieldType ?? 'multi-input';
  const fieldProps = (0, _utils.useSlotProps)({
    elementType: Field,
    externalSlotProps: slotProps?.field,
    additionalProps: (0, _extends2.default)({}, pickerFieldProps, {
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
  const enrichedFieldProps = (0, _useEnrichedRangePickerFieldProps.useEnrichedRangePickerFieldProps)({
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
  const slotPropsForLayout = (0, _extends2.default)({}, slotProps, {
    toolbar: (0, _extends2.default)({}, slotProps?.toolbar, {
      rangePosition,
      onRangePositionChange
    })
  });
  const Layout = slots?.layout ?? _PickersLayout.PickersLayout;
  const renderPicker = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_LocalizationProvider.LocalizationProvider, {
    localeText: localeText,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Field, (0, _extends2.default)({}, enrichedFieldProps)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_internals.PickersPopper, (0, _extends2.default)({
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
exports.useDesktopRangePicker = useDesktopRangePicker;