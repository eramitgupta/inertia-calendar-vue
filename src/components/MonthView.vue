<script setup lang="ts">
import { formatTime } from '../composables/useCalendar'
import { eventKey } from '../composables/useEventLayout'
import { useMonthGrid } from '../composables/useMonthGrid'
import { days } from '../constants'
import type { CalendarEvent } from '../types'

const props = defineProps<{
  currentDate: Date
  events: CalendarEvent[]
}>()

defineEmits<{
  add: [date: string]
  detail: [event: CalendarEvent]
}>()

const { cells } = useMonthGrid(
  () => props.currentDate,
  () => props.events,
)
</script>

<template>
  <div class="erag-month-wrap">
    <div class="erag-month-dow-row">
      <div v-for="day in days" :key="day" class="erag-dow">{{ day }}</div>
    </div>
    <div class="erag-month-grid">
      <div
        v-for="cell in cells"
        :key="cell.value"
        class="erag-cell"
        :class="{ 'erag-other-month': cell.other, 'erag-today': cell.today }"
        @click="$emit('add', cell.value)"
      >
        <div class="erag-day-num">{{ cell.date.getDate() }}</div>
        <div
          v-for="event in cell.events.slice(0, 3)"
          :key="eventKey(event)"
          class="erag-pill"
          :style="{ background: `${event.color}22`, color: event.color }"
          @click.stop="$emit('detail', event)"
        >
          {{ event.start !== '00:00' ? `${formatTime(event.start)} ` : '' }}{{ event.title }}
        </div>
        <div v-if="cell.events.length > 3" class="erag-more">
          +{{ cell.events.length - 3 }} more
        </div>
      </div>
    </div>
  </div>
</template>
