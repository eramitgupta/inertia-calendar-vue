import { computed } from 'vue'
import type { CalendarOptions, CalendarProps, CalendarPermissions, CalendarRoutes } from '../types'

export function useCalendarResource(props: CalendarProps) {
  const resource = computed(() => props.resource || props.calendar)

  const config = computed(() => ({
    ...(resource.value?.config || {}),
    ...props.config,
  }))

  const permissions = computed<Required<CalendarPermissions>>(() => ({
    create: true,
    update: true,
    delete: true,
    ...(resource.value?.permissions || {}),
    ...(config.value.permissions || {}),
    ...props.permissions,
  }))

  const routes = computed<CalendarRoutes>(() => ({
    ...(resource.value?.routes || {}),
    ...(config.value.routes || {}),
    ...props.routes,
  }))

  const mentionUsers = computed(
    () => props.mentionUsers ?? config.value.mentionUsers ?? resource.value?.mentionUsers ?? [],
  )

  const hasRoutes = computed(() =>
    Boolean(
      routes.value.create ||
      routes.value.store ||
      routes.value.update ||
      routes.value.delete ||
      routes.value.destroy,
    ),
  )

  const shouldPersist = computed(() =>
    Boolean(props.persistWithInertia ?? config.value.persistWithInertia ?? hasRoutes.value),
  )

  const calendarOptions = computed<CalendarOptions>(() => ({
    calendars: props.calendars ?? config.value.calendars ?? resource.value?.data?.calendars,
    events: props.events ?? config.value.events ?? resource.value?.data?.events,
    initialDate: props.initialDate ?? config.value.initialDate ?? resource.value?.data?.initialDate,
    initialView: props.initialView ?? config.value.initialView ?? resource.value?.data?.initialView,
    sidebarOpen:
      props.sidebarOpen ??
      config.value.sidebarOpen ??
      config.value.sidebar ??
      resource.value?.data?.sidebarOpen,
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
