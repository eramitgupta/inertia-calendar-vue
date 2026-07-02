import type { CalendarView } from './types'

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

export const shortDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const

export const swatchColors = ['#378ADD', '#1D9E75', '#D85A30', '#D4537E', '#7F77DD', '#BA7517', '#E24B4A', '#444441'] as const

export const views: CalendarView[] = ['month', 'week', 'day', 'agenda']
