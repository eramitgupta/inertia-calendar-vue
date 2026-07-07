import { onUnmounted, watch } from 'vue'

export function useBodyScrollLock(locked: () => boolean, className = 'erag-no-scroll') {
  const setLock = (shouldLock: boolean): void => {
    document.body.classList.toggle(className, shouldLock)
  }

  watch(locked, setLock, { immediate: true })

  onUnmounted(() => {
    setLock(false)
  })
}
