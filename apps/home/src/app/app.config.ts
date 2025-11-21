import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';

import { getPrimengConfig } from '@lob/client-shared-design-system-data';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    providePrimeNG(
      getPrimengConfig({
        basePreset: 'material',
        ripple: true,
        primaryColor: 'green',
        isDarkModeEnabledViaClass: true
      })
    ),
    provideRouter(appRoutes)
  ]
};
