import { MediaMatcher } from '@angular/cdk/layout';
import { effect, inject, linkedSignal } from '@angular/core';
import { signalStore, withHooks, withProps, withState } from '@ngrx/signals';

import { PlatformService } from '@lob/client/shared/platform/ui';
import { darkThemeClass } from '@lob/client/shared/theme/data';

const themeStorageKey = 'lobsinger-suite-theme';

interface ThemeServiceState {
  _isDarkMode: boolean;
  _persistedTheme: 'light' | 'dark' | null;
}

export const ThemeService = signalStore(
  { providedIn: 'root' },
  withState<ThemeServiceState>((platformService = inject(PlatformService), mediaMatcher = inject(MediaMatcher)) => ({
    _isDarkMode: mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches,
    _persistedTheme: platformService.isBrowser ? (localStorage.getItem(themeStorageKey) as 'light' | 'dark' | null) : null
  })),
  withProps((store) => ({
    currentTheme: linkedSignal(() => {
      const isDarkMode = store._isDarkMode();
      const persistedTheme = store._persistedTheme();
      if (persistedTheme) {
        return persistedTheme;
      }
      return isDarkMode ? 'dark' : 'light';
    })
  })),
  withHooks({
    onInit(store, platformService = inject(PlatformService)) {
      effect(() => {
        if (platformService.isBrowser) {
          const theme = store.currentTheme();
          localStorage.setItem(themeStorageKey, theme);
          const html = document.documentElement;
          if (theme === 'dark') {
            html.classList.add(darkThemeClass);
          } else {
            html.classList.remove(darkThemeClass);
          }
        }
      });
    }
  })
);
