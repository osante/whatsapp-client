export interface ReactionData {
    message_id: string;
    emoji: string;
}

export function compareReactionData(a: ReactionData, b: ReactionData): boolean {
    return a.message_id === b.message_id && a.emoji === b.emoji;
}
