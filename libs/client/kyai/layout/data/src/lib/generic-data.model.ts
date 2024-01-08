export interface Suggestion {
  title: string;
  description: string;
}

export interface ConversationResponse {
  details: string;
  suggestions: Suggestion[];
}

export interface Entity {
  name: string;
  description: string;
  imageUrl?: string;
}
