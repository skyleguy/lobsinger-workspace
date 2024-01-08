import { ConversationResponse, Entity } from '@lob/client/kyai/layout/data';

export interface MysteryDetails {
  title: string;
  description: string;
  characters: Entity[];
}

export interface MysteryContent {
  mysteryDetails: MysteryDetails;
  response: ConversationResponse;
}
