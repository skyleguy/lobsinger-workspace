export enum InteractionStatus {
  INTERACTABLE = 'INTERACTABLE',
  UNINTERACTABLE = 'UNINTERACTABLE'
}

export interface Interactable<StartInteractionResponse = unknown, CompleteInteractionResponse = unknown, EndInteractionResponse = unknown> {
  status: InteractionStatus;

  interact(): StartInteractionResponse;
  completeInteraction(): CompleteInteractionResponse;
  endInteraction(): EndInteractionResponse;
}
