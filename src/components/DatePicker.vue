<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { dateToString, parseDate } from '../composables/useCalendar'
import { shortDays, months } from '../constants'

const props = withDefaults(defineProps<{
  modelValue?: string
}>(), {
  modelValue: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const open = ref(false)
const visibleDate = ref(props.modelValue ? parseDate(props.modelValue) : new Date())

const selectedValue = computed(() => props.modelValue || '')

const selectedLabel = computed(() => {
  if (!selectedValue.value) {
    return 'Select date'
  }

  const date = parseDate(selectedValue.value)

  return `${months[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`
})

const pickerTitle = computed(() => `${months[visibleDate.value.getMonth()]} ${visibleDate.value.getFullYear()}`)

const calendarDays = computed(() => {
  const year = visibleDate.value.getFullYear()
  const month = visibleDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const start = new Date(firstDay)
  start.setDate(firstDay.getDate() - firstDay.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)

    const value = dateToString(date)

    return {
      date,
      value,
      label: date.getDate(),
      other: date.getMonth() !== month,
      selected: value === selectedValue.value,
      today: value === dateToString(new Date()),
    }
  })
})

const navigate = (direction: number): void => {
  visibleDate.value = new Date(visibleDate.value.getFullYear(), visibleDate.value.getMonth() + direction, 1)
}

const selectDate = (value: string): void => {
  emit('update:modelValue', value)
  visibleDate.value = parseDate(value)
  open.value = false
}

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      visibleDate.value = parseDate(value)
    }
  },
)
</script>

<template>
  <div class="erag-date-picker" @focusout="open = false">
    <button type="button" class="erag-form-input erag-date-trigger" @click="open = !open">
      <span>{{ selectedLabel }}</span>
      <span class="erag-date-trigger-icon" aria-hidden="true"></span>
    </button>

    <div v-if="open" class="erag-date-menu" @mousedown.prevent>
      <div class="erag-date-menu-head">
        <button type="button" class="erag-date-nav" title="Previous month" @click="navigate(-1)">&lt;</button>
        <span class="erag-date-title">{{ pickerTitle }}</span>
        <button type="button" class="erag-date-nav" title="Next month" @click="navigate(1)">&gt;</button>
      </div>

      <div class="erag-date-grid erag-date-weekdays">
        <span v-for="day in shortDays" :key="day" class="erag-date-weekday">{{ day }}</span>
      </div>

      <div class="erag-date-grid">
        <button
          v-for="day in calendarDays"
          :key="day.value"
          type="button"
          class="erag-date-day"
          :class="{ 'erag-other': day.other, 'erag-selected': day.selected, 'erag-today': day.today }"
          @click="selectDate(day.value)"
        >
          {{ day.label }}
        </button>
      </div>
    </div>
  </div>
</template>
