import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["clearable", "onClear"];
import * as React from 'react';
import { resolveComponentProps } from '@mui/base/utils';
import useEventCallback from '@mui/utils/useEventCallback';
import useForkRef from '@mui/utils/useForkRef';
import { onSpaceOrEnter, useLocaleText, getActiveElement } from '@mui/x-date-pickers/internals';
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
  const localeText = useLocaleText();
  const startRef = React.useRef(null);
  const endRef = React.useRef(null);
  React.useEffect(() => {
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
  const slots = _extends({
    textField: pickerSlots == null ? void 0 : pickerSlots.textField,
    root: pickerSlots == null ? void 0 : pickerSlots.fieldRoot,
    separator: pickerSlots == null ? void 0 : pickerSlots.fieldSeparator
  }, fieldProps.slots);
  const slotProps = _extends({}, fieldProps.slotProps, {
    textField: ownerState => {
      const resolvedComponentProps = resolveComponentProps(pickerSlotProps == null ? void 0 : pickerSlotProps.textField, ownerState);
      let inputProps;
      let InputProps;
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
        id: `${labelId}-${ownerState.position}`
      }, inputProps, resolveComponentProps(pickerSlotProps == null ? void 0 : pickerSlotProps.textField, ownerState), {
        InputProps
      });
    },
    root: ownerState => {
      const rootProps = {
        onBlur
      };
      return _extends({}, rootProps, resolveComponentProps(pickerSlotProps == null ? void 0 : pickerSlotProps.fieldRoot, ownerState));
    },
    separator: pickerSlotProps == null ? void 0 : pickerSlotProps.fieldSeparator
  });

  /* TODO: remove this when a clearable behavior for multiple input range fields is implemented */
  const restFieldProps = _objectWithoutPropertiesLoose(fieldProps, _excluded);
  const enrichedFieldProps = _extends({}, restFieldProps, {
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
  const handleInputRef = useForkRef(inInputRef, inputRef);
  const handleFieldRef = useForkRef(fieldProps.unstableFieldRef, singleInputFieldRef);
  React.useEffect(() => {
    var _inputRef$current;
    if (!open) {
      return;
    }
    (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
  }, [rangePosition, open]);
  const updateRangePosition = () => {
    var _singleInputFieldRef$;
    if (!singleInputFieldRef.current || inputRef.current !== getActiveElement(document)) {
      return;
    }
    const sections = singleInputFieldRef.current.getSections();
    const activeSectionIndex = (_singleInputFieldRef$ = singleInputFieldRef.current) == null ? void 0 : _singleInputFieldRef$.getActiveSectionIndex();
    const domRangePosition = activeSectionIndex == null || activeSectionIndex < sections.length / 2 ? 'start' : 'end';
    if (domRangePosition != null && domRangePosition !== rangePosition) {
      onRangePositionChange(domRangePosition);
    }
  };
  const handleSelectedSectionsChange = useEventCallback(selectedSections => {
    var _fieldProps$onSelecte;
    setTimeout(updateRangePosition);
    (_fieldProps$onSelecte = fieldProps.onSelectedSectionsChange) == null || _fieldProps$onSelecte.call(fieldProps, selectedSections);
  });
  const openPicker = event => {
    event.stopPropagation();
    if (!readOnly && !disableOpenPicker) {
      actions.onOpen();
    }
  };
  const slots = _extends({}, fieldProps.slots, {
    textField: pickerSlots == null ? void 0 : pickerSlots.textField,
    clearButton: pickerSlots == null ? void 0 : pickerSlots.clearButton,
    clearIcon: pickerSlots == null ? void 0 : pickerSlots.clearIcon
  });
  const slotProps = _extends({}, fieldProps.slotProps, {
    textField: pickerSlotProps == null ? void 0 : pickerSlotProps.textField,
    clearButton: pickerSlots == null ? void 0 : pickerSlots.clearButton,
    clearIcon: pickerSlots == null ? void 0 : pickerSlots.clearIcon
  });
  const enrichedFieldProps = _extends({}, fieldProps, {
    slots,
    slotProps,
    label,
    unstableFieldRef: handleFieldRef,
    inputRef: handleInputRef,
    onKeyDown: onSpaceOrEnter(openPicker, fieldProps.onKeyDown),
    onSelectedSectionsChange: handleSelectedSectionsChange,
    onBlur,
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
export const useEnrichedRangePickerFieldProps = params => {
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