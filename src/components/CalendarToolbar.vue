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
      <button class="erag-btn erag-btn-icon erag-sidebar-toggle" title="Toggle sidebar" @click="$emit('sidebar-toggle')">☰</button>
      <button class="erag-btn" style="font-weight:600" @click="$emit('today')">Today</button>
      <button class="erag-btn erag-btn-icon" @click="$emit('prev')">&#8249;</button>
      <button class="erag-btn erag-btn-icon" @click="$emit('next')">&#8250;</button>
      <span class="erag-cal-title">{{ title }}</span>
    </div>
    <div class="erag-toolbar-right">
      <div class="erag-search-bar">
        <svg class="erag-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <input type="search" placeholder="Search..." :value="search" @input="$emit('search', inputValue($event))">
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
      <button v-if="canCreate" class="erag-btn erag-btn-primary" @click="$emit('add')">+ Add</button>
    </div>
  </div>
</template>
