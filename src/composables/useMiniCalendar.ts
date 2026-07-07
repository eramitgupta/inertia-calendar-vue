import { computed } from 'vue'
import { months } from '../constants'
import { dateToString, parseDate } from './useCalendar'

interface MiniCalendarDay {
  date?: string
  label: number
  other?: boolean
  selected?: boolean
  today?: boolean
}

const pad = (value: number): string => String(value).padStart(2, '0')

export function useMiniCalendar(currentDate: () => Date, miniDate: () => Date) {
  const miniTitle = computed(
    () => `${months[miniDate().getMonth()].slice(0, 3)} ${miniDate().getFullYear()}`,
  )

  const miniDays = computed(() => {
    const year = miniDate().getFullYear()
    const month = miniDate().getMonth()
    const first = new Date(year, month, 1).getDay()
    const count = new Date(year, month + 1, 0).getDate()
    const today = dateToString(new Date())
    const selected = dateToString(currentDate())
    const items: MiniCalendarDay[] = []

    for (let index = 0; index < first; index += 1) {
      items.push({ label: new Date(year, month, -(first - index - 1)).getDate(), other: true })
    }

    for (let day = 1; day <= count; day += 1) {
      const value = `${year}-${pad(month + 1)}-${pad(day)}`
      items.push({
        date: value,
        label: day,
        selected: value === selected,
        today: value === today,
      })
    }

    return items
  })

  const parseMiniDate = (value: string): Date => parseDate(value)

  return {
    miniDays,
    miniTitle,
    parseMiniDate,
  }
}
