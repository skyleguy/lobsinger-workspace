import { GameElement } from './game-element';
import { Interactable, InteractionStatus } from './interactable';
import { Trigger } from './trigger';
import { Triggerable } from './triggerable';

export class Chat implements Triggerable {
  userOption!: string;
  characterResponse!: string;
  isPerpetual!: boolean;

  triggers!: Trigger[];

  constructor(obj: Partial<Chat>) {
    Object.assign(this, obj);
  }

  outputTextAudio(): void {
    console.log('attempting to read characters response out loud');
  }
}

export class Character implements GameElement<{ chats: Chat[]; salutation: string }> {
  chats!: Chat[];
  salutations!: string[];
  valedictions!: string[];

  constructor(obj: Partial<Character>) {
    Object.assign(this, obj);
  }

  description!: string;
  id!: string;
  image!: string;
  isDefault!: boolean;
  name!: string;
  status!: InteractionStatus;

  getAvailableTriggers(): Trigger[] {
    console.log(`returning available triggers for character: ${this.name}`);
    return this.chats.reduce((acc, curr) => {
      return [...acc, ...curr.triggers];
    }, [] as Trigger[]);
  }

  interact() {
    console.log(`character: ${this.name} interacted with`);
    const randomIndex = Math.floor(Math.random() * (this.salutations?.length - 1 - 0 + 1)) + 0;
    return {
      chats: this.chats,
      salutation: this.salutations[randomIndex]
    };
  }

  completeInteraction(): void {
    const randomIndex = Math.floor(Math.random() * (this.salutations?.length - 1 - 0 + 1)) + 0;
    console.log(`${this.name} says: ${this.valedictions[randomIndex]}`);
    console.log(`character: ${this.name} interaction completed successfully`);
  }

  endInteraction(): void {
    const randomIndex = Math.floor(Math.random() * (this.salutations?.length - 1 - 0 + 1)) + 0;
    console.log(`${this.name} says: ${this.valedictions[randomIndex]}`);
    console.log(`character: ${this.name} interaction ended early`);
  }
}

export function isCharacter(data: Interactable<unknown, unknown, unknown>): data is Character {
  return data && 'chats' in data;
}
