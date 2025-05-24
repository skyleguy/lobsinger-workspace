import { animate, style, transition, trigger } from '@angular/animations';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, HostBinding, inject, signal } from '@angular/core';

import { JeopardyAnswer, Player } from '../jeopardy-game/models/jeopardy-game.model';

@Component({
  selector: `games-jeopardy-fullscreen-answer`,
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.8)'
        }),
        animate(
          '0.3s ease-in-out',
          style({
            opacity: 1,
            transform: 'scale(1)'
          })
        )
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'scale(1)'
        }),
        animate(
          '0.3s ease-in-out',
          style({
            opacity: 0,
            transform: 'scale(0.8)'
          })
        )
      ])
    ])
  ],
  styles: [
    `
      .emphasis-shadow {
        text-shadow:
          3px 3px 0 red,
          -1px -1px 0 yellow,
          1px -1px 0 red,
          -1px 1px 0 yellow,
          1px 1px 0 red;
      }

      .regular-shadow {
        text-shadow:
          3px 3px 0 #000,
          -1px -1px 0 #000,
          1px -1px 0 #000,
          -1px 1px 0 #000,
          1px 1px 0 #000;
      }
    `
  ],
  template: `
    <div
      class="p-5 h-full w-full flex flex-col gap-3 bg-blue-600 text-white items-center"
      [class.justify-center]="data.answer.isDailyDouble && !wagerLockedIn"
    >
      @if (data.answer.isDailyDouble && !wagerLockedIn) {
        <span class="text-9xl text-center emphasis-shadow">DAILY DOUBLE!</span>
        <div class="flex gap-3 p-3">
          <span class="text-3xl">What is your wager?</span>
          <input
            class="bg-white text-black pl-2"
            type="number"
            step="100"
            placeholder="wager"
            #wager
            (keydown.enter)="wagerLockedIn = +wager.value"
          />
        </div>
      } @else {
        <div class="grow flex gap-3 flex-col items-center justify-center">
          @if (data.answer.isTriplePlay) {
            <span class="text-6xl text-center emphasis-shadow">TRIPLE PLAY!</span>
          }
          <span class="text-6xl p-3 text-center regular-shadow">{{ data.answer.answer }}</span>
          @if (isRevealed()) {
            <span class="text-6xl p-3 text-center regular-shadow">{{ data.answer.question }}</span>
          }
          @if (isAnswered()) {
            <div class="flex gap-3 justify-center items-center p-3">
              @for (player of data.players; track player.name) {
                <div
                  (click)="closeModal(player)"
                  class="border-2 border-gray-400 rounded-md text-3xl p-3 hover:bg-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {{ player.name }}
                </div>
              }
            </div>
          } @else {
            <div class="flex gap-3 justify-center items-center p-3">
              <div
                (click)="isRevealed.set(true)"
                class="border-2 border-gray-400 rounded-md text-3xl p-3 hover:bg-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Reveal
              </div>
              <div
                (click)="answered(true)"
                class="border-2 border-green-400 rounded-md text-3xl p-3 hover:bg-green-400 hover:text-white transition-colors cursor-pointer"
              >
                Correct
              </div>
              <div
                (click)="answered(false)"
                class="border-2 border-red-400 rounded-md text-3xl p-3 hover:bg-red-400 hover:text-white transition-colors cursor-pointer"
              >
                Incorrect
              </div>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class JeopardyFullscreenAnswerComponent {
  @HostBinding('@animation') animationState = true;

  dialogRef = inject<DialogRef<void>>(DialogRef<boolean>);
  data: { answer: JeopardyAnswer; players: Player[] } = inject(DIALOG_DATA);
  wagerLockedIn = 0;
  triplayPlayCount = 3;
  triplayPlayScore = 0;
  isRevealed = signal(false);
  isAnswered = signal(false);
  score = 0;

  protected answered(isCorrect: boolean) {
    if (this.data.answer.isDailyDouble) {
      if (isCorrect) {
        this.setScore(this.wagerLockedIn);
      } else {
        this.setScore(this.wagerLockedIn * -1);
      }
      this.isAnswered.set(true);
    } else if (this.data.answer.isTriplePlay) {
      this.triplayPlayCount--;
      if (isCorrect) {
        this.triplayPlayScore += this.data.answer.pointValue;
      } else {
        this.triplayPlayScore += this.data.answer.pointValue * -1;
      }
      if (this.triplayPlayCount === 0) {
        this.setScore(this.triplayPlayScore);
        this.isAnswered.set(true);
      }
    } else {
      if (isCorrect) {
        this.setScore(this.data.answer.pointValue);
      } else {
        this.setScore(this.data.answer.pointValue * -1);
      }
      this.isAnswered.set(true);
    }
  }

  private setScore(score: number) {
    this.score = score;
  }

  protected closeModal(player: Player) {
    player.score += this.score;
    this.data.answer.isValid = false;
    this.dialogRef.close();
  }
}
