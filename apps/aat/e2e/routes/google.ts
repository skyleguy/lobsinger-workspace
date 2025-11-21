import { BrowserContext } from '@playwright/test';

import { routeFromHAR } from '../utils/route-from-har';

export function interceptGoogleRequests(context: BrowserContext, update: boolean) {
  routeFromHAR('google', context, {
    url: 'https://lh3.googleusercontent.com/a/*',
    update
  });
}
