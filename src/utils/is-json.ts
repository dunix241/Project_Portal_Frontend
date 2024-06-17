export function isJson(item: any): boolean {
  try {
    JSON.parse(item);
  } catch (e) {
    return false;
  }
  return true;
}