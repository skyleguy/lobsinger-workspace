import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

import { JeopardyAnswer } from '../jeopardy-game/models/jeopardy-game.model';

@Component({
  selector: `games-jeopardy-fullscreen-answer`,
  template: `
    <div
      class="p-3 h-full w-full flex flex-col gap-3 bg-blue-600 text-white items-center"
      [class.justify-center]="data.isDailyDouble && !wagerLockedIn"
    >
      @if (data.isDailyDouble && !wagerLockedIn) {
        <span class="text-9xl text-center">DAILY DOUBLE!</span>
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
        <div class="grow flex flex-col items-center justify-center">
          @if (data.isTriplePlay) {
            <span class="text-6xl text-center">TRIPLE PLAY!</span>
          }
          <span class="text-6xl p-3 text-center">{{ data.answer }}</span>
        </div>
        <div class="flex gap-3 justify-center items-center">
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
  `
})
export class JeopardyFullscreenAnswerComponent {
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
