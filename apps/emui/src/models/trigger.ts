import { Chat } from './character';

export abstract class Trigger {
  id!: string;
  taskDescription!: string;
  isComplete = false;

  constructor(obj: Partial<Trigger>) {
    Object.assign(this, obj);
  }

  abstract initiate(): void;
}

export class AddToNotesTrigger extends Trigger {
  message: string;

  constructor(obj: Partial<AddToNotesTrigger>) {
    super(obj);
    this.message = obj.message ?? '';
  }

  initiate(): void {
    // do something
    console.log('adding message to notes');
    this.isComplete = true;
  }
}

export class AddChatToCharacter extends Trigger {
  characterId: string;
  chat: Chat;

  constructor(obj: Partial<AddChatToCharacter>) {
    super(obj);
    this.characterId = obj.characterId ?? '';
    this.chat = obj.chat ?? new Chat({});
  }

  initiate(): void {
    console.log('adding message to notes');
    this.isComplete = true;
  }
}
