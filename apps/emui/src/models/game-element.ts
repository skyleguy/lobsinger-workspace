import { Interactable } from './interactable';
import { Trigger } from './trigger';

export interface GameElement<InteractionResponse = unknown> extends Interactable<InteractionResponse> {
  name: string;
  description: string;
  image: string;
  id: string;

  getAvailableTriggers(): Trigger[];
}
