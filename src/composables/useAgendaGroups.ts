import { computed } from 'vue'
import type { CalendarEvent } from '../types'
import { dateToString, parseDate } from './useCalendar'
import { sortEventsByTime } from './useEventLayout'

interface AgendaGroup {
  date: string
  events: CalendarEvent[]
  isToday: boolean
}

export function useAgendaGroups(currentDate: () => Date, events: () => CalendarEvent[]) {
  const groupedEvents = computed(() => {
    const start = new Date(currentDate())
    const end = new Date(start)
    end.setDate(end.getDate() + 14)

    const groups = new Map<string, CalendarEvent[]>()

    events()
      .filter((event) => {
        const date = parseDate(event.date)

        return date >= start && date <= end
      })
      .sort((a, b) => `${a.date} ${a.start}`.localeCompare(`${b.date} ${b.start}`))
      .forEach((event) => {
        const groupEvents = groups.get(event.date) || []
        groups.set(event.date, sortEventsByTime([...groupEvents, event]))
      })

    return Array.from(groups.entries()).map(([date, groupEvents]): AgendaGroup => ({
      date,
      events: groupEvents,
      isToday: date === dateToString(new Date()),
    }))
  })

  return {
    groupedEvents,
  }
}
