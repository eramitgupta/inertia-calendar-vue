import { CalendarEvent, InertiaCalendarHttpOptions, InertiaCalendarMutationResponse, InertiaCalendarRoutes } from '../types';
export declare function useInertiaCalendarEvents(routes?: InertiaCalendarRoutes, visitOptions?: InertiaCalendarHttpOptions): {
    errors: import('vue').ComputedRef<Record<string, string>>;
    processing: import('vue').ComputedRef<boolean>;
    createEvent: (event: CalendarEvent, options?: InertiaCalendarHttpOptions) => Promise<InertiaCalendarMutationResponse | null>;
    updateEvent: (event: CalendarEvent, options?: InertiaCalendarHttpOptions) => Promise<InertiaCalendarMutationResponse | null>;
    deleteEvent: (event: CalendarEvent, options?: InertiaCalendarHttpOptions) => Promise<InertiaCalendarMutationResponse | null>;
};
//# sourceMappingURL=useInertiaCalendarEvents.d.ts.map