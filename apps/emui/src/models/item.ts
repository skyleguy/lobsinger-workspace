import { GameElement } from './game-element';
import { Interactable, InteractionStatus } from './interactable';
import { Trigger } from './trigger';
import { Triggerable } from './triggerable';

export abstract class Item implements GameElement, Triggerable {
  triggers!: Trigger[];
  description!: string;
  id!: string;
  image!: string;
  isDefault!: boolean;
  name!: string;
  status!: InteractionStatus;

  useItem(interactable: Interactable) {
    if (interactable.status === InteractionStatus.INTERACTABLE) {
      interactable.interact();
    }
  }

  getAvailableTriggers(): Trigger[] {
    console.log('returning available triggers for item');
    return this.triggers;
  }

  abstract interact(): void;

  abstract completeInteraction(): void;

  abstract endInteraction(): void;
}

export class ModifyInteractionStatusItem extends Item {
  interact(): void {
    console.log('ModifyInteractionStatusItem interacted with');
  }

  completeInteraction(): void {
    console.log('ModifyInteractionStatusItem interaction completed successfully');
  }

  endInteraction(): void {
    console.log('ModifyInteractionStatusItem interaction ended early');
  }
}
