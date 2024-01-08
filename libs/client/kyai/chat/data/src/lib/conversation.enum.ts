import { InjectionToken } from '@angular/core';

export const ConversationType = new InjectionToken<Conversation>('ConversationType');

export enum Conversation {
  MYSTERY = 'mystery'
}
