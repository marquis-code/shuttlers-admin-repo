import {
  differenceInDays,
  endOfMonth,
  startOfMonth,
  isLastDayOfMonth,
  lastDayOfMonth,
  format,
  eachDayOfInterval,
  parseISO,
  getWeek,
  getWeekOfMonth
} from 'date-fns'
import _ from 'lodash'

interface RatingData {
  parameter_id: number;
  [key: string]: any;
}

interface BookingData {
  date: string;
  [key: string]: any;
}

export const joinWithRatingsData = (array1: any[], array2: RatingData[]): any[] => {
  const keys = _.keys(array2[0])
  const vals = _.map(keys, () => '')

  return _.map(array1, (item1) => {
    const found = _.find(array2, (item2) => item1.id === item2.parameter_id)

    if (found) {
      return _.merge({}, item1, found)
    }

    return _.merge({}, item1, _.zipObject(keys, vals))
  })
}

export function getDatesInMonth(date: Date): string[] {
  const firstDayInMonth = format(startOfMonth(date), 'yyyy-MM-dd')
  let lastDayInMonth = format(lastDayOfMonth(date), 'yyyy-MM-dd')
  if (isInLastWeekOfMonth(date)) {
    const eom = endOfMonth(date)
    const nextMonthStart = new Date(eom)
    nextMonthStart.setDate(eom.getDate() + 1)
    lastDayInMonth = format(lastDayOfMonth(nextMonthStart), 'yyyy-MM-dd')
  }
  const results = eachDayOfInterval({ start: parseISO(firstDayInMonth), end: parseISO(lastDayInMonth) })
  const dates = results.map((date) => format(date, 'yyyy-MM-dd'))
  return dates
}

export function isInLastWeekOfMonth(date: Date): boolean {
  const eom = endOfMonth(date)
  const res = differenceInDays(eom, date)
  return res <= 7
}

export function getDatesInRange(startDate: string, endDate: string): string[] {
  const results = eachDayOfInterval({ start: parseISO(startDate), end: parseISO(endDate) })
  const dates = results.map((date) => format(date, 'yyyy-MM-dd'))
  return dates
}

export const formatToWeekDay = (day) => {
      return format(new Date(day), 'EEEE')
    }
export function getWeeklyBookings(bookingsData: BookingData[]): BookingData[][] {
  let currentWeek = getWeek(parseISO(bookingsData[0].date), { weekStartsOn: 1 })

  const clusterOfWeeklyBookings: BookingData[][] = []
  let week: BookingData[] = []

  bookingsData.forEach((booking) => {
    if (getWeek(parseISO(booking.date), { weekStartsOn: 1 }) === currentWeek) {
      week.push(booking)
    } else {
      clusterOfWeeklyBookings.push(week)

      week = []
      week.push(booking)
      currentWeek++
    }
  })
  clusterOfWeeklyBookings.push(week)

  return clusterOfWeeklyBookings
}

export function getCurrentWeek(): number {
  const week = getWeekOfMonth(new Date(), { weekStartsOn: 1 })
  return week
}

export function isTokenExpired(expiry: number): boolean {
  return Date.now() >= expiry * 1000
}

export const NAIRA = '₦'
export const NAIRA_UNICODE = '\u20A6'

interface CurrencyFormatOptions {
  countryCode?: string;
  currencyCode?: string;
}

export function formatNumberToMoney(
  number = 0,
  decimals = 0,
  { countryCode = 'NG', currencyCode }: CurrencyFormatOptions = {}
): string {
  const formatter = new Intl.NumberFormat(`en-${countryCode}`, {
    style: currencyCode ? 'currency' : 'decimal',
    currency: currencyCode,
    minimumFractionDigits: decimals
  })
  return formatter.format(number ? Number(number.toFixed(decimals)) : 0)
}

export function convertCurrencyFormatToNumbers(currencyText: string): number | undefined {
  if (currencyText && typeof currencyText === 'string') {
    return parseFloat(currencyText.replace(/[\u20A6₦,]/gi, ''))
  }
}

export function formatNumberAsCurrencyText(number: number): string {
  return number || number === 0 ? `${NAIRA}${formatNumberToMoney(number)}` : 'N/A'
}

export const extractErrorMessage = (error: any, defaultMessage: string | null = null): string => {
  return error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : defaultMessage || error.toString()
}

interface FilterOption {
  fname: string;
  lname: string;
  email: string;
  [key: string]: any;
}

export const filterDriverBy = (option: FilterOption, label: string, search: string): boolean => {
  return (
    (label && !!option[label]
      ? option[label].toLocaleLowerCase().includes(search.toLocaleLowerCase())
      : false) ||
    `${option.fname} ${option.lname} ${option.email}`.toLowerCase().includes(search.toLowerCase())
  )
}

interface VehicleOption {
  brand: string;
  name: string;
  registration_number: string;
  [key: string]: any;
}

export const filterVehicleBy = (option: VehicleOption, label: string, search: string): boolean => {
  return (
    (label && !!option[label]
      ? option[label].toLocaleLowerCase().includes((search || '').toLocaleLowerCase())
      : false) ||
    `${option.brand} ${option.name} ${option.registration_number}`.toLowerCase().includes((search || '').toLocaleLowerCase())
  )
}

export function loadRouteComponent(path: string): () => Promise<any> {
  return () => import(/* webpackChunkName: "app-view-[request]" */ `@/views/${path}.vue`)
}

export const monitizeValue = (amount: number | string, currency = 'NGN'): string => {
  if (typeof amount === 'string') amount = Number(amount)
  const currencySymbol = '₦' // TODO: Get symbol based on currency parameter
    if (amount !== null && typeof amount === 'number') {
      // @ts-ignore
    return `${currencySymbol} ${parseFloat(amount.toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
  } else {
    return 'N/A'
  }
}

export function timeSince(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' years'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' months'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minutes'
  }
  return Math.floor(seconds) + ' seconds'
}
