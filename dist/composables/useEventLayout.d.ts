import { CalendarEvent } from '../types';
export declare const eventKey: (event: CalendarEvent) => string | number;
export declare const eventTimeStyle: (event: CalendarEvent, minimumHeight?: number) => Record<string, string>;
export declare const sortEventsByTime: (events: CalendarEvent[]) => CalendarEvent[];
export declare const eventsForDate: (events: CalendarEvent[], date: Date | string) => CalendarEvent[];
export declare function useTimeSlots(): {
    hours: import('vue').ComputedRef<number[]>;
    nowTop: import('vue').ComputedRef<number>;
};
//# sourceMappingURL=useEventLayout.d.ts.map