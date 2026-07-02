import { ComputedRef } from 'vue';
import { CalendarEvent, CalendarState } from '../types';
import { useInertiaCalendarEvents } from './useInertiaCalendarEvents';
type InertiaCalendarEvents = ReturnType<typeof useInertiaCalendarEvents>;
interface CalendarMutationEmits {
    create: (event: CalendarEvent) => void;
    delete: (event: CalendarEvent) => void;
    update: (event: CalendarEvent) => void;
}
interface CalendarMutationOptions {
    calendar: CalendarState;
    canDelete: () => boolean;
    closeModal: () => void;
    emit: CalendarMutationEmits;
    inertiaEvents: InertiaCalendarEvents;
    shouldPersist: ComputedRef<boolean>;
}
export declare function useCalendarMutations({ calendar, canDelete, closeModal, emit, inertiaEvents, shouldPersist }: CalendarMutationOptions): {
    deleteEvent: (event: CalendarEvent) => void;
    saveEvent: (event: CalendarEvent) => void;
};
export {};
//# sourceMappingURL=useCalendarMutations.d.ts.map