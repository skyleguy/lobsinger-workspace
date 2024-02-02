import { GameElement } from './game-element';
import { InteractionStatus } from './interactable';
import { Trigger } from './trigger';
import { Triggerable } from './triggerable';

export abstract class Puzzle implements Triggerable, GameElement {
  triggers: Trigger[] = [];
  description!: string;
  id!: string;
  image!: string;
  isDefault!: boolean;
  name!: string;
  status!: InteractionStatus;

  getAvailableTriggers(): Trigger[] {
    console.log('returning available triggers for puzzle');
    return this.triggers;
  }

  protected abstract startPuzzle(): void;
  abstract solvePuzzle(): void;
  abstract interact(): void;
  abstract completeInteraction(): void;
  abstract endInteraction(): void;
}

export abstract class TogglePuzzle extends Puzzle {
  targetWord!: string;
}

export class WordSpellTogglePuzzle extends TogglePuzzle {
  protected startPuzzle(): void {
    console.log(`WordSpellTogglePuzzle started`);
  }

  solvePuzzle(): void {
    console.log(`WordSpellTogglePuzzle solved`);
  }

  interact(): void {
    console.log('WordSpellTogglePuzzle interacted with');
    this.startPuzzle();
  }

  completeInteraction(): void {
    console.log('WordSpellTogglePuzzle interaction completed successfully');
  }

  endInteraction(): void {
    console.log('WordSpellTogglePuzzle interaction ended early');
  }
}
