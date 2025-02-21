import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["components", "componentsProps"];
import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { useDefaultDates, useUtils, applyDefaultDate, uncapitalizeObjectKeys } from '@mui/x-date-pickers/internals';
import { DateRangePickerToolbar } from './DateRangePickerToolbar';
export function useDateRangePickerDefaultizedProps(props, name) {
  var _themeProps$disableFu, _themeProps$disablePa, _themeProps$slots, _themeProps$slotProps;
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const _useThemeProps = useThemeProps({
      props,
      name
    }),
    {
      components,
      componentsProps
    } = _useThemeProps,
    themeProps = _objectWithoutPropertiesLoose(_useThemeProps, _excluded);
  const localeText = React.useMemo(() => {
    var _themeProps$localeTex;
    if (((_themeProps$localeTex = themeProps.localeText) == null ? void 0 : _themeProps$localeTex.toolbarTitle) == null) {
      return themeProps.localeText;
    }
    return _extends({}, themeProps.localeText, {
      dateRangePickerToolbarTitle: themeProps.localeText.toolbarTitle
    });
  }, [themeProps.localeText]);
  return _extends({}, themeProps, {
    localeText,
    disableFuture: (_themeProps$disableFu = themeProps.disableFuture) != null ? _themeProps$disableFu : false,
    disablePast: (_themeProps$disablePa = themeProps.disablePast) != null ? _themeProps$disablePa : false,
    minDate: applyDefaultDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, themeProps.maxDate, defaultDates.maxDate),
    slots: _extends({
      toolbar: DateRangePickerToolbar
    }, (_themeProps$slots = themeProps.slots) != null ? _themeProps$slots : uncapitalizeObjectKeys(components)),
    slotProps: (_themeProps$slotProps = themeProps.slotProps) != null ? _themeProps$slotProps : componentsProps
  });
}