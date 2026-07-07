<script setup lang="ts">
import { useMiniCalendar } from '../composables/useMiniCalendar'
import { shortDays } from '../constants'
import type { CalendarDefinition } from '../types'

const props = withDefaults(
  defineProps<{
    calendars: CalendarDefinition[]
    currentDate: Date
    miniDate: Date
    open?: boolean
    visibleCalendars: Set<string>
  }>(),
  {
    open: true,
  },
)

defineEmits<{
  add: []
  'add-task': []
  'mini-next': []
  'mini-prev': []
  'select-date': [date: Date]
  'toggle-calendar': [calendarId: string]
}>()

const { miniDays, miniTitle, parseMiniDate } = useMiniCalendar(
  () => props.currentDate,
  () => props.miniDate,
)
</script>

<template>
  <div class="erag-sidebar" :class="{ 'erag-collapsed': !open }">
    <div>
      <div class="erag-mini-header">
        <span class="erag-mini-title">{{ miniTitle }}</span>
        <div class="erag-mini-nav-group">
          <button class="erag-mini-nav" title="Previous month" @click="$emit('mini-prev')">
            <svg viewBox="0 0 24 24">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <button class="erag-mini-nav" title="Next month" @click="$emit('mini-next')">
            <svg viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="erag-mini-grid">
        <div v-for="day in shortDays" :key="day" class="erag-mini-dow">{{ day }}</div>
        <div
          v-for="(day, index) in miniDays"
          :key="`${day.date || 'other'}-${index}`"
          class="erag-mini-day"
          :class="{
            'erag-other': day.other,
            'erag-today': day.today,
            'erag-selected': day.selected,
          }"
          @click="day.date && $emit('select-date', parseMiniDate(day.date))"
        >
          {{ day.label }}
        </div>
      </div>
    </div>
    <div>
      <div class="erag-legend-label">Calendars</div>
      <div>
        <div
          v-for="calendar in calendars"
          :key="calendar.id"
          class="erag-legend-item"
          @click="$emit('toggle-calendar', calendar.id)"
        >
          <div
            class="erag-legend-dot"
            :style="{
              background: visibleCalendars.has(calendar.id) ? calendar.color : '#cbd5e1',
              borderColor: visibleCalendars.has(calendar.id) ? 'transparent' : 'rgba(0,0,0,0.1)',
            }"
          ></div>
          <span :class="{ 'erag-active': visibleCalendars.has(calendar.id) }">{{
            calendar.label
          }}</span>
        </div>
      </div>
    </div>
    <div class="erag-sidebar-actions">
      <button class="erag-btn erag-btn-primary erag-btn-block" @click="$emit('add')">
        <svg
          class="erag-btn-svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        New event
      </button>
      <button class="erag-btn erag-btn-task erag-btn-block" @click="$emit('add-task')">
        <svg
          class="erag-btn-svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 5v14M5 12h14"></path>
        </svg>
        New task
      </button>
    </div>
  </div>
</template>
