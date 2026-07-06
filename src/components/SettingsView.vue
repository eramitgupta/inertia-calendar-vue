<script setup lang="ts">
import { ref } from 'vue'

const googleSynced = ref(false)
const microsoftSynced = ref(false)
const defaultDuration = ref(60)
const dropdownOpen = ref(false)

const durationOptions = [15, 20, 30, 45, 60, 90, 120]

const toggleGoogle = () => {
  googleSynced.value = !googleSynced.value
}

const toggleMicrosoft = () => {
  microsoftSynced.value = !microsoftSynced.value
}

const selectDuration = (val: number) => {
  defaultDuration.value = val
  dropdownOpen.value = false
}

const handleImport = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length) {
    alert(`Imported file: ${target.files[0].name}`)
  }
}

const handleExport = () => {
  const data = JSON.stringify({ message: "Calendar Export Data" })
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'calendar-export.json'
  a.click()
}
</script>

<template>
  <div class="erag-settings-container">
    <!-- Accounts & Sync Section -->
    <div class="erag-settings-section">
      <h2 class="erag-settings-title">Sync Settings</h2>
      <div class="erag-sync-card">
        <!-- Google Calendar Sync -->
        <div class="erag-sync-row">
          <div class="erag-sync-info">
            <svg class="erag-sync-logo" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.78 0 3.39.61 4.65 1.8l3.48-3.48C17.98 1.19 15.22 0 12 0 7.31 0 3.25 2.69 1.25 6.63l4.08 3.16c.96-2.88 3.66-4.75 6.67-4.75z"/>
              <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.51h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.39-4.88 3.39-8.55z"/>
              <path fill="#FBBC05" d="M5.33 14.78a7.12 7.12 0 0 1 0-4.56L1.25 7.06a11.96 11.96 0 0 0 0 9.88l4.08-3.16z"/>
              <path fill="#34A853" d="M12 23.04c3.24 0 5.97-1.07 7.96-2.92l-3.66-2.84c-1.01.68-2.31 1.08-4.3 1.08-3.01 0-5.71-1.88-6.67-4.75L1.25 16.77c2 3.94 6.06 6.27 10.75 6.27z"/>
            </svg>
            <div class="erag-sync-text-group">
              <span class="erag-sync-name">Google Calendar</span>
              <span class="erag-sync-desc">Sync events with your Google account</span>
            </div>
          </div>
          <button 
            type="button" 
            class="erag-btn" 
            :class="{ 'erag-btn-task': googleSynced }" 
            @click="toggleGoogle"
          >
            {{ googleSynced ? 'Connected' : 'Sync' }}
          </button>
        </div>

        <!-- Microsoft Outlook Sync -->
        <div class="erag-sync-row">
          <div class="erag-sync-info">
            <svg class="erag-sync-logo" viewBox="0 0 23 23">
              <path fill="#f35325" d="M0 0h11v11H0z"/>
              <path fill="#80bb0a" d="M12 0h11v11H12z"/>
              <path fill="#00a1f1" d="M0 12h11v11H0z"/>
              <path fill="#ffb900" d="M12 12h11v11H12z"/>
            </svg>
            <div class="erag-sync-text-group">
              <span class="erag-sync-name">Microsoft Outlook</span>
              <span class="erag-sync-desc">Sync events with your Outlook calendar</span>
            </div>
          </div>
          <button 
            type="button" 
            class="erag-btn" 
            :class="{ 'erag-btn-task': microsoftSynced }" 
            @click="toggleMicrosoft"
          >
            {{ microsoftSynced ? 'Connected' : 'Sync' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Event Settings Section -->
    <div class="erag-settings-section">
      <h2 class="erag-settings-title">Event settings</h2>
      
      <div class="erag-dropdown-wrapper">
        <div class="erag-duration-trigger" @click="dropdownOpen = !dropdownOpen">
          <div class="erag-duration-text">
            <span class="erag-duration-label">Default duration</span>
            <span class="erag-duration-value">{{ defaultDuration }} minutes</span>
          </div>
          <svg class="erag-duration-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>

        <div v-if="dropdownOpen" class="erag-duration-menu">
          <div 
            v-for="opt in durationOptions" 
            :key="opt"
            class="erag-duration-item"
            :class="{ 'erag-selected': defaultDuration === opt }"
            @click="selectDuration(opt)"
          >
            {{ opt }} minutes
          </div>
        </div>
      </div>
    </div>

    <!-- Import & Export Section -->
    <div class="erag-settings-section">
      <div class="erag-impexp-container">
        <!-- Import -->
        <div class="erag-impexp-box">
          <h2 class="erag-impexp-header" style="color: #1d4ed8; font-size: 20px;">Import</h2>
          <p class="erag-impexp-desc">Upload event data files (.ics or .json) to load them into the calendar.</p>
          <label class="erag-btn erag-btn-task" style="display: inline-flex; cursor: pointer;">
            Choose file
            <input type="file" accept=".ics,.json" style="display: none;" @change="handleImport">
          </label>
        </div>

        <!-- Export -->
        <div class="erag-impexp-box">
          <h2 class="erag-impexp-header" style="color: #1d4ed8; font-size: 20px;">Export</h2>
          <p class="erag-impexp-desc">Download all your calendar events to backup or migrate your data.</p>
          <button type="button" class="erag-btn" @click="handleExport">
            Export
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
