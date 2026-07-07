import { reactive, watch } from 'vue'
import type { CalendarTaskPayload, EventModalTab } from '../types'

interface EventTaskFormOptions {
  initialTab: () => EventModalTab
  onSave: (task: CalendarTaskPayload) => void
  open: () => boolean | undefined
  selectedDate: () => string | undefined
}

const todayString = (): string => new Date().toISOString().slice(0, 10)

export function useEventTaskForm({ initialTab, onSave, open, selectedDate }: EventTaskFormOptions) {
  const task = reactive({
    activeTab: 'event' as EventModalTab,
    date: '',
    desc: '',
    list: 'My Tasks',
    time: '12:00',
    timeEnabled: false,
    title: '',
  })

  const resetTask = (): void => {
    task.title = ''
    task.date = selectedDate() || todayString()
    task.time = '12:00'
    task.timeEnabled = false
    task.desc = ''
    task.list = 'My Tasks'
  }

  watch(
    () => [open(), initialTab(), selectedDate()],
    ([isOpen]) => {
      if (!isOpen) {
        return
      }

      task.activeTab = initialTab()
      resetTask()
    },
    { immediate: true },
  )

  const enableTime = (): void => {
    task.timeEnabled = true
  }

  const saveTask = (): void => {
    const title = task.title.trim()

    if (!title) {
      return
    }

    onSave({
      allDay: !task.timeEnabled,
      date: task.date,
      desc: task.desc,
      list: task.list,
      time: task.timeEnabled ? task.time : '',
      title,
    })
  }

  return {
    enableTime,
    resetTask,
    saveTask,
    task,
  }
}
