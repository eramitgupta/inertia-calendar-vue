import { CalendarOptions, CalendarProps, InertiaCalendarPermissions, InertiaCalendarRoutes } from '../types';
export declare function useCalendarResource(props: CalendarProps): {
    calendarOptions: import('vue').ComputedRef<CalendarOptions>;
    config: import('vue').ComputedRef<{
        [x: string]: unknown;
        sidebar?: boolean;
        color?: string;
        week_start?: string;
        timezone?: string;
        mention_users?: boolean;
    }>;
    hasRoutes: import('vue').ComputedRef<boolean>;
    mentionUsers: import('vue').ComputedRef<import('..').MentionUser[]>;
    permissions: import('vue').ComputedRef<Required<InertiaCalendarPermissions>>;
    resource: import('vue').ComputedRef<import('..').InertiaCalendarResource | undefined>;
    routes: import('vue').ComputedRef<InertiaCalendarRoutes>;
    shouldPersist: import('vue').ComputedRef<boolean>;
};
//# sourceMappingURL=useCalendarResource.d.ts.map