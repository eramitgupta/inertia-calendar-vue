# @erag/inertia-calendar-vue

A feature-rich, fully customizable calendar component library for **Vue 3** + **Inertia.js** applications. Built with TypeScript, it provides month, week, day, and agenda views with event management, task creation, mention users, and deep color theming — all out of the box.

---

## ✨ Features

### 📅 Multiple Calendar Views
- **Month View** — Traditional grid layout showing events across the entire month.
- **Week View** — Hourly time grid for a 7-day week with overlapping event support.
- **Day View** — Detailed hourly breakdown for a single day.
- **Agenda View** — Chronological list of upcoming events grouped by date.
- **Settings View** — Built-in settings panel for sync, import/export, and defaults.

### 🎨 Full Color Customization
Pass a `configColors` prop to fully customize the calendar's appearance — primary, accent, control, danger, task colors, backgrounds, borders, overlays, and more. Just set a `primary` color and the library auto-generates matching light, shadow, and soft variants.

```vue
<Calendar
  :config-colors="{
    primary: '#0f766e',
    primaryAccent: '#0d9488',
    controlAccent: '#0d9488',
    task: '#7c3aed',
  }"
/>
```

**Available color tokens:**

| Token | CSS Variable | Description |
|---|---|---|
| `primary` | `--color-primary` | Main brand color |
| `primaryHover` | `--color-primary-hover` | Primary hover state |
| `primaryAccent` | `--color-primary-accent` | Accent variant of primary |
| `primaryLight` | `--color-primary-light` | Light tint (auto-generated) |
| `primarySoft` | `--color-primary-soft` | Soft background (auto-generated) |
| `primaryShadow` | `--color-primary-shadow` | Shadow color (auto-generated) |
| `controlAccent` | `--control-accent` | Form control accent |
| `controlFocus` | `--control-focus` | Input focus ring |
| `controlShadow` | `--control-shadow` | Control shadow |
| `controlBorder` | `--control-border` | Control borders |
| `controlBackground` | `--control-bg` | Control backgrounds |
| `background` | `--bg-main` | Main background |
| `sidebarBackground` | `--bg-sidebar` | Sidebar background |
| `toolbarBackground` | `--bg-toolbar` | Toolbar background |
| `hoverBackground` | `--bg-hover` | Hover state background |
| `modalBackground` | `--modal-bg` | Modal background |
| `overlay` | `--overlay-bg` | Overlay backdrop |
| `textPrimary` | `--text-primary` | Primary text color |
| `textSecondary` | `--text-secondary` | Secondary text color |
| `textMuted` | `--text-muted` | Muted text color |
| `danger` | `--color-danger` | Danger/delete color |
| `dangerHover` | `--color-danger-hover` | Danger hover |
| `task` | `--color-task` | Task accent color |
| `taskHover` | `--color-task-hover` | Task hover |
| `variables` | Custom `--*` keys | Pass any arbitrary CSS variables |

### 🌙 Dark Mode Support
Automatic dark mode via `.erag-dark` class, `[data-theme="dark"]` attribute, or `prefers-color-scheme: dark` media query.

### 📝 Event Management
- **Create** events with title, description, date, time range, color, and calendar assignment.
- **Edit** existing events inline.
- **Delete** events with confirmation.
- **Color swatches** — 8 built-in swatch colors for quick event color selection + custom color picker.
- **Detail modal** — View event details in a read-only mode before editing.

### ✅ Task Creation
- Create tasks with title, description, date, time, and task list assignment.
- Toggle between all-day and timed tasks.
- Separate "Event" and "Task" tabs in the creation modal.

### 👥 Mention Users
- Tag/mention users in events.
- Searchable mention user list with chip-based selection.
- Configurable via `mentionUsers` prop and `mention_users` config flag.

### 📆 Sidebar
- Mini calendar for quick date navigation.
- Calendar list with visibility toggles.
- Quick "New Event" and "New Task" buttons.
- Collapsible sidebar with responsive behavior.

### 🔍 Search
- Search bar in the toolbar to filter events by title.

### 🔗 Inertia.js Integration
- Built-in Inertia HTTP persistence via `useHttp` (Inertia v3).
- Configurable CRUD routes: `create`, `store`, `update`, `delete`, `destroy`.
- Route resolvers support strings, functions, and `:id` placeholder replacement.
- Pass `visitOptions` for custom Inertia request options.
- Automatic `persistWithInertia` detection based on route presence.

### ⚙️ Settings Panel
- **Google Calendar sync** toggle.
- **Microsoft Outlook sync** toggle.
- **Default event duration** selector (15–120 minutes).
- **Import** events from `.ics` or `.json` files.
- **Export** calendar data as JSON.

### 🎯 Permissions
Control user abilities granularly:
```ts
<Calendar :permissions="{ create: true, update: true, delete: false }" />
```

### 🧩 Headless Mode
Use `headless` prop to get full calendar state via scoped slots without any UI:
```vue
<Calendar headless v-slot="calendar">
  <!-- Build your own UI using calendar.events, calendar.currentView, etc. -->
</Calendar>
```

---

## 📦 Installation

```bash
npm install @erag/inertia-calendar-vue
```

### Peer Dependencies
- `vue` ^3.3.0
- `@inertiajs/vue3` ^3.0.0

---

## 🚀 Quick Start

```vue
<script setup lang="ts">
import { Calendar } from '@erag/inertia-calendar-vue'
import type { CalendarColors, CalendarResource } from '@erag/inertia-calendar-vue'
import '@erag/inertia-calendar-vue/style.css'

defineProps<{
  resource: CalendarResource
}>()

const configColors: CalendarColors = {
  primary: '#0f766e',
  primaryAccent: '#0d9488',
  controlAccent: '#0d9488',
}
</script>

<template>
  <Calendar
    :config-colors="configColors"
    :resource="resource"
    @create="console.log('created', $event)"
    @update="console.log('updated', $event)"
    @delete="console.log('deleted', $event)"
  />
</template>
```

