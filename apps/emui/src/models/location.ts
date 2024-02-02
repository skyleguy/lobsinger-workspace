import { Defaultable } from './defaultable';
import { GameElement } from './game-element';
import { InteractionStatus } from './interactable';
import { Navigatable } from './navigatable';
import { Trigger } from './trigger';

export interface Coordinate {
  x: number;
  y: number;
}

export interface SceneOverlay {
  boxCoordinates: Coordinate;
  element: GameElement;
}

export class Scene implements Defaultable, GameElement {
  sceneOverlays: SceneOverlay[] = [];

  description!: string;
  id!: string;
  image!: string;
  isDefault: boolean = false;
  name!: string;
  status!: InteractionStatus;

  constructor(obj: Partial<Scene>) {
    Object.assign(this, obj);
  }

  loadScene(): void {
    this.populateSceneOverlay();
    console.log(`loaded scene: ${this.name}`);
  }

  private populateSceneOverlay(): void {
    this.sceneOverlays
      .filter((overlay) => overlay.element.status === InteractionStatus.INTERACTABLE)
      .forEach((overlay) => {
        console.log(`overlaying coordinates for ${overlay.element.name} at ${JSON.stringify(overlay.boxCoordinates)}`);
      });
  }

  getAvailableTriggers(): Trigger[] {
    console.log(`returning available triggers for scene: ${this.name}`);
    return this.sceneOverlays?.reduce((acc, curr) => {
      return [...acc, ...curr.element.getAvailableTriggers()];
    }, [] as Trigger[]);
  }

  interact(): void {
    console.log(`scene: ${this.name} interacted with`);
  }

  completeInteraction(): void {
    console.log(`scene: ${this.name} interaction completed successfully`);
  }

  endInteraction(): void {
    console.log(`scene ${this.name} interaction ended early`);
  }
}

export class Location implements GameElement, Navigatable, Defaultable {
  scenes: Scene[] = [];

  description!: string;
  id!: string;
  image!: string;
  isDefault!: boolean;
  name!: string;
  status!: InteractionStatus;

  constructor(obj: Partial<Location>) {
    Object.assign(this, obj);
  }

  navigate(): void {
    console.log('navigating to location');
  }

  getAvailableTriggers(): Trigger[] {
    console.log(`returning available triggers for location: ${this.name}`);
    return this.scenes.reduce((acc, curr) => {
      return [...acc, ...curr.getAvailableTriggers()];
    }, [] as Trigger[]);
  }

  interact(): void {
    console.log(`location: ${this.name} interacted with`);
  }

  completeInteraction(): void {
    console.log(`location: ${this.name} interaction completed successfully`);
  }

  endInteraction(): void {
    console.log(`location ${this.name} interaction ended early`);
  }
}
