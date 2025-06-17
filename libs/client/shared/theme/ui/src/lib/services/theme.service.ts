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
          const metaThemeColor = document.querySelector('meta[name="theme-color"]');
          if (metaThemeColor) {
            setMetaThemeColor(metaThemeColor);
          }
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

/**
 *
 * @param metaThemeColor The meta element for the theme color, e.g. `<meta name="theme-color" content="#ffffff">`
 * makes a few assumptions: there is an element with an id of header, and the backgroundColor for that element is set using the `color(srgb ...)` format.
 */
function setMetaThemeColor(metaThemeColor: Element) {
  setTimeout(() => {
    const nav = document.querySelector('#header');
    if (nav) {
      const rootStyle = getComputedStyle(nav);
      const surface = srgbColorToHex(rootStyle.backgroundColor);
      if (surface) {
        metaThemeColor.setAttribute('content', surface);
      }
    }
  }, 0);
}

function srgbColorToHex(srgbString: string) {
  const match = srgbString.trim().match(/color\(srgb\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/);

  if (!match) {
    console.warn('Invalid input format:', srgbString);
    return null;
  }

  const r = Math.round(Number(match[1]) * 255);
  const g = Math.round(Number(match[2]) * 255);
  const b = Math.round(Number(match[3]) * 255);

  const toHex = (n: number) => n.toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
