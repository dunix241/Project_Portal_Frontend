import { isJson } from './is-json';

export function setItem(key: string, item: any): boolean {
  console.log(item);
  if (!isJson(item)) {
    item = JSON.stringify(item)
  }
  console.log(item);
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, item);
    return true;
  }

  console.error('localStorage is undefined')
  return false;
}

export function getItem(key: string, parsing: boolean = true): any {
  if (typeof window !== 'undefined') {
    const val = localStorage.getItem(key)
    return parsing ? JSON.parse(val) : val;
  }
  console.error('localStorage is undefined')
  return null
}