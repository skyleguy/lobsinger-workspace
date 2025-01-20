import { Component, input, OnInit, signal } from '@angular/core';
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
      .mobile-safe-area {
        padding-top: env(safe-area-inset-top);
        background-color: var(--mat-sys-surface, #ffffff);
      }
    `
  ],
  template: `
    <div class="w-screen flex flex-col" [style.height]="deviceHeight() + 'px'">
      @if (isHeaderAvailable()) {
        <nav id="header" class="mobile-safe-area shrink flex items-center justify-between">
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
    const themeMetaTag = document.querySelector('meta[name="theme-color"]');
    themeMetaTag?.setAttribute('content', 'var(--mat-sys-surface, #ffffff)');
  }

  public setError(errorConfig: ErrorConfig) {
    this.errorConfig.set(errorConfig);
  }

  public clearError() {
    this.errorConfig.set(null);
  }
}
