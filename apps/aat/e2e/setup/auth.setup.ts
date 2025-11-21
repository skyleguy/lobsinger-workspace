import playwrightFirebasePlugin from '@nearform/playwright-firebase';
import { test as base } from '@playwright/test';

import { environment } from '../../src/environments/environment.staging';

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT ?? '{}');
const uid = process.env.USER_UID ?? '';
const options = environment.firebase;
export const test = playwrightFirebasePlugin(serviceAccount, options, uid, base);
