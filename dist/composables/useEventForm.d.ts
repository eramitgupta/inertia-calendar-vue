import { CalendarDefinition, CalendarEvent } from '../types';
interface EventFormOptions {
    calendars: () => CalendarDefinition[];
    event: () => CalendarEvent | null | undefined;
    onSave: (event: CalendarEvent) => void;
    open?: () => boolean | undefined;
    selectedDate: () => string | undefined;
}
export declare function useEventForm({ calendars, event, onSave, open, selectedDate }: EventFormOptions): {
    form: {
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
    };
    resetForm: () => void;
    save: () => void;
    setCustomColor: (color: string) => void;
    timeError: import('vue').Ref<string, string>;
};
export {};
//# sourceMappingURL=useEventForm.d.ts.map