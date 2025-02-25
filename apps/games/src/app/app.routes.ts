import { Route } from '@angular/router';

import { JeopardyGameComponent } from './components/jeopardy-game/jeopardy-game.component';

export const appRoutes: Route[] = [
  {
    path: 'jeopardy',
    component: JeopardyGameComponent
  },
  {
    path: '**',
    redirectTo: 'jeopardy'
  }
];
