import type { CalendarDefinition, CalendarEvent, MentionUser } from '../types'

export const calendarLabel = (calendars: CalendarDefinition[], event: CalendarEvent): string =>
  calendars.find((calendar) => calendar.id === event.cal)?.label || event.cal

export const mentionedUsersLabel = (mentionUsers: MentionUser[], event: CalendarEvent): string => {
  const mentionedUserIds = event.mentioned_user_ids || []

  return mentionUsers
    .filter((user) => mentionedUserIds.includes(user.user_id))
    .map((user) => user.name)
    .join(', ')
}
