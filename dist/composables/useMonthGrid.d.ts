import { CalendarEvent } from '../types';
interface MonthCell {
    date: Date;
    events: CalendarEvent[];
    other: boolean;
    today: boolean;
    value: string;
}
export declare function useMonthGrid(currentDate: () => Date, events: () => CalendarEvent[]): {
    cells: import('vue').ComputedRef<MonthCell[]>;
};
export {};
//# sourceMappingURL=useMonthGrid.d.ts.map