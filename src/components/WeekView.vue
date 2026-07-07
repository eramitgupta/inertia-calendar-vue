<script setup lang="ts">
import { dateToString, formatTime } from '../composables/useCalendar'
import { eventKey } from '../composables/useEventLayout'
import { useWeekGrid } from '../composables/useWeekGrid'
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

const { eventsFor, eventStyle, hours, nowTop, today, weekDays } = useWeekGrid(
  () => props.currentDate,
  () => props.events,
)
</script>

<template>
  <div class="erag-week-wrap">
    <div class="erag-week-head">
      <div class="erag-wgutter"></div>
      <div
        v-for="day in weekDays"
        :key="dateToString(day)"
        class="erag-wday-head"
        :class="{ 'erag-today': dateToString(day) === today }"
      >
        <div class="erag-wday-name">{{ days[day.getDay()] }}</div>
        <div class="erag-wday-num">{{ day.getDate() }}</div>
      </div>
    </div>
    <div class="erag-week-scroll">
      <div class="erag-time-col">
        <div v-for="hour in hours" :key="hour" class="erag-time-slot">
          <span class="erag-time-label">{{
            hour === 0 ? '' : formatTime(`${String(hour).padStart(2, '0')}:00`)
          }}</span>
        </div>
      </div>
      <div v-for="day in weekDays" :key="dateToString(day)" class="erag-wcol">
        <div
          v-for="hour in hours"
          :key="hour"
          class="erag-wslot"
          @click="$emit('add', dateToString(day))"
        ></div>
        <div
          v-for="event in eventsFor(day)"
          :key="eventKey(event)"
          class="erag-wevent"
          :style="eventStyle(event)"
          @click.stop="$emit('detail', event)"
        >
          {{ formatTime(event.start) }} {{ event.title }}
        </div>
        <div
          v-if="dateToString(day) === today"
          class="erag-now-line"
          :style="{ top: `${nowTop}px` }"
        >
          <div class="erag-now-dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>
