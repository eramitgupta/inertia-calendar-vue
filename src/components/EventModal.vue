<script setup lang="ts">
import { watch, onUnmounted, ref } from 'vue'
import { formatLongDate, formatTime, normalizeTime, parseDate } from '../composables/useCalendar'
import { calendarLabel, mentionedUsersLabel } from '../composables/useCalendarLabels'
import { useEventForm } from '../composables/useEventForm'
import { useMentionUsers } from '../composables/useMentionUsers'
import { swatchColors } from '../constants'
import type { CalendarDefinition, CalendarEvent, InertiaCalendarPermissions, MentionUser, ModalMode } from '../types'

const props = withDefaults(defineProps<{
  calendars: CalendarDefinition[]
  event?: CalendarEvent | null
  mentionUsers?: MentionUser[]
  mentionUsersAllowed?: boolean
  mode?: ModalMode
  open?: boolean
  permissions?: InertiaCalendarPermissions
  processing?: boolean
  selectedDate?: string
  initialTab?: 'event' | 'task'
}>(), {
  event: null,
  mentionUsersAllowed: true,
  mentionUsers: () => [],
  mode: 'create',
  open: false,
  permissions: () => ({ create: true, update: true, delete: true }),
  processing: false,
  selectedDate: '',
  initialTab: 'event',
})

const emit = defineEmits<{
  close: []
  delete: [event: CalendarEvent]
  edit: [event: CalendarEvent]
  save: [event: CalendarEvent]
  'save-task': [task: { title: string; date: string; time: string; allDay: boolean; desc: string; list: string }]
}>()

const { form, save, setCustomColor, timeError } = useEventForm({
  calendars: () => props.calendars,
  event: () => props.event,
  onSave: (event) => emit('save', event),
  open: () => props.open,
  selectedDate: () => props.selectedDate,
})
const {
  addMentionUser,
  availableMentionUsers,
  focusMentionSearch,
  mentionListOpen,
  mentionSearch,
  mentionSearchInput,
  removeMentionUser,
  resetMentionSearch,
  selectedMentionUsers,
} = useMentionUsers(form, () => props.mentionUsers)

watch(() => [props.open, props.event, props.selectedDate], resetMentionSearch, { immediate: true })

const activeTab = ref<'event' | 'task'>('event')

const taskTitle = ref('')
const taskDate = ref('')
const taskTime = ref('')
const taskTimeEnabled = ref(false)
const taskDesc = ref('')
const taskList = ref('My Tasks')

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    document.body.classList.add('erag-no-scroll')
    activeTab.value = props.initialTab || 'event'
    
    // Reset task form fields
    taskTitle.value = ''
    taskDate.value = props.selectedDate || new Date().toISOString().split('T')[0]
    taskTime.value = '12:00'
    taskTimeEnabled.value = false
    taskDesc.value = ''
    taskList.value = 'My Tasks'
  } else {
    document.body.classList.remove('erag-no-scroll')
  }
}, { immediate: true })

onUnmounted(() => {
  document.body.classList.remove('erag-no-scroll')
})

const saveTask = () => {
  if (!taskTitle.value.trim()) {
    return
  }
  emit('save-task', {
    title: taskTitle.value,
    date: taskDate.value,
    time: taskTimeEnabled.value ? taskTime.value : '',
    allDay: !taskTimeEnabled.value,
    desc: taskDesc.value,
    list: taskList.value,
  })
  emit('close')
}
</script>

