/* TODO: remove this when a clearable behavior for multiple input range fields is implemented */
export var excludeProps = function excludeProps(props, excludedProps) {
  return Object.keys(props).reduce(function (acc, key) {
    if (!excludedProps.includes(key)) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
};