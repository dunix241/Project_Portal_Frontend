"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRangePosition = void 0;
var React = _interopRequireWildcard(require("react"));
var _useControlled = _interopRequireDefault(require("@mui/utils/useControlled"));
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useRangePosition = props => {
  const singleInputFieldRef = React.useRef();
  const [rangePosition, setRangePosition] = (0, _useControlled.default)({
    name: 'useRangePosition',
    state: 'rangePosition',
    controlled: props.rangePosition,
    default: props.defaultRangePosition ?? 'start'
  });

  // When using a single input field,
  // we want to select the 1st section of the edited date when updating the range position.
  const syncRangePositionWithSingleInputField = newRangePosition => {
    if (singleInputFieldRef.current == null) {
      return;
    }
    const sections = singleInputFieldRef.current.getSections();
    const targetActiveSectionIndex = newRangePosition === 'start' ? 0 : sections.length / 2;
    singleInputFieldRef.current.setSelectedSections(targetActiveSectionIndex);
  };
  const handleRangePositionChange = (0, _useEventCallback.default)(newRangePosition => {
    setRangePosition(newRangePosition);
    props.onRangePositionChange?.(newRangePosition);
    syncRangePositionWithSingleInputField(newRangePosition);
  });
  return {
    rangePosition,
    onRangePositionChange: handleRangePositionChange,
    singleInputFieldRef
  };
};
exports.useRangePosition = useRangePosition;