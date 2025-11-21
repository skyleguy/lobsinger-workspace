import { BrowserContext } from '@playwright/test';

import { routeFromHAR } from '../utils/route-from-har';

export function interceptFirebaseRequests(context: BrowserContext, update: boolean) {
  routeFromHAR('firebase', context, {
    url: 'https://us-central1-lobsinger-workspace-dev-e45e7.cloudfunctions.net/*',
    update
  });
}
