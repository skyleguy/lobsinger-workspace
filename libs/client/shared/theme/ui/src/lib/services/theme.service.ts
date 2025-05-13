import { MediaMatcher } from '@angular/cdk/layout';
import { effect, inject, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { signalStore, withHooks, withProps, withState } from '@ngrx/signals';
import { fromEvent, map } from 'rxjs';

import { PlatformService } from '@lob/client/shared/platform/ui';
import { darkThemeClass } from '@lob/client/shared/theme/data';

const themeStorageKey = 'lobsinger-suite-theme';

interface ThemeServiceState {
  _themeFromSystem: 'light' | 'dark';
  _persistedTheme: 'light' | 'dark' | null;
  _mediaMatcher: MediaMatcher;
  _platformService: PlatformService;
}

function getThemeFromSystem(mediaMatcher: MediaMatcher): 'light' | 'dark' {
  return mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const ThemeService = signalStore(
  { providedIn: 'root' },
  withState<ThemeServiceState>((mediaMatcher = inject(MediaMatcher), platformService = inject(PlatformService)) => ({
    _themeFromSystem: getThemeFromSystem(mediaMatcher),
    _persistedTheme: platformService.isBrowser ? (localStorage.getItem(themeStorageKey) as 'light' | 'dark' | null) : null,
    _mediaMatcher: mediaMatcher,
    _platformService: platformService
  })),
  withProps((store) => ({
    prefersColorSchemeChange: toSignal(
      fromEvent(store._mediaMatcher().matchMedia('(prefers-color-scheme: dark)'), 'change').pipe(
        map(() => getThemeFromSystem(store._mediaMatcher()))
      )
    )
  })),
  withProps((store) => ({
    currentTheme: linkedSignal(() => {
      const themeFromSystem = store._themeFromSystem();
      const persistedTheme = store._persistedTheme();
      if (persistedTheme) {
        return persistedTheme;
      }
      return themeFromSystem;
    })
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const prefersColorSchemeChange = store.prefersColorSchemeChange();
        if (prefersColorSchemeChange) {
          store.currentTheme.set(prefersColorSchemeChange);
        }
      });
      effect(() => {
        if (store._platformService().isBrowser) {
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
