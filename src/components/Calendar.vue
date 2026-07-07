<script setup lang="ts">
import { computed, toRef, ref, useAttrs, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { useCalendar } from '../composables/useCalendar'
import { useCalendarModal } from '../composables/useCalendarModal'
import { useCalendarMutations } from '../composables/useCalendarMutations'
import { useCalendarResource } from '../composables/useCalendarResource'
import { useInertiaCalendarEvents } from '../composables/useInertiaCalendarEvents'
import type { CalendarColors, CalendarEvent, CalendarProps } from '../types'
import AgendaView from './AgendaView.vue'
import CalendarSidebar from './CalendarSidebar.vue'
import CalendarToolbar from './CalendarToolbar.vue'
import DayView from './DayView.vue'
import EventModal from './EventModal.vue'
import MonthView from './MonthView.vue'
import SettingsView from './SettingsView.vue'
import WeekView from './WeekView.vue'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()

const props = withDefaults(defineProps<CalendarProps>(), {
  calendar: undefined,
  calendars: undefined,
  config: () => ({}),
  configColors: () => ({}),
  events: undefined,
  headless: false,
  initialDate: undefined,
  initialView: undefined,
  mentionUsers: undefined,
  permissions: undefined,
  persistWithInertia: undefined,
  resource: undefined,
  routes: () => ({}),
  visitOptions: () => ({}),
})

const emit = defineEmits<{
  create: [event: CalendarEvent]
  delete: [event: CalendarEvent]
  update: [event: CalendarEvent]
  'create-task': [
    task: { title: string; date: string; time: string; allDay: boolean; desc: string },
  ]
}>()

const { calendarOptions, config, mentionUsers, permissions, routes, shouldPersist } =
  useCalendarResource(props)

const calendarState = useCalendar(toRef(() => calendarOptions.value))
const inertiaEvents = useInertiaCalendarEvents(routes.value, props.visitOptions)

watch(
  () => config.value.sidebar,
  (sidebar) => {
    if (sidebar === true) {
      calendarState.sidebarOpen.value = true
    }

    if (sidebar === false) {
      calendarState.sidebarOpen.value = false
    }
  },
  { immediate: true },
)

const {
  closeModal,
  modalMode,
  modalOpen,
  openCreate,
  openDetail,
  openEdit,
  selectedDate,
  selectedEvent,
} = useCalendarModal(
  calendarState.currentDate,
  () => permissions.value.create,
  () => permissions.value.update,
)
const { deleteEvent, saveEvent } = useCalendarMutations({
  calendar: calendarState,
  canDelete: () => permissions.value.delete,
  closeModal,
  emit: {
    create: (event) => emit('create', event),
    delete: (event) => emit('delete', event),
    update: (event) => emit('update', event),
  },
  inertiaEvents,
  shouldPersist,
})

const modalInitialTab = ref<'event' | 'task'>('event')

const handleNewEvent = (date?: any) => {
  modalInitialTab.value = 'event'
  openCreate(date)
}

const handleNewTask = () => {
  modalInitialTab.value = 'task'
  openCreate()
}

const saveTask = (taskData: any) => {
  console.log('[calendar UI] task created:', taskData)
  emit('create-task', taskData)
}

const slotProps = computed(() => ({
  ...calendarState,
  errors: inertiaEvents.errors,
  processing: inertiaEvents.processing,
  closeModal,
  deleteEvent,
  modalMode,
  modalOpen,
  openCreate: handleNewEvent,
  openDetail,
  openEdit,
  saveEvent,
  selectedDate,
  selectedEvent,
}))

const hexToRgba = (color: string, opacity: number): string | null => {
  const match = color.trim().match(/^#?([0-9a-f]{6})$/i)

  if (!match) {
    return null
  }

  const value = match[1]
  const red = Number.parseInt(value.slice(0, 2), 16)
  const green = Number.parseInt(value.slice(2, 4), 16)
  const blue = Number.parseInt(value.slice(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}

const rootAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs

  return rest
})

const rootClass = computed(() => ['erag-cal-root', attrs.class, props.class])

const colorVariableMap: Record<Exclude<keyof CalendarColors, 'variables'>, `--${string}`> = {
  background: '--bg-main',
  border: '--border-color',
  danger: '--color-danger',
  dangerHover: '--color-danger-hover',
  dangerLight: '--color-danger-light',
  hoverBackground: '--bg-hover',
  modalBackground: '--modal-bg',
  modalBorder: '--modal-border',
  overlay: '--overlay-bg',
  primary: '--color-primary',
  primaryAccent: '--color-primary-accent',
  primaryHover: '--color-primary-hover',
  primaryLight: '--color-primary-light',
  primaryShadow: '--color-primary-shadow',
  primarySoft: '--color-primary-soft',
  primarySoftHover: '--color-primary-soft-hover',
  controlAccent: '--control-accent',
  controlBackground: '--control-bg',
  controlBorder: '--control-border',
  controlFocus: '--control-focus',
  controlShadow: '--control-shadow',
  sidebarBackground: '--bg-sidebar',
  softBackground: '--bg-soft',
  surfaceMuted: '--surface-muted',
  surfaceMutedHover: '--surface-muted-hover',
  swatchBorder: '--swatch-border',
  task: '--color-task',
  taskHover: '--color-task-hover',
  taskShadow: '--color-task-shadow',
  textMuted: '--text-muted',
  textPrimary: '--text-primary',
  textSecondary: '--text-secondary',
  toolbarBackground: '--bg-toolbar',
}

const buildColorVariables = (colors: CalendarColors): Record<string, string> => {
  const variables: Record<string, string> = { ...(colors.variables || {}) }
  const primaryColor = colors.primary?.trim()

  if (primaryColor) {
    variables['--color-primary'] = primaryColor
    variables['--color-primary-hover'] = colors.primaryHover || primaryColor
    variables['--color-primary-accent'] = colors.primaryAccent || primaryColor

    const primaryLight = hexToRgba(primaryColor, 0.12)
    const primaryShadow = hexToRgba(primaryColor, 0.16)
    const primarySoft = hexToRgba(primaryColor, 0.1)
    const primarySoftHover = hexToRgba(primaryColor, 0.08)

    if (primaryLight && !colors.primaryLight) {
      variables['--color-primary-light'] = primaryLight
    }

    if (primaryShadow && !colors.primaryShadow) {
      variables['--color-primary-shadow'] = primaryShadow
    }

    if (primarySoft && !colors.primarySoft) {
      variables['--color-primary-soft'] = primarySoft
    }

    if (primarySoftHover && !colors.primarySoftHover) {
      variables['--color-primary-soft-hover'] = primarySoftHover
    }
  }

  for (const [key, variable] of Object.entries(colorVariableMap) as [
    Exclude<keyof CalendarColors, 'variables'>,
    `--${string}`,
  ][]) {
    const value = colors[key]

    if (typeof value === 'string' && value.trim()) {
      variables[variable] = value.trim()
    }
  }

  return variables
}

const rootStyle = computed(() => {
  const variables = buildColorVariables(props.configColors)

  return [variables as CSSProperties, attrs.style, props.style]
})
</script>

<template>
  <slot v-if="headless" v-bind="slotProps"></slot>

  <div v-else v-bind="rootAttrs" :class="rootClass" :style="rootStyle">
    <CalendarToolbar
      :search="calendarState.search.value"
      :can-create="permissions.create"
      :title="calendarState.title.value"
      :view="calendarState.currentView.value"
      @add="handleNewEvent()"
      @next="calendarState.navigate(1)"
      @prev="calendarState.navigate(-1)"
      @search="calendarState.search.value = $event"
      @sidebar-toggle="calendarState.sidebarOpen.value = !calendarState.sidebarOpen.value"
      @today="calendarState.goToday()"
      @view="calendarState.setView($event)"
    />

    <div class="erag-body">
      <CalendarSidebar
        v-if="config.sidebar !== false"
        :calendars="calendarState.calendars.value"
        :current-date="calendarState.currentDate.value"
        :mini-date="calendarState.miniDate.value"
        :open="calendarState.sidebarOpen.value"
        :visible-calendars="calendarState.visibleCalendars.value"
        @add="handleNewEvent()"
        @add-task="handleNewTask()"
        @mini-next="
          calendarState.miniDate.value = new Date(
            calendarState.miniDate.value.getFullYear(),
            calendarState.miniDate.value.getMonth() + 1,
            1,
          )
        "
        @mini-prev="
          calendarState.miniDate.value = new Date(
            calendarState.miniDate.value.getFullYear(),
            calendarState.miniDate.value.getMonth() - 1,
            1,
          )
        "
        @select-date="calendarState.selectDate($event)"
        @toggle-calendar="calendarState.toggleCalendar($event)"
      />

      <main class="erag-main">
        <MonthView
          v-if="calendarState.currentView.value === 'month'"
          :current-date="calendarState.currentDate.value"
          :events="calendarState.filteredEvents.value"
          @add="handleNewEvent"
          @detail="openDetail"
        />
        <WeekView
          v-else-if="calendarState.currentView.value === 'week'"
          :current-date="calendarState.currentDate.value"
          :events="calendarState.filteredEvents.value"
          @add="handleNewEvent"
          @detail="openDetail"
        />
        <DayView
          v-else-if="calendarState.currentView.value === 'day'"
          :current-date="calendarState.currentDate.value"
          :events="calendarState.filteredEvents.value"
          @add="handleNewEvent"
          @detail="openDetail"
        />
        <AgendaView
          v-else-if="calendarState.currentView.value === 'agenda'"
          :current-date="calendarState.currentDate.value"
          :events="calendarState.filteredEvents.value"
          @detail="openDetail"
        />
        <SettingsView v-else />
      </main>
    </div>

    <EventModal
      :calendars="calendarState.calendars.value"
      :event="selectedEvent"
      :mention-users="mentionUsers"
      :mention-users-allowed="config.mention_users !== false"
      :mode="modalMode"
      :open="modalOpen"
      :initial-tab="modalInitialTab"
      :permissions="permissions"
      :processing="inertiaEvents.processing.value"
      :selected-date="selectedDate"
      @close="closeModal"
      @delete="deleteEvent"
      @edit="openEdit"
      @save="saveEvent"
      @save-task="saveTask"
    />
  </div>
</template>
