import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Chat, isCharacter } from '../models/character';
import { Game } from '../models/game';
import { mockGame } from '../models/test';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  game: Game;
  chats: Chat[] = [];
  currentSalutation!: string;

  constructor() {
    this.game = mockGame;
    this.interactWithFirstInteractable();
  }

  interactWithFirstInteractable(): void {
    if (this.game.currentScene?.sceneOverlays?.[0]?.element) {
      this.game.setCurrentInteractable(this.game.currentScene?.sceneOverlays?.[0]?.element);
      if (this.game.currentInteractable) {
        if (isCharacter(this.game.currentInteractable)) {
          const characterInteractionResponse = this.game.currentInteractable.interact();
          this.chats = characterInteractionResponse.chats;
          this.currentSalutation = characterInteractionResponse.salutation;
        }
      }
    }
  }
}
