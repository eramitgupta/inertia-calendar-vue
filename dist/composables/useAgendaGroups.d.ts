import { CalendarEvent } from '../types';
interface AgendaGroup {
    date: string;
    events: CalendarEvent[];
    isToday: boolean;
}
export declare function useAgendaGroups(currentDate: () => Date, events: () => CalendarEvent[]): {
    groupedEvents: import('vue').ComputedRef<AgendaGroup[]>;
};
export {};
//# sourceMappingURL=useAgendaGroups.d.ts.map