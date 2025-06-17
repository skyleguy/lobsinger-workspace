import { MediaMatcher } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { Component, inject, input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { debounceTime, fromEvent, map, startWith } from 'rxjs';

import { TabMenuItem } from '@lob/client/shared/layout/data';

import { TabMenuComponent } from '../tab-menu/tab-menu.component';

export interface ErrorConfig {
  icon: 'fa-circle-exclamation' | 'fa-triangle-exclamation';
  primaryMessage: string;
  secondaryMessage?: string;
}

@Component({
  selector: 'shared-layout-ui-app-container',
  imports: [ToastModule, TabMenuComponent],
  providers: [MessageService],
  styles: [
    `
      .scale-3 {
        transform: scale(3);
        transform-origin: center;
      }
    `
  ],
  template: `
    <div class="h-screen w-screen flex flex-col" [style.height]="deviceHeight()">
      @if (isHeaderAvailable()) {
        <nav id="header" class="p-3 shrink flex items-center justify-between bg-surface-0 dark:bg-surface-900">
          <ng-content select="[nav]"></ng-content>
        </nav>
      }
      @if (errorConfig(); as errorConfig) {
        <div class="grow flex flex-col items-center justify-center p-5 gap-5">
          @if (isMaterialTheming()) {
            @defer (when isMaterialTheming()) {
              <i class="text-6xl fa-solid {{ errorConfig.icon }}"></i>
            }
          }
          <div class="flex flex-col justify-center items-center text-center">
            <h2 class="!m-0">{{ errorConfig.primaryMessage }}</h2>
            <h4 class="!m-0">{{ errorConfig.secondaryMessage }}</h4>
          </div>
          <ng-content select="[errorExtra]"></ng-content>
        </div>
      } @else {
        <div class="grow flex min-h-0">
          @if (isSidebarAvailable()) {
            <div id="sidebar">
              <ng-content select="[sidebar]"></ng-content>
            </div>
          }
          <div class="flex flex-col grow bg-surface-100 dark:bg-surface-800">
            <div id="main-content" class="grow p-3" [class.overflow-y-auto]="isMainBodyScrollable()">
              <ng-content select="[main-content]"></ng-content>
            </div>
            @if (tabs()) {
              <shared-layout-ui-tab-menu class="shrink" [tabs]="tabs()" />
            }
          </div>
        </div>
      }
    </div>
    <p-toast />
  `
})
export class AppContainerComponent implements OnInit {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly mediaMatcher = inject(MediaMatcher);
  /**
   * hack needed in order to get the app to actually take up the height of the available space minus all browser ui elements like search bar/navigation
   */
  protected readonly deviceHeight = this.isBrowser
    ? toSignal(
        fromEvent(window, 'resize').pipe(
          startWith(`${window.innerHeight}px`),
          debounceTime(200),
          map(() => `${window.innerHeight}px`)
        )
      )
    : signal('100vh');
  protected errorConfig = signal<ErrorConfig | null>(null);

  isSidebarAvailable = input(true);
  isMainBodyScrollable = input(true);
  isHeaderAvailable = input(true);
  isMaterialTheming = input(true);
  tabs = input<TabMenuItem[]>();

  ngOnInit(): void {
    // call it first initially since the below eventListener only fires on a change, not when its set the first time
    if (this.isMaterialTheming()) {
      this.setThemeColorBasedOnDeviceTheme();
      this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        this.setThemeColorBasedOnDeviceTheme();
      });
    }
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
