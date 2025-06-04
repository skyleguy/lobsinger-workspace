import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';
import { providePrimeNG } from 'primeng/config';

import { darkThemeSelector } from '@lob/client/shared/theme/data';

import { appRoutes } from './app.routes';

const RequestBuilder = definePreset(Material, {
  components: {}
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes),
    providePrimeNG({
      theme: {
        preset: RequestBuilder,
        options: {
          darkModeSelector: darkThemeSelector,
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          }
        }
      }
    })
  ]
};
