import { useHttp } from '@inertiajs/vue3'
import { computed } from 'vue'
import type { CalendarEvent, InertiaCalendarHttpOptions, InertiaCalendarMutationResponse, InertiaCalendarRoutes, RouteResolver } from '../types'

const defaultRoutes: Required<InertiaCalendarRoutes> = {
  create: null,
  store: null,
  update: null,
  delete: null,
  destroy: null,
}

const resolveRoute = (route: RouteResolver | undefined, event?: CalendarEvent): string | null => {
  if (typeof route === 'function') {
    return route(event)
  }

  if (route && event?.id) {
    return route.replace(':id', String(event.id))
  }

  return route || null
}

export function useInertiaCalendarEvents(routes: InertiaCalendarRoutes = {}, visitOptions: InertiaCalendarHttpOptions = {}) {
  const endpoints = { ...defaultRoutes, ...routes }
  const request = useHttp<Record<string, any>, InertiaCalendarMutationResponse>({})
  const errors = computed(() => request.errors as Record<string, string>)
  const processing = computed(() => request.processing)

  const submit = (
    method: 'post' | 'put' | 'delete',
    url: string | null,
    data: CalendarEvent | Record<string, unknown> = {},
    options: InertiaCalendarHttpOptions = {},
  ): Promise<InertiaCalendarMutationResponse | null> => {
    if (!url) {
      return Promise.resolve(null)
    }

    request.transform(() => data as Record<string, any>)

    return request[method](url, {
      ...visitOptions,
      ...options,
    }).catch(() => null)
  }

  const createEvent = (event: CalendarEvent, options: InertiaCalendarHttpOptions = {}): Promise<InertiaCalendarMutationResponse | null> => submit('post', resolveRoute(endpoints.create || endpoints.store, event), event, options)

  const updateEvent = (event: CalendarEvent, options: InertiaCalendarHttpOptions = {}): Promise<InertiaCalendarMutationResponse | null> => submit('put', resolveRoute(endpoints.update, event), event, options)

  const deleteEvent = (event: CalendarEvent, options: InertiaCalendarHttpOptions = {}): Promise<InertiaCalendarMutationResponse | null> => submit('delete', resolveRoute(endpoints.delete || endpoints.destroy, event), {}, options)

  return {
    errors,
    processing,
    createEvent,
    updateEvent,
    deleteEvent,
  }
}
