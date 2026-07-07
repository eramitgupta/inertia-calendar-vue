import { computed } from 'vue'
import type { CalendarEvent } from '../types'
import { dateToString, timeToMinutes } from './useCalendar'

const slotHeight = 48

export const eventKey = (event: CalendarEvent): string | number =>
  event.id ?? `${event.date}-${event.start}-${event.title}`

export const eventTimeStyle = (
  event: CalendarEvent,
  minimumHeight = 20,
): Record<string, string> => ({
  top: `${(timeToMinutes(event.start) * slotHeight) / 60}px`,
  height: `${Math.max(((timeToMinutes(event.end) - timeToMinutes(event.start)) * slotHeight) / 60, minimumHeight)}px`,
  background: `${event.color}22`,
  color: event.color,
  borderLeft: `3px solid ${event.color}`,
})

export const sortEventsByTime = (events: CalendarEvent[]): CalendarEvent[] =>
  [...events].sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start))

export const eventsForDate = (events: CalendarEvent[], date: Date | string): CalendarEvent[] => {
  const value = typeof date === 'string' ? date : dateToString(date)

  return sortEventsByTime(events.filter((event) => event.date === value))
}

export function useTimeSlots() {
  const hours = computed(() => Array.from({ length: 24 }, (_, hour) => hour))

  const nowTop = computed(() => {
    const now = new Date()

    return ((now.getHours() * 60 + now.getMinutes()) * slotHeight) / 60
  })

  return {
    hours,
    nowTop,
  }
}
