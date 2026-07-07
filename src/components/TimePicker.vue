<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const model = defineModel<string>({ default: '09:00' })

const props = withDefaults(defineProps<{
  placeholder?: string
}>(), {
  placeholder: 'Select time',
})

const open = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)

const hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
const periods = ['AM', 'PM']

const selected = ref({
  hour: '09',
  minute: '00',
  period: 'AM',
})

const displayValue = computed(() => `${selected.value.hour}:${selected.value.minute} ${selected.value.period}`)

const syncSelectedFromModel = (): void => {
  const [hourValue = '09', minuteValue = '00'] = String(model.value || '09:00').split(':')
  const hour = Number(hourValue)
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12

  selected.value = {
    hour: String(displayHour).padStart(2, '0'),
    minute: String(Number(minuteValue || 0)).padStart(2, '0'),
    period,
  }
}

const updateModel = (): void => {
  let hour = Number(selected.value.hour)

  if (selected.value.period === 'PM' && hour !== 12) {
    hour += 12
  }

  if (selected.value.period === 'AM' && hour === 12) {
    hour = 0
  }

  model.value = `${String(hour).padStart(2, '0')}:${selected.value.minute}`
}

const selectValue = (key: 'hour' | 'minute' | 'period', value: string): void => {
  selected.value[key] = value
  updateModel()
}

const handleClickOutside = (event: MouseEvent): void => {
  if (!wrapperRef.value?.contains(event.target as Node)) {
    open.value = false
  }
}

watch(() => model.value, syncSelectedFromModel, { immediate: true })

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="wrapperRef" class="erag-time-picker">
    <button type="button" class="erag-form-input erag-time-input" @click="open = !open">
      <span>{{ displayValue || props.placeholder }}</span>
      <span class="erag-time-clock-icon" aria-hidden="true">◷</span>
    </button>

    <div v-if="open" class="erag-time-dropdown">
      <div class="erag-time-column">
        <button
          v-for="hour in hours"
          :key="hour"
          type="button"
          :class="{ 'erag-selected': selected.hour === hour }"
          @click="selectValue('hour', hour)"
        >
          {{ hour }}
        </button>
      </div>

      <div class="erag-time-column">
        <button
          v-for="minute in minutes"
          :key="minute"
          type="button"
          :class="{ 'erag-selected': selected.minute === minute }"
          @click="selectValue('minute', minute)"
        >
          {{ minute }}
        </button>
      </div>

      <div class="erag-time-column">
        <button
          v-for="period in periods"
          :key="period"
          type="button"
          :class="{ 'erag-selected': selected.period === period }"
          @click="selectValue('period', period)"
        >
          {{ period }}
        </button>
      </div>
    </div>
  </div>
</template>
