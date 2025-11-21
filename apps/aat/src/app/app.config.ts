import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { FirebaseOptionsToken } from '@lob/client/shared/firebase/data';
import { darkThemeSelector } from '@lob/client/shared/theme/data';

import { appRoutes } from './app.routes';
import { AAT } from './primeng-preset';

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
    providePrimeNG({
      theme: {
        preset: AAT,
        options: {
          darkModeSelector: darkThemeSelector,
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          }
        }
      }
    }),
    MessageService
  ]
};
