import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { FirebaseOptionsToken } from '@lob/client/shared/firebase/data';
import { getPrimengConfig } from '@lob/client-shared-design-system-data';

import { appRoutes } from './app.routes';

import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: FirebaseOptionsToken, useValue: environment.firebase },
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    providePrimeNG(
      getPrimengConfig({
        basePreset: 'material',
        ripple: true,
        primaryColor: 'green',
        isDarkModeEnabledViaClass: true
      })
    ),
    MessageService
  ]
};
