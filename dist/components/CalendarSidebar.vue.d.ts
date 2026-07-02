import { CalendarDefinition } from '../types';
type __VLS_Props = {
    calendars: CalendarDefinition[];
    currentDate: Date;
    miniDate: Date;
    open?: boolean;
    visibleCalendars: Set<string>;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    add: () => any;
    "mini-next": () => any;
    "mini-prev": () => any;
    "select-date": (date: Date) => any;
    "toggle-calendar": (calendarId: string) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onAdd?: (() => any) | undefined;
    "onMini-next"?: (() => any) | undefined;
    "onMini-prev"?: (() => any) | undefined;
    "onSelect-date"?: ((date: Date) => any) | undefined;
    "onToggle-calendar"?: ((calendarId: string) => any) | undefined;
}>, {
    open: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
//# sourceMappingURL=CalendarSidebar.vue.d.ts.map