import { animate, style, transition, trigger } from '@angular/animations';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, HostBinding, inject } from '@angular/core';

import { JeopardyAnswer } from '../jeopardy-game/models/jeopardy-game.model';

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
      [class.justify-center]="data.isDailyDouble && !wagerLockedIn"
    >
      @if (data.isDailyDouble && !wagerLockedIn) {
        <span class="text-9xl text-center emphasis-shadow">DAILY DOUBLE!</span>
        <div class="flex gap-3 p-3">
          <span class="text-3xl">What is your wager?</span>
          <input
            class="text-black pl-2"
            type="number"
            step="100"
            placeholder="wager"
            #wager
            (keydown.enter)="wagerLockedIn = +wager.value"
          />
        </div>
      } @else {
        <div class="grow flex gap-3 flex-col items-center justify-center">
          @if (data.isTriplePlay) {
            <span class="text-6xl text-center emphasis-shadow">TRIPLE PLAY!</span>
          }
          <span class="text-6xl p-3 text-center regular-shadow">{{ data.answer }}</span>
          <div class="flex gap-3 justify-center items-center p-3">
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
        </div>
      }
    </div>
  `
})
export class JeopardyFullscreenAnswerComponent {
  @HostBinding('@animation') animationState = true;

  dialogRef = inject<DialogRef<number>>(DialogRef<boolean>);
  data: JeopardyAnswer = inject(DIALOG_DATA);
  wagerLockedIn = 0;
  triplayPlayCount = 3;
  triplayPlayScore = 0;

  protected answered(isCorrect: boolean) {
    if (this.data.isDailyDouble) {
      if (isCorrect) {
        this.dialogRef.close(this.wagerLockedIn);
      } else {
        this.dialogRef.close(this.wagerLockedIn * -1);
      }
    } else if (this.data.isTriplePlay) {
      this.triplayPlayCount--;
      if (isCorrect) {
        this.triplayPlayScore += this.data.pointValue;
      } else {
        this.triplayPlayScore += this.data.pointValue * -1;
      }
      if (this.triplayPlayCount === 0) {
        this.dialogRef.close(this.triplayPlayScore);
      }
    } else {
      if (isCorrect) {
        this.dialogRef.close(this.data.pointValue);
      } else {
        this.dialogRef.close(this.data.pointValue * -1);
      }
    }
  }
}
