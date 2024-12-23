import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { FirebaseOptionsToken } from '@lob/client/shared/firebase/data';

import { appRoutes } from './app.routes';

import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: FirebaseOptionsToken, useValue: environment.firebase },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient()
  ]
};
