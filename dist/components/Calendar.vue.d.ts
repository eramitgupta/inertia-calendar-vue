import { CalendarEvent, CalendarProps } from '../types';
declare var __VLS_1: {
    errors: import('vue').ComputedRef<Record<string, string>>;
    processing: import('vue').ComputedRef<boolean>;
    closeModal: () => void;
    deleteEvent: (event: CalendarEvent) => void;
    modalMode: import('vue').Ref<import('..').ModalMode, import('..').ModalMode>;
    modalOpen: import('vue').Ref<boolean, boolean>;
    openCreate: (date?: string) => void;
    openDetail: (event: CalendarEvent) => void;
    openEdit: (event: CalendarEvent) => void;
    saveEvent: (event: CalendarEvent) => void;
    selectedDate: import('vue').Ref<string, string>;
    selectedEvent: import('vue').Ref<{
        [x: string]: unknown;
        id?: (import('..').EventId | null) | undefined;
        title: string;
        date: string;
        start: string;
        end: string;
        cal: string;
        color: string;
        desc?: string | undefined;
        mentioned_user_ids?: number[] | undefined;
    } | null, CalendarEvent | {
        [x: string]: unknown;
        id?: (import('..').EventId | null) | undefined;
        title: string;
        date: string;
        start: string;
        end: string;
        cal: string;
        color: string;
        desc?: string | undefined;
        mentioned_user_ids?: number[] | undefined;
    } | null>;
    calendars: import('vue').Ref<import('..').CalendarDefinition[]>;
    currentDate: import('vue').Ref<Date>;
    currentView: import('vue').Ref<import('..').CalendarView>;
    events: import('vue').Ref<CalendarEvent[]>;
    filteredEvents: import('vue').Ref<CalendarEvent[]>;
    miniDate: import('vue').Ref<Date>;
    search: import('vue').Ref<string>;
    sidebarOpen: import('vue').Ref<boolean>;
    title: import('vue').Ref<string>;
    visibleCalendars: import('vue').Ref<Set<string>>;
    formatLongDate: (date: Date) => string;
    formatMonthYear: (date: Date) => string;
    formatTime: (time: string) => string;
    formatWeekRange: (date: Date) => string;
    goToday: () => void;
    navigate: (direction: number) => void;
    selectDate: (date: Date | string) => void;
    setView: (view: import('..').CalendarView) => void;
    toggleCalendar: (calendarId: string) => void;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import('vue').DefineComponent<CalendarProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    create: (event: CalendarEvent) => any;
    delete: (event: CalendarEvent) => any;
    update: (event: CalendarEvent) => any;
}, string, import('vue').PublicProps, Readonly<CalendarProps> & Readonly<{
    onCreate?: ((event: CalendarEvent) => any) | undefined;
    onDelete?: ((event: CalendarEvent) => any) | undefined;
    onUpdate?: ((event: CalendarEvent) => any) | undefined;
}>, {
    resource: import('..').InertiaCalendarResource;
    calendar: import('..').InertiaCalendarPayload;
    config: import('..').InertiaCalendarConfig;
    permissions: import('..').InertiaCalendarPermissions;
    routes: import('..').InertiaCalendarRoutes;
    visitOptions: import('..').InertiaCalendarHttpOptions;
    headless: boolean;
    mentionUsers: import('..').MentionUser[];
    persistWithInertia: boolean;
    calendars: import('..').CalendarDefinition[];
    events: CalendarEvent[];
    initialDate: Date | string;
    initialView: import('..').CalendarView;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Calendar.vue.d.ts.map