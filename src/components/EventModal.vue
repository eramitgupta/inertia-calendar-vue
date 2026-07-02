<script setup lang="ts">
import { watch } from 'vue'
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
}>(), {
  event: null,
  mentionUsersAllowed: true,
  mentionUsers: () => [],
  mode: 'create',
  open: false,
  permissions: () => ({ create: true, update: true, delete: true }),
  processing: false,
  selectedDate: '',
})

const emit = defineEmits<{
  close: []
  delete: [event: CalendarEvent]
  edit: [event: CalendarEvent]
  save: [event: CalendarEvent]
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
</script>

<template>
  <div v-if="open" class="erag-overlay" @click.self="$emit('close')">
    <div class="erag-modal">
      <template v-if="mode === 'detail' && event">
        <div class="erag-detail-bar" :style="{ background: event.color }"></div>
        <div class="erag-modal-hdr">
          <span class="erag-modal-title">{{ event.title }}</span>
          <button class="erag-modal-close" @click="$emit('close')">×</button>
        </div>
        <div class="erag-detail-row"><span class="erag-detail-icon">📅</span><span>{{ formatLongDate(parseDate(event.date)) }}</span></div>
        <div class="erag-detail-row"><span class="erag-detail-icon">🕐</span><span>{{ formatTime(event.start) }} - {{ formatTime(event.end) }}</span></div>
        <div v-if="event.desc" class="erag-detail-row"><span class="erag-detail-icon">📝</span><span>{{ event.desc }}</span></div>
        <div class="erag-detail-row"><span class="erag-detail-icon">🏷</span><span>{{ calendarLabel(calendars, event) }}</span></div>
        <div v-if="mentionedUsersLabel(mentionUsers, event)" class="erag-detail-row"><span class="erag-detail-icon">@</span><span>{{ mentionedUsersLabel(mentionUsers, event) }}</span></div>
        <div class="erag-modal-footer">
          <button v-if="permissions.delete" class="erag-btn erag-btn-danger" :disabled="processing" @click="$emit('delete', event)">Delete</button>
          <button class="erag-btn" @click="$emit('close')">Close</button>
          <button v-if="permissions.update" class="erag-btn erag-btn-primary" :disabled="processing" @click="$emit('edit', event)">Edit</button>
        </div>
      </template>

      <template v-else>
        <div class="erag-modal-hdr">
          <span class="erag-modal-title">{{ form.id ? 'Edit event' : 'New event' }}</span>
          <button class="erag-modal-close" @click="$emit('close')">×</button>
        </div>
        <div class="erag-form-group">
          <label class="erag-form-label">Title</label>
          <input v-model="form.title" class="erag-form-input" placeholder="Event title">
        </div>
        <div class="erag-form-group">
          <label class="erag-form-label">Date</label>
          <input v-model="form.date" class="erag-form-input" type="date">
        </div>
        <div class="erag-form-group erag-form-row">
          <div>
            <label class="erag-form-label">Start</label>
            <input v-model="form.start" class="erag-form-input" type="time" @blur="form.start = normalizeTime(form.start)">
          </div>
          <div>
            <label class="erag-form-label">End</label>
            <input v-model="form.end" class="erag-form-input" type="time" @blur="form.end = normalizeTime(form.end)">
          </div>
        </div>
        <div v-if="timeError" class="erag-form-error">{{ timeError }}</div>
        <div class="erag-form-group">
          <label class="erag-form-label">Calendar</label>
          <select v-model="form.cal" class="erag-form-input">
            <option v-for="calendar in calendars" :key="calendar.id" :value="calendar.id">{{ calendar.label }}</option>
          </select>
        </div>
        <div v-if="mentionUsersAllowed && mentionUsers.length" class="erag-form-group">
          <label class="erag-form-label">Mention users</label>
          <div class="erag-mention-select" @focusout="mentionListOpen = false">
            <div class="erag-mention-control" @click="focusMentionSearch">
              <span v-for="user in selectedMentionUsers" :key="user.user_id" class="erag-mention-chip">
                {{ user.name }}
                <button type="button" class="erag-mention-remove" @mousedown.stop.prevent="removeMentionUser(user.user_id)">×</button>
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
        <div class="erag-form-group">
          <label class="erag-form-label">Color</label>
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
        <div class="erag-form-group">
          <label class="erag-form-label">Notes</label>
          <textarea v-model="form.desc" rows="3" class="erag-form-input" placeholder="Add notes..."></textarea>
        </div>
        <div class="erag-modal-footer">
          <button v-if="form.id && permissions.delete" class="erag-btn erag-btn-danger" :disabled="processing" @click="$emit('delete', { ...form })">Delete</button>
          <button class="erag-btn" @click="$emit('close')">Cancel</button>
          <button v-if="form.id ? permissions.update : permissions.create" class="erag-btn erag-btn-primary" :disabled="processing" @click="save">{{ form.id ? 'Update' : 'Add event' }}</button>
        </div>
      </template>
    </div>
  </div>
</template>
