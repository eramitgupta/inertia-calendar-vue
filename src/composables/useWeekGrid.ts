import { computed } from 'vue'
import type { CalendarEvent } from '../types'
import { dateToString } from './useCalendar'
import { eventsForDate, eventTimeStyle, useTimeSlots } from './useEventLayout'

export function useWeekGrid(currentDate: () => Date, events: () => CalendarEvent[]) {
  const today = computed(() => dateToString(new Date()))
  const { hours, nowTop } = useTimeSlots()

  const weekDays = computed(() => {
    const start = new Date(currentDate())
    start.setDate(start.getDate() - start.getDay())

    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(start)
      day.setDate(day.getDate() + index)

      return day
    })
  })

  const eventsFor = (date: Date): CalendarEvent[] => eventsForDate(events(), date)

  return {
    eventsFor,
    eventStyle: eventTimeStyle,
    hours,
    nowTop,
    today,
    weekDays,
  }
}
