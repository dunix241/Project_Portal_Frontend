import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["components", "componentsProps"];
import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { useDefaultDates, useUtils, applyDefaultDate, uncapitalizeObjectKeys } from '@mui/x-date-pickers/internals';
import { DateRangePickerToolbar } from './DateRangePickerToolbar';
export function useDateRangePickerDefaultizedProps(props, name) {
  var _themeProps$disableFu, _themeProps$disablePa, _themeProps$slots, _themeProps$slotProps;
  var utils = useUtils();
  var defaultDates = useDefaultDates();
  var _useThemeProps = useThemeProps({
      props: props,
      name: name
    }),
    components = _useThemeProps.components,
    componentsProps = _useThemeProps.componentsProps,
    themeProps = _objectWithoutProperties(_useThemeProps, _excluded);
  var localeText = React.useMemo(function () {
    var _themeProps$localeTex;
    if (((_themeProps$localeTex = themeProps.localeText) == null ? void 0 : _themeProps$localeTex.toolbarTitle) == null) {
      return themeProps.localeText;
    }
    return _extends({}, themeProps.localeText, {
      dateRangePickerToolbarTitle: themeProps.localeText.toolbarTitle
    });
  }, [themeProps.localeText]);
  return _extends({}, themeProps, {
    localeText: localeText,
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