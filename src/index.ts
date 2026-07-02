import type { App } from 'vue'
import Calendar from './components/Calendar.vue'
import './styles.css'

export { default as InertiaCalendar } from './components/Calendar.vue'
export { default as AgendaView } from './components/AgendaView.vue'
export { default as Calendar } from './components/Calendar.vue'
export { default as CalendarSidebar } from './components/CalendarSidebar.vue'
export { default as CalendarToolbar } from './components/CalendarToolbar.vue'
export { default as DayView } from './components/DayView.vue'
export { default as EventModal } from './components/EventModal.vue'
export { default as MonthView } from './components/MonthView.vue'
export { default as WeekView } from './components/WeekView.vue'
export * from './composables/useCalendar'
export * from './composables/useAgendaGroups'
export * from './composables/useCalendarInput'
export * from './composables/useCalendarLabels'
export * from './composables/useCalendarModal'
export * from './composables/useCalendarMutations'
export * from './composables/useCalendarResource'
export * from './composables/useDaySchedule'
export * from './composables/useEventForm'
export * from './composables/useEventLayout'
export * from './composables/useInertiaCalendarEvents'
export * from './composables/useMentionUsers'
export * from './composables/useMiniCalendar'
export * from './composables/useMonthGrid'
export * from './composables/useWeekGrid'
export * from './constants'
export type {
  CalendarDefinition,
  CalendarEvent,
  CalendarOptions,
  CalendarProps,
  CalendarState,
  CalendarView,
  EventId,
  InertiaCalendarConfig,
  InertiaCalendarHttpOptions,
  InertiaCalendarMutationResponse,
  InertiaCalendarPayload,
  InertiaCalendarPermissions,
  InertiaCalendarResource,
  InertiaCalendarRoutes,
  MentionUser,
  ModalMode,
  RouteResolver,
} from './types'

export default {
  install(app: App): void {
    app.component('InertiaCalendar', Calendar)
  },
}
