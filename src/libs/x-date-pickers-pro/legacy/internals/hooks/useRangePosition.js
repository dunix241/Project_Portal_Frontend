import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import useControlled from '@mui/utils/useControlled';
import useEventCallback from '@mui/utils/useEventCallback';
export var useRangePosition = function useRangePosition(props) {
  var _props$defaultRangePo;
  var singleInputFieldRef = React.useRef();
  var _useControlled = useControlled({
      name: 'useRangePosition',
      state: 'rangePosition',
      controlled: props.rangePosition,
      default: (_props$defaultRangePo = props.defaultRangePosition) != null ? _props$defaultRangePo : 'start'
    }),
    _useControlled2 = _slicedToArray(_useControlled, 2),
    rangePosition = _useControlled2[0],
    setRangePosition = _useControlled2[1];

  // When using a single input field,
  // we want to select the 1st section of the edited date when updating the range position.
  var syncRangePositionWithSingleInputField = function syncRangePositionWithSingleInputField(newRangePosition) {
    if (singleInputFieldRef.current == null) {
      return;
    }
    var sections = singleInputFieldRef.current.getSections();
    var targetActiveSectionIndex = newRangePosition === 'start' ? 0 : sections.length / 2;
    singleInputFieldRef.current.setSelectedSections(targetActiveSectionIndex);
  };
  var handleRangePositionChange = useEventCallback(function (newRangePosition) {
    var _props$onRangePositio;
    setRangePosition(newRangePosition);
    (_props$onRangePositio = props.onRangePositionChange) == null || _props$onRangePositio.call(props, newRangePosition);
    syncRangePositionWithSingleInputField(newRangePosition);
  });
  return {
    rangePosition: rangePosition,
    onRangePositionChange: handleRangePositionChange,
    singleInputFieldRef: singleInputFieldRef
  };
};