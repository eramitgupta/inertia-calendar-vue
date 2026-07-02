import { CalendarEvent, MentionUser } from '../types';
export declare function useMentionUsers(form: CalendarEvent, mentionUsers: () => MentionUser[]): {
    addMentionUser: (user: MentionUser) => void;
    availableMentionUsers: import('vue').ComputedRef<MentionUser[]>;
    focusMentionSearch: () => Promise<void>;
    mentionListOpen: import('vue').Ref<boolean, boolean>;
    mentionSearch: import('vue').Ref<string, string>;
    mentionSearchInput: import('vue').Ref<HTMLInputElement | null, HTMLInputElement | null>;
    removeMentionUser: (userId: number) => void;
    resetMentionSearch: () => void;
    selectedMentionUsers: import('vue').ComputedRef<MentionUser[]>;
};
//# sourceMappingURL=useMentionUsers.d.ts.map