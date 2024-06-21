import { format } from 'date-fns';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function formatDate(date) {
  return date && format(new Date(date), 'dd/MM/yyyy')
}

export function formatDateTime(date) {
  return date && format(new Date(date), 'dd/MM/yyyy HH:mm')
}

export function toLocalDate(date) {
  return dayjs(date).utc().local().format()
}