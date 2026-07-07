<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
}

const model = defineModel<string | number>({ default: '' })

const props = withDefaults(defineProps<{
  options: SelectOption[]
  placeholder?: string
}>(), {
  placeholder: 'Select...',
})

const open = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  const match = props.options.find((opt) => opt.value === model.value)

  return match ? match.label : ''
})

const selectOption = (value: string | number): void => {
  model.value = value
  open.value = false
}

const handleClickOutside = (event: MouseEvent): void => {
  if (!wrapperRef.value?.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="wrapperRef" class="erag-custom-select">
    <button type="button" class="erag-form-input erag-select-trigger" @click="open = !open">
      <span :class="{ 'erag-select-placeholder': !selectedLabel }">{{ selectedLabel || props.placeholder }}</span>
      <span class="erag-select-chevron" :class="{ 'erag-select-chevron-open': open }" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    </button>

    <div v-if="open" class="erag-select-dropdown">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        class="erag-select-option"
        :class="{ 'erag-selected': model === option.value }"
        @click="selectOption(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
