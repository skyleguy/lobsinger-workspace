import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { debounceTime, fromEvent, map } from 'rxjs';

import { DeviceService } from '@lob/client/shared/device/data-access';
import { SubSinker } from '@lob/client/shared/lifecycle-management/data';

import { UiVisibilityService } from '../../services';

@Directive({
  selector: '[lobScrollVisibility]'
})
export class ScrollVisibilityDirective implements OnChanges, OnDestroy {
  readonly sub: SubSinker = new SubSinker();

  @Input()
  visibilityKey!: string;

  @Output()
  isScrollingDown: EventEmitter<boolean> = new EventEmitter();

  currentPosition = 0;

  constructor(
    private el: ElementRef,
    private readonly deviceService: DeviceService,
    private readonly uiVisibilityService: UiVisibilityService
  ) {
    this.subscribeToElementScroll();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['visibilityKey'] && this.visibilityKey) {
      this.uiVisibilityService.setVisibility(this.visibilityKey, true);
    }
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private subscribeToElementScroll(): void {
    this.sub.sink = fromEvent<Event>(this.el.nativeElement, 'scrollend')
      .pipe(
        debounceTime(300),
        map(() => {
          return {
            scrollTop: this.el.nativeElement.scrollTop,
            clientHeight: this.el.nativeElement.clientHeight
          };
        })
      )
      .subscribe({
        next: (targetInfo) => {
          const isScrollingDown = targetInfo.scrollTop > this.currentPosition;
          if (this.visibilityKey) {
            this.uiVisibilityService.setVisibility(this.visibilityKey, !isScrollingDown);
          }
          this.isScrollingDown.emit(isScrollingDown);
          this.currentPosition = targetInfo.scrollTop;
        }
      });
  }
}
