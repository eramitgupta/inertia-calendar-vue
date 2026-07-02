import type { UseHttpSubmitOptions } from '@inertiajs/core'
import type { Ref } from 'vue'

export type CalendarView = 'month' | 'week' | 'day' | 'agenda'

export type EventId = string | number

export interface CalendarDefinition {
  id: string
  label: string
  color: string
}

export interface MentionUser {
  user_id: number
  name: string
}

export interface CalendarEvent {
  id?: EventId | null
  title: string
  date: string
  start: string
  end: string
  cal: string
  color: string
  desc?: string
  mentioned_user_ids?: number[]
  [key: string]: unknown
}

export interface CalendarOptions {
  calendars?: CalendarDefinition[]
  events?: CalendarEvent[]
  initialDate?: Date | string
  initialView?: CalendarView
  sidebarOpen?: boolean
}

export interface CalendarState {
  calendars: Ref<CalendarDefinition[]>
  currentDate: Ref<Date>
  currentView: Ref<CalendarView>
  events: Ref<CalendarEvent[]>
  filteredEvents: Ref<CalendarEvent[]>
  miniDate: Ref<Date>
  search: Ref<string>
  sidebarOpen: Ref<boolean>
  title: Ref<string>
  visibleCalendars: Ref<Set<string>>
  deleteEvent: (event: Pick<CalendarEvent, 'id'>) => void
  formatLongDate: (date: Date) => string
  formatMonthYear: (date: Date) => string
  formatTime: (time: string) => string
  formatWeekRange: (date: Date) => string
  goToday: () => void
  navigate: (direction: number) => void
  saveEvent: (event: CalendarEvent) => CalendarEvent
  selectDate: (date: Date | string) => void
  setView: (view: CalendarView) => void
  toggleCalendar: (calendarId: string) => void
}

export type RouteResolver = string | null | ((event?: CalendarEvent) => string | null)

export interface InertiaCalendarRoutes {
  create?: RouteResolver
  store?: RouteResolver
  update?: RouteResolver
  delete?: RouteResolver
  destroy?: RouteResolver
}

export interface InertiaCalendarMutationResponse {
  event?: CalendarEvent
  deleted?: boolean
  [key: string]: unknown
}

export type InertiaCalendarHttpOptions = UseHttpSubmitOptions<InertiaCalendarMutationResponse, Record<string, any>>

export interface InertiaCalendarPermissions {
  create?: boolean
  update?: boolean
  delete?: boolean
}

export interface InertiaCalendarConfig {
  sidebar?: boolean
  color?: string
  week_start?: string
  timezone?: string
  mention_users?: boolean
  [key: string]: unknown
}

export interface InertiaCalendarResource {
  data?: CalendarOptions
  config?: InertiaCalendarConfig
  mentionUsers?: MentionUser[]
  routes?: InertiaCalendarRoutes
  permissions?: InertiaCalendarPermissions
  casts?: Record<string, string>
}

export type InertiaCalendarPayload = InertiaCalendarResource

export interface CalendarProps extends CalendarOptions {
  resource?: InertiaCalendarResource
  calendar?: InertiaCalendarPayload
  config?: InertiaCalendarConfig
  permissions?: InertiaCalendarPermissions
  routes?: InertiaCalendarRoutes
  visitOptions?: InertiaCalendarHttpOptions
  headless?: boolean
  mentionUsers?: MentionUser[]
  persistWithInertia?: boolean
}

export type ModalMode = 'create' | 'edit' | 'detail'
