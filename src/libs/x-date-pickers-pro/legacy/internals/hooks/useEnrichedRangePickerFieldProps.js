import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["clearable", "onClear"];
import * as React from 'react';
import { resolveComponentProps } from '@mui/base/utils';
import useEventCallback from '@mui/utils/useEventCallback';
import useForkRef from '@mui/utils/useForkRef';
import { onSpaceOrEnter, useLocaleText, getActiveElement } from '@mui/x-date-pickers/internals';
var useMultiInputFieldSlotProps = function useMultiInputFieldSlotProps(_ref) {
  var wrapperVariant = _ref.wrapperVariant,
    open = _ref.open,
    actions = _ref.actions,
    readOnly = _ref.readOnly,
    labelId = _ref.labelId,
    disableOpenPicker = _ref.disableOpenPicker,
    onBlur = _ref.onBlur,
    rangePosition = _ref.rangePosition,
    onRangePositionChange = _ref.onRangePositionChange,
    inLocaleText = _ref.localeText,
    pickerSlotProps = _ref.pickerSlotProps,
    pickerSlots = _ref.pickerSlots,
    fieldProps = _ref.fieldProps,
    anchorRef = _ref.anchorRef;
  var localeText = useLocaleText();
  var startRef = React.useRef(null);
  var endRef = React.useRef(null);
  React.useEffect(function () {
    if (!open) {
      return;
    }
    if (rangePosition === 'start') {
      var _startRef$current;
      (_startRef$current = startRef.current) == null || _startRef$current.focus();
    } else if (rangePosition === 'end') {
      var _endRef$current;
      (_endRef$current = endRef.current) == null || _endRef$current.focus();
    }
  }, [rangePosition, open]);
  var openRangeStartSelection = function openRangeStartSelection(event) {
    event.stopPropagation();
    onRangePositionChange('start');
    if (!readOnly && !disableOpenPicker) {
      actions.onOpen();
    }
  };
  var openRangeEndSelection = function openRangeEndSelection(event) {
    event.stopPropagation();
    onRangePositionChange('end');
    if (!readOnly && !disableOpenPicker) {
      actions.onOpen();
    }
  };
  var handleFocusStart = function handleFocusStart() {
    if (open) {
      onRangePositionChange('start');
    }
  };
  var handleFocusEnd = function handleFocusEnd() {
    if (open) {
      onRangePositionChange('end');
    }
  };
  var slots = _extends({
    textField: pickerSlots == null ? void 0 : pickerSlots.textField,
    root: pickerSlots == null ? void 0 : pickerSlots.fieldRoot,
    separator: pickerSlots == null ? void 0 : pickerSlots.fieldSeparator
  }, fieldProps.slots);
  var slotProps = _extends({}, fieldProps.slotProps, {
    textField: function textField(ownerState) {
      var resolvedComponentProps = resolveComponentProps(pickerSlotProps == null ? void 0 : pickerSlotProps.textField, ownerState);
      var inputProps;
      var InputProps;
      if (ownerState.position === 'start') {
        var _inLocaleText$start;
        inputProps = _extends({
          inputRef: startRef,
          label: (_inLocaleText$start = inLocaleText == null ? void 0 : inLocaleText.start) != null ? _inLocaleText$start : localeText.start,
          onKeyDown: onSpaceOrEnter(openRangeStartSelection),
          onFocus: handleFocusStart,
          focused: open ? rangePosition === 'start' : undefined
        }, !readOnly && !fieldProps.disabled && {
          onClick: openRangeStartSelection
        }, wrapperVariant === 'mobile' && {
          readOnly: true
        });
        if (anchorRef) {
          InputProps = _extends({}, resolvedComponentProps == null ? void 0 : resolvedComponentProps.InputProps, {
            ref: anchorRef
          });
        }
      } else {
        var _inLocaleText$end;
        inputProps = _extends({
          inputRef: endRef,
          label: (_inLocaleText$end = inLocaleText == null ? void 0 : inLocaleText.end) != null ? _inLocaleText$end : localeText.end,
          onKeyDown: onSpaceOrEnter(openRangeEndSelection),
          onFocus: handleFocusEnd,
          focused: open ? rangePosition === 'end' : undefined
        }, !readOnly && !fieldProps.disabled && {
          onClick: openRangeEndSelection
        }, wrapperVariant === 'mobile' && {
          readOnly: true
        });
        InputProps = resolvedComponentProps == null ? void 0 : resolvedComponentProps.InputProps;
      }
      return _extends({}, labelId != null && {
        id: "".concat(labelId, "-").concat(ownerState.position)
      }, inputProps, resolveComponentProps(pickerSlotProps == null ? void 0 : pickerSlotProps.textField, ownerState), {
        InputProps: InputProps
      });
    },
    root: function root(ownerState) {
      var rootProps = {
        onBlur: onBlur
      };
      return _extends({}, rootProps, resolveComponentProps(pickerSlotProps == null ? void 0 : pickerSlotProps.fieldRoot, ownerState));
    },
    separator: pickerSlotProps == null ? void 0 : pickerSlotProps.fieldSeparator
  });

  /* TODO: remove this when a clearable behavior for multiple input range fields is implemented */
  var clearable = fieldProps.clearable,
    onClear = fieldProps.onClear,
    restFieldProps = _objectWithoutProperties(fieldProps, _excluded);
  var enrichedFieldProps = _extends({}, restFieldProps, {
    slots: slots,
    slotProps: slotProps
  });
  return enrichedFieldProps;
};
var useSingleInputFieldSlotProps = function useSingleInputFieldSlotProps(_ref2) {
  var wrapperVariant = _ref2.wrapperVariant,
    open = _ref2.open,
    actions = _ref2.actions,
    readOnly = _ref2.readOnly,
    inInputRef = _ref2.inputRef,
    labelId = _ref2.labelId,
    disableOpenPicker = _ref2.disableOpenPicker,
    label = _ref2.label,
    onBlur = _ref2.onBlur,
    rangePosition = _ref2.rangePosition,
    onRangePositionChange = _ref2.onRangePositionChange,
    singleInputFieldRef = _ref2.singleInputFieldRef,
    pickerSlots = _ref2.pickerSlots,
    pickerSlotProps = _ref2.pickerSlotProps,
    fieldProps = _ref2.fieldProps,
    anchorRef = _ref2.anchorRef;
  var inputRef = React.useRef(null);
  var handleInputRef = useForkRef(inInputRef, inputRef);
  var handleFieldRef = useForkRef(fieldProps.unstableFieldRef, singleInputFieldRef);
  React.useEffect(function () {
    var _inputRef$current;
    if (!open) {
      return;
    }
    (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
  }, [rangePosition, open]);
  var updateRangePosition = function updateRangePosition() {
    var _singleInputFieldRef$;
    if (!singleInputFieldRef.current || inputRef.current !== getActiveElement(document)) {
      return;
    }
    var sections = singleInputFieldRef.current.getSections();
    var activeSectionIndex = (_singleInputFieldRef$ = singleInputFieldRef.current) == null ? void 0 : _singleInputFieldRef$.getActiveSectionIndex();
    var domRangePosition = activeSectionIndex == null || activeSectionIndex < sections.length / 2 ? 'start' : 'end';
    if (domRangePosition != null && domRangePosition !== rangePosition) {
      onRangePositionChange(domRangePosition);
    }
  };
  var handleSelectedSectionsChange = useEventCallback(function (selectedSections) {
    var _fieldProps$onSelecte;
    setTimeout(updateRangePosition);
    (_fieldProps$onSelecte = fieldProps.onSelectedSectionsChange) == null || _fieldProps$onSelecte.call(fieldProps, selectedSections);
  });
  var openPicker = function openPicker(event) {
    event.stopPropagation();
    if (!readOnly && !disableOpenPicker) {
      actions.onOpen();
    }
  };
  var slots = _extends({}, fieldProps.slots, {
    textField: pickerSlots == null ? void 0 : pickerSlots.textField,
    clearButton: pickerSlots == null ? void 0 : pickerSlots.clearButton,
    clearIcon: pickerSlots == null ? void 0 : pickerSlots.clearIcon
  });
  var slotProps = _extends({}, fieldProps.slotProps, {
    textField: pickerSlotProps == null ? void 0 : pickerSlotProps.textField,
    clearButton: pickerSlots == null ? void 0 : pickerSlots.clearButton,
    clearIcon: pickerSlots == null ? void 0 : pickerSlots.clearIcon
  });
  var enrichedFieldProps = _extends({}, fieldProps, {
    slots: slots,
    slotProps: slotProps,
    label: label,
    unstableFieldRef: handleFieldRef,
    inputRef: handleInputRef,
    onKeyDown: onSpaceOrEnter(openPicker, fieldProps.onKeyDown),
    onSelectedSectionsChange: handleSelectedSectionsChange,
    onBlur: onBlur,
    InputProps: _extends({
      ref: anchorRef
    }, fieldProps == null ? void 0 : fieldProps.InputProps),
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
export var useEnrichedRangePickerFieldProps = function useEnrichedRangePickerFieldProps(params) {
  /* eslint-disable react-hooks/rules-of-hooks */
  if (process.env.NODE_ENV !== 'production') {
    var fieldTypeRef = React.useRef(params.fieldType);
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