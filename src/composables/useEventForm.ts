import { reactive, ref, watch } from 'vue'
import type { CalendarDefinition, CalendarEvent } from '../types'
import { normalizeTime, timeToMinutes } from './useCalendar'

const defaultCalendarColor = '#000000'

interface EventFormOptions {
  calendars: () => CalendarDefinition[]
  event: () => CalendarEvent | null | undefined
  onSave: (event: CalendarEvent) => void
  open?: () => boolean | undefined
  selectedDate: () => string | undefined
}

export function useEventForm({ calendars, event, onSave, open, selectedDate }: EventFormOptions) {
  const timeError = ref('')

  const form = reactive<CalendarEvent>({
    id: null,
    title: '',
    date: '',
    start: '09:00',
    end: '10:00',
    cal: '',
    color: defaultCalendarColor,
    desc: '',
    mentioned_user_ids: [],
  })

  const resetForm = (): void => {
    const selectedEvent = event()
    const calendar = calendars()[0] || { id: 'work', color: defaultCalendarColor }

    form.id = selectedEvent?.id || null
    form.title = selectedEvent?.title || ''
    form.date = selectedEvent?.date || selectedDate() || new Date().toISOString().slice(0, 10)
    form.start = normalizeTime(selectedEvent?.start || '09:00')
    form.end = normalizeTime(selectedEvent?.end || '10:00')
    form.cal = selectedEvent?.cal || calendar.id
    form.color = selectedEvent?.color || calendar.color || defaultCalendarColor
    form.desc = selectedEvent?.desc || ''
    form.mentioned_user_ids = [...(selectedEvent?.mentioned_user_ids || [])]
    timeError.value = ''
  }

  const setCustomColor = (color: string): void => {
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
      form.color = color.toUpperCase()
    }
  }

  const save = (): void => {
    if (!form.title.trim()) {
      return
    }

    const start = normalizeTime(form.start)
    const end = normalizeTime(form.end)

    if (timeToMinutes(end) < timeToMinutes(start)) {
      timeError.value = 'End time must be after start time.'

      return
    }

    timeError.value = ''
    onSave({ ...form, title: form.title.trim(), start, end })
  }

  watch(() => [calendars(), event(), open?.(), selectedDate()], resetForm, { immediate: true })

  return {
    form,
    resetForm,
    save,
    setCustomColor,
    timeError,
  }
}
