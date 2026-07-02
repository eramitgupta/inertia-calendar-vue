import { CalendarEvent } from '../types';
type __VLS_Props = {
    currentDate: Date;
    events: CalendarEvent[];
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    detail: (event: CalendarEvent) => any;
    add: (date: string) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onDetail?: ((event: CalendarEvent) => any) | undefined;
    onAdd?: ((date: string) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
//# sourceMappingURL=DayView.vue.d.ts.map