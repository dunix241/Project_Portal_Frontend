import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import { isEndOfRange, isStartOfRange } from '../internals/utils/date-utils';
var resolveDateFromTarget = function resolveDateFromTarget(target, utils, timezone) {
  var timestampString = target.dataset.timestamp;
  if (!timestampString) {
    return null;
  }
  var timestamp = +timestampString;
  return utils.dateWithTimezone(new Date(timestamp).toISOString(), timezone);
};
var isSameAsDraggingDate = function isSameAsDraggingDate(event) {
  var timestampString = event.target.dataset.timestamp;
  return timestampString === event.dataTransfer.getData('draggingDate');
};
var resolveButtonElement = function resolveButtonElement(element) {
  if (element) {
    if (element instanceof HTMLButtonElement && !element.disabled) {
      return element;
    }
    if (element.children.length) {
      return resolveButtonElement(element.children[0]);
    }
    return null;
  }
  return element;
};
var resolveElementFromTouch = function resolveElementFromTouch(event, ignoreTouchTarget) {
  var _event$changedTouches;
  // don't parse multi-touch result
  if (((_event$changedTouches = event.changedTouches) == null ? void 0 : _event$changedTouches.length) === 1 && event.touches.length <= 1) {
    var element = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    // `elementFromPoint` could have resolved preview div or wrapping div
    // might need to recursively find the nested button
    var buttonElement = resolveButtonElement(element);
    if (ignoreTouchTarget && buttonElement === event.changedTouches[0].target) {
      return null;
    }
    return buttonElement;
  }
  return null;
};
var useDragRangeEvents = function useDragRangeEvents(_ref) {
  var utils = _ref.utils,
    setRangeDragDay = _ref.setRangeDragDay,
    setIsDragging = _ref.setIsDragging,
    isDragging = _ref.isDragging,
    onDatePositionChange = _ref.onDatePositionChange,
    onDrop = _ref.onDrop,
    disableDragEditing = _ref.disableDragEditing,
    dateRange = _ref.dateRange,
    timezone = _ref.timezone;
  var emptyDragImgRef = React.useRef(null);
  React.useEffect(function () {
    // Preload the image - required for Safari support: https://stackoverflow.com/a/40923520/3303436
    emptyDragImgRef.current = document.createElement('img');
    emptyDragImgRef.current.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }, []);
  var isElementDraggable = function isElementDraggable(day) {
    if (day == null) {
      return false;
    }
    var shouldInitDragging = !disableDragEditing && !!dateRange[0] && !!dateRange[1];
    var isSelectedStartDate = isStartOfRange(utils, day, dateRange);
    var isSelectedEndDate = isEndOfRange(utils, day, dateRange);
    return shouldInitDragging && (isSelectedStartDate || isSelectedEndDate);
  };
  var handleDragStart = useEventCallback(function (event) {
    var newDate = resolveDateFromTarget(event.target, utils, timezone);
    if (!isElementDraggable(newDate)) {
      return;
    }
    event.stopPropagation();
    if (emptyDragImgRef.current) {
      event.dataTransfer.setDragImage(emptyDragImgRef.current, 0, 0);
    }
    setRangeDragDay(newDate);
    event.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
    var buttonDataset = event.target.dataset;
    if (buttonDataset.timestamp) {
      event.dataTransfer.setData('draggingDate', buttonDataset.timestamp);
    }
    if (buttonDataset.position) {
      onDatePositionChange(buttonDataset.position);
    }
  });
  var handleTouchStart = useEventCallback(function (event) {
    var target = resolveElementFromTouch(event);
    if (!target) {
      return;
    }
    var newDate = resolveDateFromTarget(target, utils, timezone);
    if (!isElementDraggable(newDate)) {
      return;
    }
    setRangeDragDay(newDate);
  });
  var handleDragEnter = useEventCallback(function (event) {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
    setRangeDragDay(resolveDateFromTarget(event.target, utils, timezone));
  });
  var handleTouchMove = useEventCallback(function (event) {
    var target = resolveElementFromTouch(event);
    if (!target) {
      return;
    }
    var newDate = resolveDateFromTarget(target, utils, timezone);
    if (newDate) {
      setRangeDragDay(newDate);
    }

    // this prevents initiating drag when user starts touchmove outside and then moves over a draggable element
    var targetsAreIdentical = target === event.changedTouches[0].target;
    if (!targetsAreIdentical || !isElementDraggable(newDate)) {
      return;
    }

    // on mobile we should only initialize dragging state after move is detected
    setIsDragging(true);
    var button = event.target;
    var buttonDataset = button.dataset;
    if (buttonDataset.position) {
      onDatePositionChange(buttonDataset.position);
    }
  });
  var handleDragLeave = useEventCallback(function (event) {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  });
  var handleDragOver = useEventCallback(function (event) {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
  });
  var handleTouchEnd = useEventCallback(function (event) {
    if (!isDragging) {
      return;
    }
    setRangeDragDay(null);
    setIsDragging(false);
    var target = resolveElementFromTouch(event, true);
    if (!target) {
      return;
    }

    // make sure the focused element is the element where touch ended
    target.focus();
    var newDate = resolveDateFromTarget(target, utils, timezone);
    if (newDate) {
      onDrop(newDate);
    }
  });
  var handleDragEnd = useEventCallback(function (event) {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    setRangeDragDay(null);
  });
  var handleDrop = useEventCallback(function (event) {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    setRangeDragDay(null);
    // make sure the focused element is the element where drop ended
    event.currentTarget.focus();
    if (isSameAsDraggingDate(event)) {
      return;
    }
    var newDate = resolveDateFromTarget(event.target, utils, timezone);
    if (newDate) {
      onDrop(newDate);
    }
  });
  return {
    onDragStart: handleDragStart,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    onDrop: handleDrop,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };
};
export var useDragRange = function useDragRange(_ref2) {
  var disableDragEditing = _ref2.disableDragEditing,
    utils = _ref2.utils,
    onDatePositionChange = _ref2.onDatePositionChange,
    onDrop = _ref2.onDrop,
    dateRange = _ref2.dateRange,
    timezone = _ref2.timezone;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isDragging = _React$useState2[0],
    setIsDragging = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    rangeDragDay = _React$useState4[0],
    setRangeDragDay = _React$useState4[1];
  var handleRangeDragDayChange = useEventCallback(function (val) {
    if (!utils.isEqual(val, rangeDragDay)) {
      setRangeDragDay(val);
    }
  });
  var draggingDatePosition = React.useMemo(function () {
    var _dateRange = _slicedToArray(dateRange, 2),
      start = _dateRange[0],
      end = _dateRange[1];
    if (rangeDragDay) {
      if (start && utils.isBefore(rangeDragDay, start)) {
        return 'start';
      }
      if (end && utils.isAfter(rangeDragDay, end)) {
        return 'end';
      }
    }
    return null;
  }, [dateRange, rangeDragDay, utils]);
  var dragRangeEvents = useDragRangeEvents({
    utils: utils,
    onDatePositionChange: onDatePositionChange,
    onDrop: onDrop,
    setIsDragging: setIsDragging,
    isDragging: isDragging,
    setRangeDragDay: handleRangeDragDayChange,
    disableDragEditing: disableDragEditing,
    dateRange: dateRange,
    timezone: timezone
  });
  return React.useMemo(function () {
    return _extends({
      isDragging: isDragging,
      rangeDragDay: rangeDragDay,
      draggingDatePosition: draggingDatePosition
    }, !disableDragEditing ? dragRangeEvents : {});
  }, [isDragging, rangeDragDay, draggingDatePosition, disableDragEditing, dragRangeEvents]);
};