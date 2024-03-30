export function isJson(item) {
  try {
    JSON.parse(item);
  } catch (e) {
    return false;
  }
  return true;
}