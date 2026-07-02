import { Ref } from 'vue';
import { CalendarEvent, ModalMode } from '../types';
export declare function useCalendarModal(currentDate: Ref<Date>, canCreate: () => boolean, canUpdate: () => boolean): {
    closeModal: () => void;
    modalMode: Ref<ModalMode, ModalMode>;
    modalOpen: Ref<boolean, boolean>;
    openCreate: (date?: string) => void;
    openDetail: (event: CalendarEvent) => void;
    openEdit: (event: CalendarEvent) => void;
    selectedDate: Ref<string, string>;
    selectedEvent: Ref<{
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
};
//# sourceMappingURL=useCalendarModal.d.ts.map