import { CalendarEvent } from '../types';
export declare function useDaySchedule(currentDate: () => Date, events: () => CalendarEvent[]): {
    date: import('vue').ComputedRef<string>;
    dayEvents: import('vue').ComputedRef<CalendarEvent[]>;
    eventStyle: (event: CalendarEvent, minimumHeight?: number) => Record<string, string>;
    hours: import('vue').ComputedRef<number[]>;
    nowTop: import('vue').ComputedRef<number>;
    today: import('vue').ComputedRef<string>;
};
//# sourceMappingURL=useDaySchedule.d.ts.map