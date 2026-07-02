import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { days, months } from '../constants'
import type { CalendarEvent, CalendarOptions, CalendarState, CalendarView } from '../types'

const pad = (value: number): string => String(value).padStart(2, '0')

export const dateToString = (date: Date): string => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

export const parseDate = (value: Date | string): Date => {
  if (value instanceof Date) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate())
  }

  const [year = 1970, month = 1, day = 1] = String(value).split('-').map(Number)

  return new Date(year, month - 1, day)
}

export const timeToMinutes = (time: string): number => {
  const normalized = normalizeTime(time)
  const [hours = 0, minutes = 0] = normalized.split(':').map(Number)

  return hours * 60 + minutes
}

export const formatTime = (time: string): string => {
  const normalized = normalizeTime(time)
  const [hours = 0, minutes = 0] = normalized.split(':').map(Number)
  const suffix = hours >= 12 ? 'pm' : 'am'

  return `${hours % 12 || 12}${minutes ? `:${pad(minutes)}` : ''}${suffix}`
}

export const normalizeTime = (time: string): string => {
  const value = String(time || '00:00').trim()
  const match = value.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i)

  if (!match) {
    return value.slice(0, 5)
  }

  let hours = Number(match[1] || 0)
  const minutes = Number(match[2] || 0)
  const meridiem = match[3]?.toLowerCase()

  if (meridiem === 'pm' && hours < 12) {
    hours += 12
  }

  if (meridiem === 'am' && hours === 12) {
    hours = 0
  }

  return `${pad(hours)}:${pad(minutes)}`
}

export const formatLongDate = (date: Date): string => `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

export const formatMonthYear = (date: Date): string => `${months[date.getMonth()]} ${date.getFullYear()}`

export const formatWeekRange = (date: Date): string => {
  const start = new Date(date)
  start.setDate(start.getDate() - start.getDay())

  const end = new Date(start)
  end.setDate(end.getDate() + 6)

  if (start.getMonth() === end.getMonth()) {
    return `${months[start.getMonth()]} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`
  }

  return `${months[start.getMonth()]} ${start.getDate()} - ${months[end.getMonth()]} ${end.getDate()}`
}

export function useCalendar(options: CalendarOptions | Ref<CalendarOptions> = {}): CalendarState {
  const resolvedOptions = computed(() => ('value' in options ? options.value : options))
  const now = new Date()
  const currentDate = ref(resolvedOptions.value.initialDate ? parseDate(resolvedOptions.value.initialDate) : new Date(now.getFullYear(), now.getMonth(), now.getDate()))
  const miniDate = ref(new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1))
  const currentView = ref<CalendarView>(resolvedOptions.value.initialView || 'month')
  const sidebarOpen = ref(resolvedOptions.value.sidebarOpen ?? true)
  const search = ref('')
  const calendars = ref([...(resolvedOptions.value.calendars || [])])
  const events = ref([...(resolvedOptions.value.events || [])])
  const visibleCalendars = ref(new Set(calendars.value.map((calendar) => calendar.id)))

  watch(
    () => resolvedOptions.value.events,
    (nextEvents) => {
      if (Array.isArray(nextEvents)) {
        events.value = [...nextEvents]
      }
    },
  )

  watch(
    () => resolvedOptions.value.calendars,
    (nextCalendars) => {
      if (Array.isArray(nextCalendars) && nextCalendars.length) {
        calendars.value = [...nextCalendars]
        visibleCalendars.value = new Set(nextCalendars.map((calendar) => calendar.id))
      }
    },
  )

  watch(
    () => resolvedOptions.value.sidebarOpen,
    (nextSidebarOpen) => {
      if (typeof nextSidebarOpen === 'boolean') {
        sidebarOpen.value = nextSidebarOpen
      }
    },
  )

  const title = computed(() => {
    if (currentView.value === 'month') {
      return formatMonthYear(currentDate.value)
    }

    if (currentView.value === 'week') {
      return formatWeekRange(currentDate.value)
    }

    if (currentView.value === 'day') {
      return formatLongDate(currentDate.value)
    }

    return 'Agenda'
  })

  const filteredEvents = computed(() => events.value.filter((event) => {
    if (!visibleCalendars.value.has(event.cal)) {
      return false
    }

    return !search.value || event.title.toLowerCase().includes(search.value.toLowerCase())
  }))

  const nextId = (): number => Math.max(0, ...events.value.map((event) => Number(event.id)).filter(Number.isFinite)) + 1

  const navigate = (direction: number): void => {
    const date = new Date(currentDate.value)

    if (currentView.value === 'month') {
      currentDate.value = new Date(date.getFullYear(), date.getMonth() + direction, 1)
    } else if (currentView.value === 'week') {
      date.setDate(date.getDate() + direction * 7)
      currentDate.value = date
    } else if (currentView.value === 'day') {
      date.setDate(date.getDate() + direction)
      currentDate.value = date
    } else {
      date.setDate(date.getDate() + direction * 14)
      currentDate.value = date
    }
  }

  const goToday = (): void => {
    const today = new Date()
    currentDate.value = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  }

  const selectDate = (date: Date | string): void => {
    currentDate.value = parseDate(date)
  }

  const setView = (view: CalendarView): void => {
    currentView.value = view
  }

  const toggleCalendar = (calendarId: string): void => {
    const next = new Set(visibleCalendars.value)

    if (next.has(calendarId)) {
      next.delete(calendarId)
    } else {
      next.add(calendarId)
    }

    visibleCalendars.value = next
  }

  const saveEvent = (event: CalendarEvent): CalendarEvent => {
    if (event.id) {
      events.value = events.value.map((item) => String(item.id) === String(event.id) ? event : item)

      return event
    }

    const created = { ...event, id: nextId() }
    events.value = [...events.value, created]

    return created
  }

  const deleteEvent = (event: Pick<CalendarEvent, 'id'>): void => {
    events.value = events.value.filter((item) => String(item.id) !== String(event.id))
  }

  return {
    calendars,
    currentDate,
    currentView,
    events,
    filteredEvents,
    miniDate,
    search,
    sidebarOpen,
    title,
    visibleCalendars,
    deleteEvent,
    formatLongDate,
    formatMonthYear,
    formatTime,
    formatWeekRange,
    goToday,
    navigate,
    saveEvent,
    selectDate,
    setView,
    toggleCalendar,
  }
}
