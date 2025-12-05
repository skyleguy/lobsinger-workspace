import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  Renderer2,
  signal,
  viewChild
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import { PlatformService } from '@lob/client/shared/platform/ui';

import { OVERFLOW_ITEM_TOKEN } from './overflow-item';

@Component({
  selector: 'app-menu',
  imports: [MenuModule, ButtonModule],
  template: `
    <div #mainWrapper class="w-full flex gap-2 items-center justify-end overflow-hidden min-w-0">
      <div #collapsibleMenu class="grow flex gap-2 items-center justify-end min-w-0">
        <ng-content></ng-content>
      </div>
      <button #menuTrigger pButton icon="fa-solid fa-ellipsis" severity="secondary" (click)="menu.toggle($event)" size="small"></button>
    </div>
    <p-menu #menu [model]="items()" [popup]="true"></p-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnDestroy {
  private readonly platformService = inject(PlatformService);
  private readonly renderer = inject(Renderer2);
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly collapsibleMenu = viewChild<ElementRef<HTMLDivElement>>('collapsibleMenu');
  private readonly mainWrapper = viewChild<ElementRef<HTMLDivElement>>('mainWrapper');
  private readonly menuTrigger = viewChild<ElementRef<HTMLButtonElement>>('menuTrigger');
  private readonly overflowItems = contentChildren(OVERFLOW_ITEM_TOKEN, { descendants: false });

  staticItems = input.required<MenuItem[]>();

  protected readonly dynamicItems = signal<MenuItem[]>([]);
  protected readonly items = computed(() => [...this.staticItems(), ...this.dynamicItems()]);
  private resizeObserver!: ResizeObserver;

  constructor() {
    effect(() => {
      const wrapper = this.mainWrapper();
      const overflowItems = this.overflowItems();
      if (this.platformService.isBrowser) {
        if (wrapper && overflowItems) {
          if (this.resizeObserver) {
            this.resizeObserver.disconnect();
          }
          this.resizeObserver = new ResizeObserver(() => {
            this.calculateOverflow();
          });
          this.resizeObserver.observe(wrapper.nativeElement);
        }
      }
    });
  }

  calculateOverflow() {
    const container = this.collapsibleMenu()?.nativeElement;
    const menuTrigger = this.menuTrigger()?.nativeElement;
    const mainWrapper = this.mainWrapper()?.nativeElement;
    if (container && menuTrigger && mainWrapper) {
      const children = Array.from(container.children) as HTMLElement[];
      const childrenInstances = this.overflowItems();
      const gap = 8;

      const availableWidth = mainWrapper.clientWidth - menuTrigger.offsetWidth - gap;

      // Unhide everything so we get accurate natural widths and reset dynamicItems
      children.forEach((child) => this.renderer.removeClass(child, 'hidden'));
      this.dynamicItems.set([]);

      // pop off items starting from left side, never remove the last one

      let totalChildrenWidth = 0;

      totalChildrenWidth = children.reduce((a, b) => a + b.offsetWidth, 0) + (children.length - 1) * gap;

      // If everything fits, we are done
      if (totalChildrenWidth <= availableWidth) return;

      // Hide items from the START (Left) until the remainder fits
      let currentUsedWidth = totalChildrenWidth;

      for (let i = 0; i < children.length; i++) {
        // If we are within limits, stop hiding
        if (currentUsedWidth <= availableWidth) break;

        // Otherwise, hide this item (starting from index 0)
        const child = children[i];
        const childOverflowItemInstance = childrenInstances[i];
        const width = child?.offsetWidth ?? 0;

        if (childOverflowItemInstance) {
          this.dynamicItems.update((items) => {
            const dynamicItem = childOverflowItemInstance.getDynamicItem?.();
            if (dynamicItem) {
              return [...items, dynamicItem];
            }
            return items;
          });
        }
        this.renderer.addClass(child, 'hidden');

        // Reduce the used width by this child's width + the gap that followed it
        currentUsedWidth -= width + gap;
      }
    }
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
