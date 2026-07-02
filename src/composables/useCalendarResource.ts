import { computed } from 'vue'
import type { CalendarOptions, CalendarProps, InertiaCalendarPermissions, InertiaCalendarRoutes } from '../types'

export function useCalendarResource(props: CalendarProps) {
  const resource = computed(() => props.resource || props.calendar)

  const config = computed(() => ({
    ...props.config,
    ...(resource.value?.config || {}),
  }))

  const permissions = computed<Required<InertiaCalendarPermissions>>(() => ({
    create: true,
    update: true,
    delete: true,
    ...props.permissions,
    ...(resource.value?.permissions || {}),
  }))

  const routes = computed<InertiaCalendarRoutes>(() => ({
    ...props.routes,
    ...(resource.value?.routes || {}),
  }))

  const mentionUsers = computed(() => resource.value?.mentionUsers || props.mentionUsers || [])

  const hasRoutes = computed(() => Boolean(routes.value.create || routes.value.store || routes.value.update || routes.value.delete || routes.value.destroy))

  const shouldPersist = computed(() => Boolean(props.persistWithInertia || hasRoutes.value))

  const calendarOptions = computed<CalendarOptions>(() => ({
    calendars: resource.value?.data?.calendars || props.calendars,
    events: resource.value?.data?.events || props.events,
    initialDate: props.initialDate,
    initialView: props.initialView,
    sidebarOpen: config.value.sidebar,
  }))

  return {
    calendarOptions,
    config,
    hasRoutes,
    mentionUsers,
    permissions,
    resource,
    routes,
    shouldPersist,
  }
}