---

## 📋 Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `resource` | `CalendarResource` | — | Server-side resource containing events, calendars, config |
| `calendar` | `CalendarPayload` | — | Alias for `resource` |
| `calendars` | `CalendarDefinition[]` | — | Calendar definitions (id, label, color) |
| `events` | `CalendarEvent[]` | — | Array of calendar events |
| `initialDate` | `Date \| string` | Today | Initial date to display |
| `initialView` | `CalendarView` | `'month'` | Initial view: `month`, `week`, `day`, `agenda` |
| `config` | `CalendarConfig` | `{}` | Configuration object |
| `configColors` | `CalendarColors` | `{}` | Color customization tokens |
| `permissions` | `CalendarPermissions` | All `true` | CRUD permission flags |
| `routes` | `CalendarRoutes` | `{}` | Inertia route definitions |
| `visitOptions` | `CalendarHttpOptions` | `{}` | Inertia HTTP request options |
| `headless` | `boolean` | `false` | Render only scoped slots, no UI |
| `mentionUsers` | `MentionUser[]` | `[]` | Users available for mentions |
| `persistWithInertia` | `boolean` | Auto | Force Inertia persistence on/off |

---

## 📡 Events

| Event | Payload | Description |
|---|---|---|
| `create` | `CalendarEvent` | Fired when a new event is saved |
| `update` | `CalendarEvent` | Fired when an event is updated |
| `delete` | `CalendarEvent` | Fired when an event is deleted |
| `create-task` | `CalendarTaskPayload` | Fired when a new task is created |

---

## 🧱 Exported Components

| Component | Description |
|---|---|
| `Calendar` | Main calendar component with full UI |
| `EventModal` | Event create/edit/detail modal |
| `CalendarToolbar` | Navigation toolbar (today, prev, next, view switcher, search) |
| `CalendarSidebar` | Sidebar with mini calendar and calendar list |
| `MonthView` | Month grid view |
| `WeekView` | Weekly hourly grid view |
| `DayView` | Daily hourly view |
| `AgendaView` | Chronological event list |
| `DatePicker` | Inline date picker component |
| `TimePicker` | Time picker with hour/minute/AM-PM columns |

---

## 🧰 Exported Composables

| Composable | Description |
|---|---|
| `useCalendar` | Core calendar state management (dates, views, events, navigation) |
| `useCalendarResource` | Resolves props, config, resource, permissions, and routes |
| `useCalendarModal` | Modal open/close, create/edit/detail mode management |
| `useCalendarMutations` | Event save/delete with optional Inertia persistence |
| `useInertiaCalendarEvents` | Inertia HTTP client for CRUD operations |
| `useEventForm` | Event form state and validation |
| `useEventTaskForm` | Task form state and tab management |
| `useMentionUsers` | Mention user search, selection, and chip management |
| `useMonthGrid` | Month grid cell computation |
| `useWeekGrid` | Week grid day/hour computation |
| `useDaySchedule` | Day hourly schedule computation |
| `useAgendaGroups` | Group events by date for agenda view |
| `useEventLayout` | Overlapping event layout algorithm |
| `useMiniCalendar` | Mini calendar grid for sidebar |
| `useBodyScrollLock` | Lock body scroll when modal is open |
| `useCalendarLabels` | Calendar and mention user label helpers |
| `useCalendarInput` | Input helpers |

---

## 🗂️ Type Definitions

```ts
interface CalendarEvent {
  id?: string | number | null
  title: string
  date: string        // YYYY-MM-DD
  start: string       // HH:mm
  end: string         // HH:mm
  cal: string         // calendar id
  color: string       // hex color
  desc?: string
  mentioned_user_ids?: number[]
}

interface CalendarDefinition {
  id: string
  label: string
  color: string
}

interface MentionUser {
  user_id: number
  name: string
}

type CalendarView = 'month' | 'week' | 'day' | 'agenda' | 'settings'
```

---

## 🔌 Server-Side Resource Structure

When using with Laravel/Inertia, pass a `CalendarResource` from the backend:

```ts
interface CalendarResource {
  data?: {
    calendars?: CalendarDefinition[]
    events?: CalendarEvent[]
    initialDate?: Date | string
    initialView?: CalendarView
    sidebarOpen?: boolean
  }
  config?: {
    sidebar?: boolean
    week_start?: string
    timezone?: string
    mention_users?: boolean
    mentionUsers?: MentionUser[]
    permissions?: CalendarPermissions
    persistWithInertia?: boolean
    routes?: CalendarRoutes
  }
  mentionUsers?: MentionUser[]
  routes?: CalendarRoutes
  permissions?: CalendarPermissions
}
```

---

## 🛣️ Route Configuration

```ts
<Calendar
  :routes="{
    create: '/api/events',
    store: '/api/events',
    update: '/api/events/:id',
    delete: '/api/events/:id',
  }"
/>
```

Routes support:
- **String** with `:id` placeholder: `'/api/events/:id'`
- **Function**: `(event) => \`/api/events/\${event.id}\``
- **null**: Disable the operation

---

## 🏗️ Build

```bash
npm run build      # Build library to dist/
npm run typecheck   # Run TypeScript type checking
```

**Output:**
- `dist/inertia-calendar.js` — ES module
- `dist/inertia-calendar.umd.cjs` — UMD module
- `dist/style.css` — Compiled styles
- `dist/index.d.ts` — TypeScript declarations

---

## 📄 License

MIT