<template>
  <div v-if="open" class="erag-overlay" @click.self="$emit('close')">
    <div class="erag-modal">
      <!-- Detail View Mode -->
      <template v-if="mode === 'detail' && event">
        <div class="erag-detail-bar" :style="{ background: event.color }"></div>
        <div class="erag-modal-hdr">
          <span class="erag-modal-title">{{ event.title }}</span>
          <button class="erag-modal-close" title="Close" @click="$emit('close')">
            <svg class="erag-modal-close-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div class="erag-detail-row">
          <span class="erag-detail-icon" title="Date">
            <svg viewBox="0 0 24 24">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
              <line x1="16" x2="16" y1="2" y2="6"></line>
              <line x1="8" x2="8" y1="2" y2="6"></line>
              <line x1="3" x2="21" y1="10" y2="10"></line>
            </svg>
          </span>
          <span>{{ formatLongDate(parseDate(event.date)) }}</span>
        </div>
        <div class="erag-detail-row">
          <span class="erag-detail-icon" title="Time">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </span>
          <span>{{ formatTime(event.start) }} - {{ formatTime(event.end) }}</span>
        </div>
        <div v-if="event.desc" class="erag-detail-row">
          <span class="erag-detail-icon" title="Notes">
            <svg viewBox="0 0 24 24">
              <line x1="21" x2="3" y1="6" y2="6"></line>
              <line x1="21" x2="9" y1="12" y2="12"></line>
              <line x1="21" x2="7" y1="18" y2="18"></line>
            </svg>
          </span>
          <span>{{ event.desc }}</span>
        </div>
        <div class="erag-detail-row">
          <span class="erag-detail-icon" title="Calendar">
            <svg viewBox="0 0 24 24">
              <path d="M12 2H2v10l9.29 9.29c.39.39 1.02.39 1.41 0l7.59-7.59c.39-.39.39-1.02 0-1.41L12 2z"></path>
              <path d="m7 7-.01.01"></path>
            </svg>
          </span>
          <span>{{ calendarLabel(calendars, event) }}</span>
        </div>
        <div v-if="mentionedUsersLabel(mentionUsers, event)" class="erag-detail-row">
          <span class="erag-detail-icon" title="Mentioned users">
            <svg viewBox="0 0 24 24">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </span>
          <span>{{ mentionedUsersLabel(mentionUsers, event) }}</span>
        </div>
        <div class="erag-modal-footer">
          <button v-if="permissions.delete" class="erag-btn erag-btn-danger" :disabled="processing" @click="$emit('delete', event)">Delete</button>
          <button class="erag-btn" @click="$emit('close')">Close</button>
          <button v-if="permissions.update" class="erag-btn erag-btn-primary" :disabled="processing" @click="$emit('edit', event)">Edit</button>
        </div>
      </template>

      <!-- Edit/Create Form Mode -->
      <template v-else>
        <!-- Modal Header -->
        <div class="erag-modal-hdr" style="margin-bottom: 8px;">
          <span class="erag-modal-title">
            {{ form.id ? (activeTab === 'event' ? 'Edit event' : 'Edit task') : (activeTab === 'event' ? 'New event' : 'New task') }}
          </span>
          <button class="erag-modal-close" title="Cancel" @click="$emit('close')">
            <svg class="erag-modal-close-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Creation Tabs (Only when creating, not editing) -->
        <div v-if="!form.id && mode === 'create'" class="erag-tab-row">
          <button
            type="button"
            class="erag-tab-pill"
            :class="{ 'erag-active': activeTab === 'event' }"
            @click="activeTab = 'event'"
          >
            Event
          </button>
          <button
            type="button"
            class="erag-tab-pill"
            :class="{ 'erag-active': activeTab === 'task' }"
            @click="activeTab = 'task'"
          >
            Task
          </button>
        </div>

        <!-- EVENT FORM CONTENT -->
        <template v-if="activeTab === 'event'">
          <div class="erag-form-group" style="padding-left: 40px; margin-bottom: 20px;">
            <input v-model="form.title" class="erag-title-input" placeholder="Add title" autofocus>
          </div>

          <div class="erag-field-row">
            <div class="erag-field-icon" title="Date and Time">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div class="erag-field-content">
              <div class="erag-form-group erag-form-row" style="margin-bottom: 0;">
                <div>
                  <label class="erag-form-label">Date</label>
                  <input v-model="form.date" class="erag-form-input" type="date">
                </div>
                <div class="erag-form-row">
                  <div>
                    <label class="erag-form-label">Start</label>
                    <input v-model="form.start" class="erag-form-input" type="time" @blur="form.start = normalizeTime(form.start)">
                  </div>
                  <div>
                    <label class="erag-form-label">End</label>
                    <input v-model="form.end" class="erag-form-input" type="time" @blur="form.end = normalizeTime(form.end)">
                  </div>
                </div>
              </div>
              <div v-if="timeError" class="erag-form-error" style="margin-top: 8px;">{{ timeError }}</div>
            </div>
          </div>

          <div class="erag-field-row">
            <div class="erag-field-icon" title="Calendar">
              <svg viewBox="0 0 24 24">
                <path d="M12 2H2v10l9.29 9.29c.39.39 1.02.39 1.41 0l7.59-7.59c.39-.39.39-1.02 0-1.41L12 2z"></path>
                <path d="m7 7-.01.01"></path>
              </svg>
            </div>
            <div class="erag-field-content">
              <select v-model="form.cal" class="erag-form-input">
                <option v-for="calendar in calendars" :key="calendar.id" :value="calendar.id">{{ calendar.label }}</option>
              </select>
            </div>
          </div>

          <div v-if="mentionUsersAllowed && mentionUsers.length" class="erag-field-row">
            <div class="erag-field-icon" title="Mentions">
              <svg viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div class="erag-field-content">
              <div class="erag-mention-select" @focusout="mentionListOpen = false">
                <div class="erag-mention-control" @click="focusMentionSearch">
                  <span v-for="user in selectedMentionUsers" :key="user.user_id" class="erag-mention-chip">
                    {{ user.name }}
                    <button type="button" class="erag-mention-remove" title="Remove" @mousedown.stop.prevent="removeMentionUser(user.user_id)">
                      <svg class="erag-mention-remove-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    ref="mentionSearchInput"
                    v-model="mentionSearch"
                    class="erag-mention-input"
                    placeholder="Search users..."
                    @focus="mentionListOpen = true"
                    @keydown.esc="mentionListOpen = false"
                  >
                </div>
                <div v-if="mentionListOpen" class="erag-mention-menu">
                  <div v-if="availableMentionUsers.length" class="erag-mention-results">
                    <button
                      v-for="user in availableMentionUsers"
                      :key="user.user_id"
                      type="button"
                      class="erag-mention-item"
                      @mousedown.prevent="addMentionUser(user)"
                    >
                      {{ user.name }}
                    </button>
                  </div>
                  <div v-if="!availableMentionUsers.length" class="erag-mention-empty">No users found</div>
                </div>
              </div>
            </div>
          </div>

          <div class="erag-field-row">
            <div class="erag-field-icon" title="Color">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
            </div>
            <div class="erag-field-content">
              <div class="erag-color-row">
                <div
                  v-for="color in swatchColors"
                  :key="color"
                  class="erag-cswatch"
                  :class="{ 'erag-sel': form.color === color }"
                  :style="{ background: color }"
                  @click="form.color = color"
                ></div>
              </div>
              <div class="erag-custom-color-row">
                <span class="erag-custom-color-preview" :style="{ background: form.color }"></span>
                <input v-model="form.color" class="erag-custom-color-picker" type="color" aria-label="Pick custom color">
                <input
                  :value="form.color"
                  class="erag-custom-color-input"
                  maxlength="7"
                  placeholder="#378ADD"
                  @input="setCustomColor(($event.target as HTMLInputElement).value)"
                >
              </div>
            </div>
          </div>

          <div class="erag-field-row">
            <div class="erag-field-icon" title="Notes">
              <svg viewBox="0 0 24 24">
                <line x1="21" x2="3" y1="6" y2="6"></line>
                <line x1="21" x2="9" y1="12" y2="12"></line>
                <line x1="21" x2="7" y1="18" y2="18"></line>
              </svg>
            </div>
            <div class="erag-field-content">
              <textarea v-model="form.desc" rows="3" class="erag-form-input" placeholder="Add notes..."></textarea>
            </div>
          </div>

          <div class="erag-modal-footer">
            <button v-if="form.id && permissions.delete" class="erag-btn erag-btn-danger" :disabled="processing" @click="$emit('delete', { ...form })">Delete</button>
            <button class="erag-btn" @click="$emit('close')">Cancel</button>
            <button v-if="form.id ? permissions.update : permissions.create" class="erag-btn erag-btn-primary" :disabled="processing" @click="save">{{ form.id ? 'Update' : 'Save' }}</button>
          </div>
        </template>

        <!-- TASK FORM CONTENT -->
        <template v-else>
          <div class="erag-form-group" style="padding-left: 40px; margin-bottom: 20px;">
            <input v-model="taskTitle" class="erag-title-input" placeholder="Add title" autofocus>
          </div>

          <!-- Date Selector Row -->
          <div class="erag-field-row">
            <div class="erag-field-icon" title="Date">
              <svg viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                <line x1="16" x2="16" y1="2" y2="6"></line>
                <line x1="8" x2="8" y1="2" y2="6"></line>
                <line x1="3" x2="21" y1="10" y2="10"></line>
              </svg>
            </div>
            <div class="erag-field-content">
              <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                <input v-model="taskDate" class="erag-form-input" type="date" style="max-width: 160px; margin-bottom: 0;">
                
                <!-- Time Selector -->
                <input v-if="taskTimeEnabled" v-model="taskTime" class="erag-form-input" type="time" style="max-width: 120px; margin-bottom: 0;">
                <button v-else type="button" class="erag-add-time-btn" @click="taskTimeEnabled = true">
                  Add time
                </button>
              </div>
            </div>
          </div>

          <!-- Add deadline checkmark decorative row -->
          <div class="erag-field-row">
            <div class="erag-field-icon" title="Add deadline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
            </div>
            <div class="erag-field-content" style="display: flex; align-items: center; height: 36px;">
              <span style="color: var(--text-muted); font-size: 13.5px; cursor: pointer;" @click="taskTimeEnabled = true">Add deadline</span>
            </div>
          </div>

          <!-- Description Row -->
          <div class="erag-field-row">
            <div class="erag-field-icon" title="Description">
              <svg viewBox="0 0 24 24">
                <line x1="21" x2="3" y1="6" y2="6"></line>
                <line x1="21" x2="9" y1="12" y2="12"></line>
                <line x1="21" x2="7" y1="18" y2="18"></line>
              </svg>
            </div>
            <div class="erag-field-content">
              <textarea v-model="taskDesc" rows="3" class="erag-form-input" placeholder="Add description or a Google Drive attachment"></textarea>
            </div>
          </div>

          <!-- Task List selector dropdown row -->
          <div class="erag-field-row">
            <div class="erag-field-icon" title="Task List">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </div>
            <div class="erag-field-content">
              <select v-model="taskList" class="erag-task-list-select">
                <option value="My Tasks">My Tasks</option>
                <option value="Work Tasks">Work Tasks</option>
                <option value="Personal Tasks">Personal Tasks</option>
              </select>
            </div>
          </div>

          <div class="erag-modal-footer">
            <button class="erag-btn" @click="$emit('close')">Cancel</button>
            <button class="erag-btn erag-btn-primary" :disabled="!taskTitle.trim()" @click="saveTask">Save</button>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
