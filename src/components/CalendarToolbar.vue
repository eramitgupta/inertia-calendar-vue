<script setup lang="ts">
import { inputValue } from '../composables/useCalendarInput'
import { views } from '../constants'
import type { CalendarView } from '../types'

withDefaults(defineProps<{
  canCreate?: boolean
  search?: string
  title: string
  view: CalendarView
}>(), {
  canCreate: true,
  search: '',
})

defineEmits<{
  add: []
  next: []
  prev: []
  search: [value: string]
  'sidebar-toggle': []
  today: []
  view: [view: CalendarView]
}>()

</script>

<template>
  <div class="erag-toolbar">
    <div class="erag-toolbar-left">
      <button class="erag-btn erag-btn-icon erag-sidebar-toggle" title="Toggle sidebar" @click="$emit('sidebar-toggle')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M9 3v18"></path>
        </svg>
      </button>
      <button class="erag-btn erag-btn-today" @click="$emit('today')">Today</button>
      <button class="erag-btn erag-btn-icon" title="Previous" @click="$emit('prev')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
      </button>
      <button class="erag-btn erag-btn-icon" title="Next" @click="$emit('next')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
      <span class="erag-cal-title">{{ title }}</span>
    </div>
    <div class="erag-toolbar-right">
      <div class="erag-search-bar">
        <svg class="erag-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input type="search" placeholder="Search events..." :value="search" @input="$emit('search', inputValue($event))">
      </div>
      <div class="erag-view-tabs">
        <button
          v-for="item in views"
          :key="item"
          class="erag-view-tab"
          :class="{ 'erag-active': view === item }"
          @click="$emit('view', item)"
        >
          {{ item[0].toUpperCase() + item.slice(1) }}
        </button>
      </div>
      <select class="erag-btn erag-mobile-sel" :value="view" @change="$emit('view', inputValue($event) as CalendarView)">
        <option v-for="item in views" :key="item" :value="item">
          {{ item[0].toUpperCase() + item.slice(1) }}
        </option>
      </select>
      <button v-if="canCreate" class="erag-btn erag-btn-primary" @click="$emit('add')">
        <svg class="erag-btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        Add
      </button>
    </div>
  </div>
</template>
