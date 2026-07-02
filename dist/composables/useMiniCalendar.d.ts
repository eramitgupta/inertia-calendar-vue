interface MiniCalendarDay {
    date?: string;
    label: number;
    other?: boolean;
    selected?: boolean;
    today?: boolean;
}
export declare function useMiniCalendar(currentDate: () => Date, miniDate: () => Date): {
    miniDays: import('vue').ComputedRef<MiniCalendarDay[]>;
    miniTitle: import('vue').ComputedRef<string>;
    parseMiniDate: (value: string) => Date;
};
export {};
//# sourceMappingURL=useMiniCalendar.d.ts.map