import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["components", "componentsProps"];
import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { useDefaultDates, useUtils, applyDefaultDate, uncapitalizeObjectKeys } from '@mui/x-date-pickers/internals';
import { DateRangePickerToolbar } from './DateRangePickerToolbar';
export function useDateRangePickerDefaultizedProps(props, name) {
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
    if (themeProps.localeText?.toolbarTitle == null) {
      return themeProps.localeText;
    }
    return _extends({}, themeProps.localeText, {
      dateRangePickerToolbarTitle: themeProps.localeText.toolbarTitle
    });
  }, [themeProps.localeText]);
  return _extends({}, themeProps, {
    localeText,
    disableFuture: themeProps.disableFuture ?? false,
    disablePast: themeProps.disablePast ?? false,
    minDate: applyDefaultDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, themeProps.maxDate, defaultDates.maxDate),
    slots: _extends({
      toolbar: DateRangePickerToolbar
    }, themeProps.slots ?? uncapitalizeObjectKeys(components)),
    slotProps: themeProps.slotProps ?? componentsProps
  });
}