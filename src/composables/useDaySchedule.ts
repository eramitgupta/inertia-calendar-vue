import { computed } from 'vue'
import type { CalendarEvent } from '../types'
import { dateToString } from './useCalendar'
import { eventsForDate, eventTimeStyle, useTimeSlots } from './useEventLayout'

export function useDaySchedule(currentDate: () => Date, events: () => CalendarEvent[]) {
  const date = computed(() => dateToString(currentDate()))
  const today = computed(() => dateToString(new Date()))
  const dayEvents = computed(() => eventsForDate(events(), date.value))
  const { hours, nowTop } = useTimeSlots()

  return {
    date,
    dayEvents,
    eventStyle: eventTimeStyle,
    hours,
    nowTop,
    today,
  }
}
