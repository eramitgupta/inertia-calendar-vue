import { CalendarDefinition, CalendarEvent, InertiaCalendarPermissions, MentionUser, ModalMode } from '../types';
type __VLS_Props = {
    calendars: CalendarDefinition[];
    event?: CalendarEvent | null;
    mentionUsers?: MentionUser[];
    mentionUsersAllowed?: boolean;
    mode?: ModalMode;
    open?: boolean;
    permissions?: InertiaCalendarPermissions;
    processing?: boolean;
    selectedDate?: string;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    edit: (event: CalendarEvent) => any;
    delete: (event: CalendarEvent) => any;
    close: () => any;
    save: (event: CalendarEvent) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onEdit?: ((event: CalendarEvent) => any) | undefined;
    onDelete?: ((event: CalendarEvent) => any) | undefined;
    onClose?: (() => any) | undefined;
    onSave?: ((event: CalendarEvent) => any) | undefined;
}>, {
    event: CalendarEvent | null;
    permissions: InertiaCalendarPermissions;
    mentionUsers: MentionUser[];
    open: boolean;
    selectedDate: string;
    mentionUsersAllowed: boolean;
    mode: ModalMode;
    processing: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
//# sourceMappingURL=EventModal.vue.d.ts.map