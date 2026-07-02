import { ref  } from 'vue'
import type {Ref} from 'vue';
import type { CalendarEvent, ModalMode } from '../types'
import { dateToString } from './useCalendar'

export function useCalendarModal(currentDate: Ref<Date>, canCreate: () => boolean, canUpdate: () => boolean) {
  const modalOpen = ref(false)
  const modalMode = ref<ModalMode>('create')
  const selectedDate = ref('')
  const selectedEvent = ref<CalendarEvent | null>(null)

  const openCreate = (date?: string): void => {
    if (!canCreate()) {
      return
    }

    selectedDate.value = date || dateToString(currentDate.value)
    selectedEvent.value = null
    modalMode.value = 'create'
    modalOpen.value = true
  }

  const openDetail = (event: CalendarEvent): void => {
    selectedEvent.value = event
    modalMode.value = 'detail'
    modalOpen.value = true
  }

  const openEdit = (event: CalendarEvent): void => {
    if (!canUpdate()) {
      return
    }

    selectedEvent.value = event
    modalMode.value = 'edit'
  }

  const closeModal = (): void => {
    modalOpen.value = false
    selectedEvent.value = null
  }

  return {
    closeModal,
    modalMode,
    modalOpen,
    openCreate,
    openDetail,
    openEdit,
    selectedDate,
    selectedEvent,
  }
}
