import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';
import { providePrimeNG } from 'primeng/config';

import { darkThemeSelector } from '@lob/client-shared-design-system-data';

import { appRoutes } from './app.routes';

const Home = definePreset(Material, {
  components: {}
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Home,
        options: {
          darkModeSelector: darkThemeSelector,
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          }
        }
      }
    }),
    provideRouter(appRoutes)
  ]
};
