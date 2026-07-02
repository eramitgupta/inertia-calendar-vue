import { computed } from 'vue'
import type { CalendarEvent } from '../types'
import { dateToString } from './useCalendar'
import { eventsForDate } from './useEventLayout'

interface MonthCell {
  date: Date
  events: CalendarEvent[]
  other: boolean
  today: boolean
  value: string
}

export function useMonthGrid(currentDate: () => Date, events: () => CalendarEvent[]) {
  const cells = computed(() => {
    const year = currentDate().getFullYear()
    const month = currentDate().getMonth()
    const first = new Date(year, month, 1).getDay()
    const start = new Date(year, month, 1 - first)
    const today = dateToString(new Date())

    return Array.from({ length: 42 }, (_, index): MonthCell => {
      const date = new Date(start)
      date.setDate(date.getDate() + index)
      const value = dateToString(date)

      return {
        date,
        events: eventsForDate(events(), value),
        other: date.getMonth() !== month,
        today: value === today,
        value,
      }
    })
  })

  return {
    cells,
  }
}
