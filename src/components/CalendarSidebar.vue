<script setup lang="ts">
import { useMiniCalendar } from '../composables/useMiniCalendar'
import { shortDays } from '../constants'
import type { CalendarDefinition } from '../types'

const props = withDefaults(defineProps<{
  calendars: CalendarDefinition[]
  currentDate: Date
  miniDate: Date
  open?: boolean
  visibleCalendars: Set<string>
}>(), {
  open: true,
})

defineEmits<{
  add: []
  'mini-next': []
  'mini-prev': []
  'select-date': [date: Date]
  'toggle-calendar': [calendarId: string]
}>()

const { miniDays, miniTitle, parseMiniDate } = useMiniCalendar(() => props.currentDate, () => props.miniDate)
</script>

<template>
  <div class="erag-sidebar" :class="{ 'erag-collapsed': !open }">
    <div>
      <div class="erag-mini-header">
        <span class="erag-mini-title">{{ miniTitle }}</span>
        <div style="display:flex;gap:3px">
          <button class="erag-mini-nav" @click="$emit('mini-prev')">‹</button>
          <button class="erag-mini-nav" @click="$emit('mini-next')">›</button>
        </div>
      </div>
      <div class="erag-mini-grid">
        <div v-for="day in shortDays" :key="day" class="erag-mini-dow">{{ day }}</div>
        <div
          v-for="(day, index) in miniDays"
          :key="`${day.date || 'other'}-${index}`"
          class="erag-mini-day"
          :class="{ 'erag-other': day.other, 'erag-today': day.today, 'erag-selected': day.selected }"
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
          <div class="erag-legend-dot" :style="{ background: visibleCalendars.has(calendar.id) ? calendar.color : '#ccc' }"></div>
          <span :style="{ color: visibleCalendars.has(calendar.id) ? '#1a1a1a' : '#bbb' }">{{ calendar.label }}</span>
        </div>
      </div>
    </div>
    <div>
      <button class="erag-btn erag-btn-primary" style="width:100%;justify-content:center" @click="$emit('add')">+ New event</button>
    </div>
  </div>
</template>
