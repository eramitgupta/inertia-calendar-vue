import type { ComputedRef } from 'vue'
import type { CalendarEvent, CalendarState, CalendarMutationResponse } from '../types'
import type { useInertiaCalendarEvents } from './useInertiaCalendarEvents'

type InertiaCalendarEvents = ReturnType<typeof useInertiaCalendarEvents>

interface CalendarMutationEmits {
  create: (event: CalendarEvent) => void
  delete: (event: CalendarEvent) => void
  update: (event: CalendarEvent) => void
}

interface CalendarMutationOptions {
  calendar: CalendarState
  canDelete: () => boolean
  closeModal: () => void
  emit: CalendarMutationEmits
  inertiaEvents: InertiaCalendarEvents
  shouldPersist: ComputedRef<boolean>
}

export function useCalendarMutations({
  calendar,
  canDelete,
  closeModal,
  emit,
  inertiaEvents,
  shouldPersist,
}: CalendarMutationOptions) {
  const appendCreatedEvent = (event: CalendarEvent): CalendarEvent => {
    const exists =
      event.id && calendar.events.value.some((item) => String(item.id) === String(event.id))

    if (exists) {
      return calendar.saveEvent(event)
    }

    calendar.events.value = [...calendar.events.value, event]

    return event
  }

  const handleSavedEvent = (event: CalendarEvent, isUpdate: boolean): void => {
    const saved = isUpdate ? calendar.saveEvent(event) : appendCreatedEvent(event)

    if (isUpdate) {
      emit.update(saved)
    } else {
      emit.create(saved)
    }

    closeModal()
  }

  const saveEvent = (event: CalendarEvent): void => {
    const isUpdate = Boolean(event.id)

    if (!shouldPersist.value) {
      handleSavedEvent(event, isUpdate)

      return
    }

    const request = isUpdate ? inertiaEvents.updateEvent(event) : inertiaEvents.createEvent(event)

    request.then((response: CalendarMutationResponse | null) => {
      if (!response) {
        return
      }

      handleSavedEvent(response.event || event, isUpdate)
    })
  }

  const deleteEvent = (event: CalendarEvent): void => {
    if (!canDelete()) {
      return
    }

    if (!shouldPersist.value) {
      calendar.deleteEvent(event)
      emit.delete(event)
      closeModal()

      return
    }

    inertiaEvents.deleteEvent(event).then((response: CalendarMutationResponse | null) => {
      if (!response) {
        return
      }

      calendar.deleteEvent(event)
      emit.delete(event)
      closeModal()
    })
  }

  return {
    deleteEvent,
    saveEvent,
  }
}
