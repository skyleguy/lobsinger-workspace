import { BrowserContext } from '@playwright/test';

import * as path from 'path';

export function routeFromHAR(requestGroupName: string, context: BrowserContext, options: { url: string; update: boolean }) {
  context.routeFromHAR(path.join(__dirname, '..', 'recordings', requestGroupName, `${requestGroupName}.har`), {
    url: options.url,
    update: options.update
  });
}
