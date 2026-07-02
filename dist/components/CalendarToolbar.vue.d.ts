import { CalendarView } from '../types';
type __VLS_Props = {
    canCreate?: boolean;
    search?: string;
    title: string;
    view: CalendarView;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    add: () => any;
    search: (value: string) => any;
    view: (view: CalendarView) => any;
    next: () => any;
    prev: () => any;
    "sidebar-toggle": () => any;
    today: () => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onAdd?: (() => any) | undefined;
    onSearch?: ((value: string) => any) | undefined;
    onView?: ((view: CalendarView) => any) | undefined;
    onNext?: (() => any) | undefined;
    onPrev?: (() => any) | undefined;
    "onSidebar-toggle"?: (() => any) | undefined;
    onToday?: (() => any) | undefined;
}>, {
    search: string;
    canCreate: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
//# sourceMappingURL=CalendarToolbar.vue.d.ts.map