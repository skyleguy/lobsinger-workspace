export interface Location {
  name: string;
  description: string;
  imageUrl?: string;
}

export interface Character {
  name: string;
  description: string;
  imageUrl?: string;
}

export interface Suggestion {
  title: string;
  description: string;
}

export interface Response {
  details: string;
  suggestions: Suggestion[];
}

export interface MysteryDetails {
  title: string;
  description: string;
  characters: Character[];
  // locations: Location[];
}

export interface Content {
  mysteryDetails: MysteryDetails;
  response: Response;
}

export interface ContentWrapper {
  role: string;
  id: string;
  creationTime: number;
  content: Content[];
}

type MysteryDetailsRecord = {
  [key in 'mysteryDetails']: MysteryDetails;
};

type ResponseRecord = {
  [key in 'response']: Response;
};

type MysteryResponseRecord = ResponseRecord & MysteryDetailsRecord;

export interface GptChatMessage {
  role: 'user' | 'system' | 'assistant';
  content: string | MysteryResponseRecord;
}
