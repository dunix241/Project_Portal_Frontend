"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReleaseInfo = void 0;
var _utils = require("@mui/utils");
const getReleaseInfo = () => {
  const releaseInfo = "MTcwMTk5MDAwMDAwMA==";
  if (process.env.NODE_ENV !== 'production') {
    // A simple hack to set the value in the test environment (has no build step).
    // eslint-disable-next-line no-useless-concat
    if (releaseInfo === '__RELEASE' + '_INFO__') {
      // eslint-disable-next-line no-underscore-dangle
      return _utils.ponyfillGlobal.__MUI_RELEASE_INFO__;
    }
  }
  return releaseInfo;
};
exports.getReleaseInfo = getReleaseInfo;