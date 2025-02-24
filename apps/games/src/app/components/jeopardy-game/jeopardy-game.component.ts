import { Dialog } from '@angular/cdk/dialog';
import { KeyValuePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';

import { firstGame } from './models/first-game.const';
import { JeopardyAnswer } from './models/jeopardy-game.model';

import { JeopardyFullscreenAnswerComponent } from '../jeopardy-fullscreen-answer/jeopardy-fullscreen-answer.component';

@Component({
  selector: `games-jeopardy-game`,
  host: {
    class: `h-full w-full overflow-hidden flex flex-col gap-3 p-3 text-center bg-black text-white`
  },
  imports: [KeyValuePipe, NgClass],
  template: `
    <div class="grow flex gap-3 p-3 text-center">
      @for (category of jeopardyGame.categoryMap | keyvalue; track category.key) {
        <div [id]="category.key" class="flex-1 flex flex-col gap-3 items-center">
          <div
            class="flex-1 flex h-full w-full items-center justify-center border-2 rounded-lg border-black text-lg bg-blue-600 p-3"
            (mouseenter)="revealedCategories[category.key] = false"
          >
            <span class="transition-opacity duration-500 ease-in-out opacity-0" [class.!opacity-100]="!revealedCategories[category.key]">{{
              category.key
            }}</span>
          </div>
          @for (answer of category.value; track answer) {
            <div
              (click)="answer.isValid ? openDialog(answer) : null"
              class="flex-1 flex h-full w-full items-center justify-center border-2 border-blue-300 rounded-lg text-3xl bg-blue-600 text-yellow-400 p-3"
              [ngClass]="{
                'transform transition-transform duration-300 hover:scale-105 cursor-pointer': answer.isValid
              }"
            >
              @if (answer.isValid) {
                {{ answer.pointValue }}
              }
            </div>
          }
        </div>
      }
    </div>
    <div class="shrink flex justify-center">
      @for (player of jeopardyGame.players; track player.name) {
        <span class="text-3xl">{{ player.name }}: {{ player.score }}</span>
      }
    </div>
  `
})
export class JeopardyGameComponent {
  private dialog = inject(Dialog);

  protected readonly jeopardyGame = firstGame;
  protected readonly revealedCategories: Record<string, boolean> = Object.keys(this.jeopardyGame.categoryMap).reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: true
    }),
    {}
  );

  protected openDialog(answer: JeopardyAnswer): void {
    this.dialog
      .open<number, JeopardyAnswer, JeopardyFullscreenAnswerComponent>(JeopardyFullscreenAnswerComponent, {
        width: '100%',
        height: '100%',
        data: answer
      })
      .closed.subscribe((score) => {
        if (score !== undefined) {
          answer.isValid = false;
          this.jeopardyGame.players[0].score += score;
        }
      });
  }
}
