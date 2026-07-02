import { CalendarEvent } from '../types';
export declare function useWeekGrid(currentDate: () => Date, events: () => CalendarEvent[]): {
    eventsFor: (date: Date) => CalendarEvent[];
    eventStyle: (event: CalendarEvent, minimumHeight?: number) => Record<string, string>;
    hours: import('vue').ComputedRef<number[]>;
    nowTop: import('vue').ComputedRef<number>;
    today: import('vue').ComputedRef<string>;
    weekDays: import('vue').ComputedRef<Date[]>;
};
//# sourceMappingURL=useWeekGrid.d.ts.map