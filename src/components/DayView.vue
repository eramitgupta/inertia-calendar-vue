<script setup lang="ts">
import { formatLongDate, formatTime } from '../composables/useCalendar'
import { useDaySchedule } from '../composables/useDaySchedule'
import { eventKey } from '../composables/useEventLayout'
import type { CalendarEvent } from '../types'

const props = defineProps<{
  currentDate: Date
  events: CalendarEvent[]
}>()

defineEmits<{
  add: [date: string]
  detail: [event: CalendarEvent]
}>()

const { date, dayEvents, eventStyle, hours, nowTop, today } = useDaySchedule(() => props.currentDate, () => props.events)
</script>

<template>
  <div class="erag-day-wrap">
    <div class="erag-day-hdr">{{ formatLongDate(currentDate) }}</div>
    <div class="erag-day-scroll">
      <div class="erag-time-col">
        <div v-for="hour in hours" :key="hour" class="erag-time-slot">
          <span class="erag-time-label">{{ hour === 0 ? '' : formatTime(`${String(hour).padStart(2, '0')}:00`) }}</span>
        </div>
      </div>
      <div class="erag-dcol">
        <div v-for="hour in hours" :key="hour" class="erag-dslot" @click="$emit('add', date)"></div>
        <div
          v-for="event in dayEvents"
          :key="eventKey(event)"
          class="erag-devent"
          :style="eventStyle(event, 28)"
          @click.stop="$emit('detail', event)"
        >
          {{ formatTime(event.start) }}-{{ formatTime(event.end) }} {{ event.title }}
        </div>
        <div v-if="date === today" class="erag-now-line" :style="{ top: `${nowTop}px` }">
          <div class="erag-now-dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>
