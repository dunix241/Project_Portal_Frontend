import { format } from 'date-fns';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function formatDate(date, fmt) {
  return date && format(new Date(date), fmt || 'dd/MM/yyyy')
}

export function formatDateTime(date, includeTimezone) {
  return date && format(new Date(`${date}Z`), 'dd/MM/yyyy HH:mm')
}

export function toLocalDate(date) {
  return dayjs(date).utc().local().format()
}