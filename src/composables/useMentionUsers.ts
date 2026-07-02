import { computed, nextTick, ref } from 'vue'
import type { CalendarEvent, MentionUser } from '../types'

export function useMentionUsers(form: CalendarEvent, mentionUsers: () => MentionUser[]) {
  const mentionSearch = ref('')
  const mentionSearchInput = ref<HTMLInputElement | null>(null)
  const mentionListOpen = ref(false)

  const mentionedUserIds = computed(() => form.mentioned_user_ids || [])

  const selectedMentionUsers = computed(() => mentionUsers().filter((user) => mentionedUserIds.value.includes(user.user_id)))

  const availableMentionUsers = computed(() => {
    const search = mentionSearch.value.trim().toLowerCase()

    return mentionUsers().filter((user) => {
      if (mentionedUserIds.value.includes(user.user_id)) {
        return false
      }

      return !search || user.name.toLowerCase().includes(search)
    })
  })

  const addMentionUser = (user: MentionUser): void => {
    if (!form.mentioned_user_ids?.includes(user.user_id)) {
      form.mentioned_user_ids = [...(form.mentioned_user_ids || []), user.user_id]
    }

    mentionSearch.value = ''
    mentionListOpen.value = false
  }

  const removeMentionUser = (userId: number): void => {
    form.mentioned_user_ids = (form.mentioned_user_ids || []).filter((mentionedUserId) => mentionedUserId !== userId)
  }

  const focusMentionSearch = async (): Promise<void> => {
    mentionListOpen.value = true
    await nextTick()
    mentionSearchInput.value?.focus()
  }

  const resetMentionSearch = (): void => {
    mentionSearch.value = ''
    mentionListOpen.value = false
  }

  return {
    addMentionUser,
    availableMentionUsers,
    focusMentionSearch,
    mentionListOpen,
    mentionSearch,
    mentionSearchInput,
    removeMentionUser,
    resetMentionSearch,
    selectedMentionUsers,
  }
}
