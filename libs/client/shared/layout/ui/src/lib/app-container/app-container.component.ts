import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { debounceTime, fromEvent, map, startWith } from 'rxjs';

import { TabMenuItem } from '@lob/client/shared/layout/data';

import { TabMenuComponent } from '../tab-menu/tab-menu.component';

export interface ErrorConfig {
  icon: 'error' | 'warning';
  primaryMessage: string;
  secondaryMessage?: string;
}

@Component({
  selector: 'shared-layout-ui-app-container',
  imports: [MatIcon, MatTabsModule, TabMenuComponent],
  styles: [
    `
      .scale-3 {
        transform: scale(3);
        transform-origin: center;
      }
    `
  ],
  template: `
    <div class="w-screen flex flex-col mobile-safe-area" [style.height]="deviceHeight() + 'px'">
      @if (isHeaderAvailable()) {
        <nav id="header" class="shrink flex items-center justify-between">
          <ng-content select="[nav]"></ng-content>
        </nav>
      }
      @if (errorConfig(); as errorConfig) {
        <div class="grow flex flex-col items-center justify-center p-5 gap-5">
          <mat-icon class="scale-3 mb-3">{{ errorConfig.icon }}</mat-icon>
          <div class="flex flex-col justify-center items-center">
            <h4 class="!m-0">{{ errorConfig.primaryMessage }}</h4>
            <h6 class="!m-0">{{ errorConfig.secondaryMessage }}</h6>
          </div>
          <ng-content select="[errorExtra]"></ng-content>
        </div>
      } @else {
        <div class="grow flex min-h-0">
          @if (isSidebarAvailable()) {
            <div id="sidebar" class="shrink p-3 border-r-2 border-black">
              <ng-content select="[sidebar]"></ng-content>
            </div>
          }
          <div class="flex flex-col grow">
            <div id="main-content" class="grow" [class.overflow-y-auto]="isMainBodyScrollable()">
              <ng-content select="[main-content]"></ng-content>
            </div>
            @if (tabs()) {
              <shared-layout-ui-tab-menu class="shrink" [tabs]="tabs()" />
            }
          </div>
        </div>
      }
    </div>
  `
})
export class AppContainerComponent implements OnInit {
  private readonly mediaMatcher = inject(MediaMatcher);
  /**
   * hack needed in order to get the app to actually take up the height of the available space minus all browser ui elements like search bar/navigation
   */
  protected readonly deviceHeight = toSignal(
    fromEvent(window, 'resize').pipe(
      startWith(window.innerHeight),
      debounceTime(200),
      map(() => window.innerHeight)
    )
  );
  protected errorConfig = signal<ErrorConfig | null>(null);

  isSidebarAvailable = input(true);
  isMainBodyScrollable = input(true);
  isHeaderAvailable = input(true);
  tabs = input<TabMenuItem[]>();

  ngOnInit(): void {
    // call it first initially since the below eventListener only fires on a change, not when its set the first time
    this.setThemeColorBasedOnDeviceTheme();
    this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      this.setThemeColorBasedOnDeviceTheme();
    });
  }

  private setThemeColorBasedOnDeviceTheme() {
    const isDarkMode = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
    const rootStyle = getComputedStyle(document.documentElement);
    const themeColor = rootStyle.getPropertyValue('--mat-sys-surface').trim();
    const regex = /#[0-9a-fA-F]{6}/gm;
    const match = themeColor.match(regex);
    if (match) {
      const [light, dark] = match;
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', isDarkMode ? dark : light);
      }
    }
  }

  public setError(errorConfig: ErrorConfig) {
    this.errorConfig.set(errorConfig);
  }

  public clearError() {
    this.errorConfig.set(null);
  }
}
