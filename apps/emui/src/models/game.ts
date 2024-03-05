import { uniqBy } from 'lodash';

import { Character } from './character';
import { Interactable } from './interactable';
import { Item } from './item';
import { Location, Scene } from './location';
import { Trigger } from './trigger';

export class Game {
  gameClock = 0;
  mysteryDetails: unknown;
  currentScene!: Scene | null;
  currentLocation!: Location | null;
  currentInteractable!: Interactable | null;
  inventory: Item[] = [];
  taskList: Pick<Trigger, 'taskDescription' | 'isComplete'>[] = [];
  notes: string[] = [];
  locations: Location[] = [];
  characters: Character[] = [];
  triggers: Trigger[] = [];

  constructor(obj: Partial<Game>) {
    Object.assign(this, obj);
  }

  startGame() {
    console.log('game started');
    this.pickDefaultLocation();
    this.pickDefaultScene();
    setInterval(() => {
      this.gameClock += 1;
    }, 1000);
    console.log('game created and clock is ticking');
  }

  endGame() {
    console.log('game ended');
  }

  loadGame() {
    console.log('game loaded');
  }

  saveGame() {
    console.log('game saved');
  }

  calculateAvailableTriggers() {
    console.log('game calculating available triggers');
    const currentAvailableTriggers: Trigger[] = this.locations?.reduce((acc, curr) => {
      return [...acc, ...curr.getAvailableTriggers()];
    }, [] as Trigger[]);
    if (this.inventory?.length > 0) {
      currentAvailableTriggers.push(
        ...this.inventory.reduce((acc, curr) => {
          return [...acc, ...curr.getAvailableTriggers()];
        }, [] as Trigger[])
      );
    }
    this.setTaskList(currentAvailableTriggers);
    console.log(`current available triggers: ${currentAvailableTriggers.length}`);
  }

  public setTaskList(availableTriggers: Trigger[]) {
    this.taskList = uniqBy(
      availableTriggers.map((trigger) => {
        return {
          isComplete: false,
          taskDescription: trigger.taskDescription
        };
      }),
      (trigger) => trigger.taskDescription
    );
    console.log(`games task list is ${JSON.stringify(this.taskList)}`);
  }

  setCurrentInteractable(interactable: Interactable) {
    this.currentInteractable = interactable;
  }

  public printState() {
    console.log(this);
  }

  public pickDefaultLocation() {
    this.currentLocation = this.currentLocation ?? this.locations?.find((location) => location.isDefault) ?? this.locations?.[0] ?? null;
    console.log(`picked ${this.currentLocation?.name} as the current location`);
  }

  public pickDefaultScene() {
    const scene =
      this.currentScene ?? this.currentLocation?.scenes.find((scene) => scene.isDefault) ?? this.currentLocation?.scenes?.[0] ?? null;
    if (scene) {
      this.setScene(scene);
    }
  }

  public setScene(scene: Scene) {
    console.log(`setting ${scene?.name} as the current scene`);
    this.currentScene = scene;
    scene.loadScene();
  }

  // need to make a more robust way of returning an InteractionResponse for each type of interactable that will help drive the UI
  // ex. the return value of a Character interaction should be a CharacterInteraction which has the character salutation, as well as the
  // avaible chat options for that character
}
