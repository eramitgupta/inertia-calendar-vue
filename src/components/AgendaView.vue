<script setup lang="ts">
import { useAgendaGroups } from '../composables/useAgendaGroups'
import { formatLongDate, formatTime, parseDate } from '../composables/useCalendar'
import { eventKey } from '../composables/useEventLayout'
import type { CalendarEvent } from '../types'

const props = defineProps<{
  currentDate: Date
  events: CalendarEvent[]
}>()

defineEmits<{
  detail: [event: CalendarEvent]
}>()

const { groupedEvents } = useAgendaGroups(() => props.currentDate, () => props.events)
</script>

<template>
  <div v-if="groupedEvents.length" class="erag-agenda-wrap">
    <div v-for="group in groupedEvents" :key="group.date" class="erag-agenda-group">
      <div class="erag-agenda-date" :class="{ 'erag-today-hdr': group.isToday }">
        {{ formatLongDate(parseDate(group.date)) }}
      </div>
      <div
        v-for="event in group.events"
        :key="eventKey(event)"
        class="erag-agenda-ev"
        @click="$emit('detail', event)"
      >
        <div class="erag-acolor" :style="{ background: event.color }"></div>
        <div class="erag-atime">{{ formatTime(event.start) }} - {{ formatTime(event.end) }}</div>
        <div>
          <div class="erag-atitle">{{ event.title }}</div>
          <div v-if="event.desc" class="erag-adesc">{{ event.desc }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="erag-empty">No events</div>
</template>
