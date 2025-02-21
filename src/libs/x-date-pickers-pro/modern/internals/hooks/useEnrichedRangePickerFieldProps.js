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
  const slots = _extends({
    textField: pickerSlots?.textField,
    root: pickerSlots?.fieldRoot,
    separator: pickerSlots?.fieldSeparator
  }, fieldProps.slots);
  const slotProps = _extends({}, fieldProps.slotProps, {
    textField: ownerState => {
      const resolvedComponentProps = resolveComponentProps(pickerSlotProps?.textField, ownerState);
      let inputProps;
      let InputProps;
      if (ownerState.position === 'start') {
        inputProps = _extends({
          inputRef: startRef,
          label: inLocaleText?.start ?? localeText.start,
          onKeyDown: onSpaceOrEnter(openRangeStartSelection),
          onFocus: handleFocusStart,
          focused: open ? rangePosition === 'start' : undefined
        }, !readOnly && !fieldProps.disabled && {
          onClick: openRangeStartSelection
        }, wrapperVariant === 'mobile' && {
          readOnly: true
        });
        if (anchorRef) {
          InputProps = _extends({}, resolvedComponentProps?.InputProps, {
            ref: anchorRef
          });
        }
      } else {
        inputProps = _extends({
          inputRef: endRef,
          label: inLocaleText?.end ?? localeText.end,
          onKeyDown: onSpaceOrEnter(openRangeEndSelection),
          onFocus: handleFocusEnd,
          focused: open ? rangePosition === 'end' : undefined
        }, !readOnly && !fieldProps.disabled && {
          onClick: openRangeEndSelection
        }, wrapperVariant === 'mobile' && {
          readOnly: true
        });
        InputProps = resolvedComponentProps?.InputProps;
      }
      return _extends({}, labelId != null && {
        id: `${labelId}-${ownerState.position}`
      }, inputProps, resolveComponentProps(pickerSlotProps?.textField, ownerState), {
        InputProps
      });
    },
    root: ownerState => {
      const rootProps = {
        onBlur
      };
      return _extends({}, rootProps, resolveComponentProps(pickerSlotProps?.fieldRoot, ownerState));
    },
    separator: pickerSlotProps?.fieldSeparator
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
    if (!open) {
      return;
    }
    inputRef.current?.focus();
  }, [rangePosition, open]);
  const updateRangePosition = () => {
    if (!singleInputFieldRef.current || inputRef.current !== getActiveElement(document)) {
      return;
    }
    const sections = singleInputFieldRef.current.getSections();
    const activeSectionIndex = singleInputFieldRef.current?.getActiveSectionIndex();
    const domRangePosition = activeSectionIndex == null || activeSectionIndex < sections.length / 2 ? 'start' : 'end';
    if (domRangePosition != null && domRangePosition !== rangePosition) {
      onRangePositionChange(domRangePosition);
    }
  };
  const handleSelectedSectionsChange = useEventCallback(selectedSections => {
    setTimeout(updateRangePosition);
    fieldProps.onSelectedSectionsChange?.(selectedSections);
  });
  const openPicker = event => {
    event.stopPropagation();
    if (!readOnly && !disableOpenPicker) {
      actions.onOpen();
    }
  };
  const slots = _extends({}, fieldProps.slots, {
    textField: pickerSlots?.textField,
    clearButton: pickerSlots?.clearButton,
    clearIcon: pickerSlots?.clearIcon
  });
  const slotProps = _extends({}, fieldProps.slotProps, {
    textField: pickerSlotProps?.textField,
    clearButton: pickerSlots?.clearButton,
    clearIcon: pickerSlots?.clearIcon
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