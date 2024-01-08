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
}

export interface MysteryContent {
  mysteryDetails: MysteryDetails;
  response: Response;
}
