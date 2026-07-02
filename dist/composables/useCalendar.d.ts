import { Ref } from 'vue';
import { CalendarOptions, CalendarState } from '../types';
export declare const dateToString: (date: Date) => string;
export declare const parseDate: (value: Date | string) => Date;
export declare const timeToMinutes: (time: string) => number;
export declare const formatTime: (time: string) => string;
export declare const normalizeTime: (time: string) => string;
export declare const formatLongDate: (date: Date) => string;
export declare const formatMonthYear: (date: Date) => string;
export declare const formatWeekRange: (date: Date) => string;
export declare function useCalendar(options?: CalendarOptions | Ref<CalendarOptions>): CalendarState;
//# sourceMappingURL=useCalendar.d.ts.map