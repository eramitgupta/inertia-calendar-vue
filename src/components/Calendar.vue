<script setup lang="ts">
import { computed, toRef, ref } from 'vue'
import { useCalendar } from '../composables/useCalendar'
import { useCalendarModal } from '../composables/useCalendarModal'
import { useCalendarMutations } from '../composables/useCalendarMutations'
import { useCalendarResource } from '../composables/useCalendarResource'
import { useInertiaCalendarEvents } from '../composables/useInertiaCalendarEvents'
import type { CalendarEvent, CalendarProps } from '../types'
import AgendaView from './AgendaView.vue'
import CalendarSidebar from './CalendarSidebar.vue'
import CalendarToolbar from './CalendarToolbar.vue'
import DayView from './DayView.vue'
import EventModal from './EventModal.vue'
import MonthView from './MonthView.vue'
import WeekView from './WeekView.vue'
import SettingsView from './SettingsView.vue'

const props = withDefaults(defineProps<CalendarProps>(), {
  calendar: undefined,
  calendars: undefined,
  config: () => ({}),
  events: undefined,
  headless: false,
  initialDate: undefined,
  initialView: 'month',
  mentionUsers: () => [],
  permissions: () => ({ create: true, update: true, delete: true }),
  persistWithInertia: false,
  resource: undefined,
  routes: () => ({}),
  visitOptions: () => ({}),
})

const emit = defineEmits<{
  create: [event: CalendarEvent]
  delete: [event: CalendarEvent]
  update: [event: CalendarEvent]
  'create-task': [task: { title: string; date: string; time: string; allDay: boolean; desc: string }]
}>()

const {
  calendarOptions,
  config,
  mentionUsers,
  permissions,
  routes,
  shouldPersist,
} = useCalendarResource(props)

const calendarState = useCalendar(toRef(() => calendarOptions.value))
const inertiaEvents = useInertiaCalendarEvents(routes.value, props.visitOptions)
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
</script>

<template>
  <slot v-if="headless" v-bind="slotProps"></slot>

  <div v-else class="erag-cal-root">
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
        @mini-next="calendarState.miniDate.value = new Date(calendarState.miniDate.value.getFullYear(), calendarState.miniDate.value.getMonth() + 1, 1)"
        @mini-prev="calendarState.miniDate.value = new Date(calendarState.miniDate.value.getFullYear(), calendarState.miniDate.value.getMonth() - 1, 1)"
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
        <SettingsView
          v-else
        />
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
