import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, input, signal } from '@angular/core';
import { MessageService } from 'primeng/api';

import { TabMenuItem } from '@lob/client/shared/layout/data';

import { TabMenuComponent } from '../tab-menu/tab-menu.component';

export interface ErrorConfig {
  icon: 'fa-circle-exclamation' | 'fa-triangle-exclamation';
  primaryMessage: string;
  secondaryMessage?: string;
}

@Component({
  selector: 'shared-layout-ui-app-container',
  imports: [TabMenuComponent],
  providers: [MessageService],
  template: `
    <div class="h-dvh w-screen flex flex-col">
      @if (isHeaderAvailable()) {
        <nav id="header" class="p-3 shrink flex items-center justify-between bg-surface-0 dark:bg-surface-900">
          <ng-content select="[nav]"></ng-content>
        </nav>
      }
      @if (errorConfig(); as errorConfig) {
        <div class="grow flex flex-col items-center justify-center p-5 gap-5">
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
  `
})
export class AppContainerComponent {
  private readonly mediaMatcher = inject(MediaMatcher);
  protected errorConfig = signal<ErrorConfig | null>(null);

  isSidebarAvailable = input(true);
  isMainBodyScrollable = input(true);
  isHeaderAvailable = input(true);
  tabs = input<TabMenuItem[]>();

  public setError(errorConfig: ErrorConfig) {
    this.errorConfig.set(errorConfig);
  }

  public clearError() {
    this.errorConfig.set(null);
  }
}
