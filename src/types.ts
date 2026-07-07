import type { UseHttpSubmitOptions } from '@inertiajs/core'
import type { HTMLAttributes, Ref } from 'vue'

export type CalendarView = 'month' | 'week' | 'day' | 'agenda' | 'settings'

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

export type EventModalTab = 'event' | 'task'

export interface CalendarTaskPayload {
  allDay: boolean
  date: string
  desc: string
  list: string
  time: string
  title: string
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

export interface CalendarRoutes {
  create?: RouteResolver
  store?: RouteResolver
  update?: RouteResolver
  delete?: RouteResolver
  destroy?: RouteResolver
}

export interface CalendarMutationResponse {
  event?: CalendarEvent
  deleted?: boolean
  [key: string]: unknown
}

export type CalendarHttpOptions = UseHttpSubmitOptions<
  CalendarMutationResponse,
  Record<string, any>
>

export interface CalendarPermissions {
  create?: boolean
  update?: boolean
  delete?: boolean
}

export interface CalendarColors {
  background?: string
  border?: string
  danger?: string
  dangerHover?: string
  dangerLight?: string
  hoverBackground?: string
  modalBackground?: string
  modalBorder?: string
  overlay?: string
  primary?: string
  primaryAccent?: string
  primaryHover?: string
  primaryLight?: string
  primaryShadow?: string
  primarySoft?: string
  primarySoftHover?: string
  controlAccent?: string
  controlBackground?: string
  controlBorder?: string
  controlFocus?: string
  controlShadow?: string
  sidebarBackground?: string
  softBackground?: string
  surfaceMuted?: string
  surfaceMutedHover?: string
  swatchBorder?: string
  task?: string
  taskHover?: string
  taskShadow?: string
  textMuted?: string
  textPrimary?: string
  textSecondary?: string
  toolbarBackground?: string
  variables?: Record<`--${string}`, string>
}

export interface CalendarConfig extends Partial<CalendarOptions> {
  sidebar?: boolean
  week_start?: string
  timezone?: string
  mention_users?: boolean
  mentionUsers?: MentionUser[]
  permissions?: CalendarPermissions
  persistWithInertia?: boolean
  routes?: CalendarRoutes
  [key: string]: unknown
}

export interface CalendarResource {
  data?: CalendarOptions
  config?: CalendarConfig
  mentionUsers?: MentionUser[]
  routes?: CalendarRoutes
  permissions?: CalendarPermissions
  casts?: Record<string, string>
}

export type CalendarPayload = CalendarResource

export interface CalendarProps extends CalendarOptions {
  resource?: CalendarResource
  calendar?: CalendarPayload
  class?: HTMLAttributes['class']
  config?: CalendarConfig
  configColors?: CalendarColors
  permissions?: CalendarPermissions
  routes?: CalendarRoutes
  style?: HTMLAttributes['style']
  visitOptions?: CalendarHttpOptions
  headless?: boolean
  mentionUsers?: MentionUser[]
  persistWithInertia?: boolean
}

export type ModalMode = 'create' | 'edit' | 'detail'
