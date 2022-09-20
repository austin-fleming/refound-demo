export type PostInteraction = "None" | "UpVote" | "DownVote" | "Report";

export type PostInteractionList = Record<PostInteraction, number>;
