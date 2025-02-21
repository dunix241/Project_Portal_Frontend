"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEnrichedRangePickerFieldProps = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/base/utils");
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
var _useForkRef = _interopRequireDefault(require("@mui/utils/useForkRef"));
var _internals = require("@mui/x-date-pickers/internals");
const _excluded = ["clearable", "onClear"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useMultiInputFieldSlotProps = ({
  wrapperVariant,
  open,
  actions,
  readOnly,
  labelId,
  disableOpenPicker,
  onBlur,
  rangePosition,
  onRangePositionChange,
  localeText: inLocaleText,
  pickerSlotProps,
  pickerSlots,
  fieldProps,
  anchorRef
}) => {
  const localeText = (0, _internals.useLocaleText)();
  const startRef = React.useRef(null);
  const endRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) {
      return;
    }
    if (rangePosition === 'start') {
      startRef.current?.focus();
    } else if (rangePosition === 'end') {
      endRef.current?.focus();
    }
  }, [rangePosition, open]);
  const openRangeStartSelection = event => {
    event.stopPropagation();
    onRangePositionChange('start');
    if (!readOnly && !disableOpenPicker) {
      actions.onOpen();
    }
  };
  const openRangeEndSelection = event => {
    event.stopPropagation();
    onRangePositionChange('end');
    if (!readOnly && !disableOpenPicker) {
      actions.onOpen();
    }
  };
  const handleFocusStart = () => {
    if (open) {
      onRangePositionChange('start');
    }
  };
  const handleFocusEnd = () => {
    if (open) {
      onRangePositionChange('end');
    }
  };
  const slots = (0, _extends2.default)({
    textField: pickerSlots?.textField,
    root: pickerSlots?.fieldRoot,
    separator: pickerSlots?.fieldSeparator
  }, fieldProps.slots);
  const slotProps = (0, _extends2.default)({}, fieldProps.slotProps, {
    textField: ownerState => {
      const resolvedComponentProps = (0, _utils.resolveComponentProps)(pickerSlotProps?.textField, ownerState);
      let inputProps;
      let InputProps;
      if (ownerState.position === 'start') {
        inputProps = (0, _extends2.default)({
          inputRef: startRef,
          label: inLocaleText?.start ?? localeText.start,
          onKeyDown: (0, _internals.onSpaceOrEnter)(openRangeStartSelection),
          onFocus: handleFocusStart,
          focused: open ? rangePosition === 'start' : undefined
        }, !readOnly && !fieldProps.disabled && {
          onClick: openRangeStartSelection
        }, wrapperVariant === 'mobile' && {
          readOnly: true
        });
        if (anchorRef) {
          InputProps = (0, _extends2.default)({}, resolvedComponentProps?.InputProps, {
            ref: anchorRef
          });
        }
      } else {
        inputProps = (0, _extends2.default)({
          inputRef: endRef,
          label: inLocaleText?.end ?? localeText.end,
          onKeyDown: (0, _internals.onSpaceOrEnter)(openRangeEndSelection),
          onFocus: handleFocusEnd,
          focused: open ? rangePosition === 'end' : undefined
        }, !readOnly && !fieldProps.disabled && {
          onClick: openRangeEndSelection
        }, wrapperVariant === 'mobile' && {
          readOnly: true
        });
        InputProps = resolvedComponentProps?.InputProps;
      }
      return (0, _extends2.default)({}, labelId != null && {
        id: `${labelId}-${ownerState.position}`
      }, inputProps, (0, _utils.resolveComponentProps)(pickerSlotProps?.textField, ownerState), {
        InputProps
      });
    },
    root: ownerState => {
      const rootProps = {
        onBlur
      };
      return (0, _extends2.default)({}, rootProps, (0, _utils.resolveComponentProps)(pickerSlotProps?.fieldRoot, ownerState));
    },
    separator: pickerSlotProps?.fieldSeparator
  });

  /* TODO: remove this when a clearable behavior for multiple input range fields is implemented */
  const restFieldProps = (0, _objectWithoutPropertiesLoose2.default)(fieldProps, _excluded);
  const enrichedFieldProps = (0, _extends2.default)({}, restFieldProps, {
    slots,
    slotProps
  });
  return enrichedFieldProps;
};
const useSingleInputFieldSlotProps = ({
  wrapperVariant,
  open,
  actions,
  readOnly,
  inputRef: inInputRef,
  labelId,
  disableOpenPicker,
  label,
  onBlur,
  rangePosition,
  onRangePositionChange,
  singleInputFieldRef,
  pickerSlots,
  pickerSlotProps,
  fieldProps,
  anchorRef
}) => {
  const inputRef = React.useRef(null);
  const handleInputRef = (0, _useForkRef.default)(inInputRef, inputRef);
  const handleFieldRef = (0, _useForkRef.default)(fieldProps.unstableFieldRef, singleInputFieldRef);
  React.useEffect(() => {
    if (!open) {
      return;
    }
    inputRef.current?.focus();
  }, [rangePosition, open]);
  const updateRangePosition = () => {
    if (!singleInputFieldRef.current || inputRef.current !== (0, _internals.getActiveElement)(document)) {
      return;
    }
    const sections = singleInputFieldRef.current.getSections();
    const activeSectionIndex = singleInputFieldRef.current?.getActiveSectionIndex();
    const domRangePosition = activeSectionIndex == null || activeSectionIndex < sections.length / 2 ? 'start' : 'end';
    if (domRangePosition != null && domRangePosition !== rangePosition) {
      onRangePositionChange(domRangePosition);
    }
  };
  const handleSelectedSectionsChange = (0, _useEventCallback.default)(selectedSections => {
    setTimeout(updateRangePosition);
    fieldProps.onSelectedSectionsChange?.(selectedSections);
  });
  const openPicker = event => {
    event.stopPropagation();
    if (!readOnly && !disableOpenPicker) {
      actions.onOpen();
    }
  };
  const slots = (0, _extends2.default)({}, fieldProps.slots, {
    textField: pickerSlots?.textField,
    clearButton: pickerSlots?.clearButton,
    clearIcon: pickerSlots?.clearIcon
  });
  const slotProps = (0, _extends2.default)({}, fieldProps.slotProps, {
    textField: pickerSlotProps?.textField,
    clearButton: pickerSlots?.clearButton,
    clearIcon: pickerSlots?.clearIcon
  });
  const enrichedFieldProps = (0, _extends2.default)({}, fieldProps, {
    slots,
    slotProps,
    label,
    unstableFieldRef: handleFieldRef,
    inputRef: handleInputRef,
    onKeyDown: (0, _internals.onSpaceOrEnter)(openPicker, fieldProps.onKeyDown),
    onSelectedSectionsChange: handleSelectedSectionsChange,
    onBlur,
    InputProps: (0, _extends2.default)({
      ref: anchorRef
    }, fieldProps?.InputProps),
    focused: open
  }, labelId != null && {
    id: labelId
  }, wrapperVariant === 'mobile' && {
    readOnly: true
  }, !readOnly && !fieldProps.disabled && {
    onClick: openPicker
  });
  return enrichedFieldProps;
};
const useEnrichedRangePickerFieldProps = params => {
  /* eslint-disable react-hooks/rules-of-hooks */
  if (process.env.NODE_ENV !== 'production') {
    const fieldTypeRef = React.useRef(params.fieldType);
    if (params.fieldType !== fieldTypeRef.current) {
      console.error('Should not switch between a multi input field and a single input field on a range picker.');
    }
  }
  if (params.fieldType === 'multi-input') {
    return useMultiInputFieldSlotProps(params);
  }
  return useSingleInputFieldSlotProps(params);
  /* eslint-enable react-hooks/rules-of-hooks */
};
exports.useEnrichedRangePickerFieldProps = useEnrichedRangePickerFieldProps;