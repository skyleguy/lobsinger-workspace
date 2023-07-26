import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { debounceTime, fromEvent, map } from 'rxjs';

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

  constructor(private el: ElementRef, private readonly uiVisibilityService: UiVisibilityService) {
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
        debounceTime(50),
        map((event: Event) => {
          const ele = event.target as HTMLElement;
          return {
            scrollTop: ele.scrollTop,
            clientHeight: ele.clientHeight
          };
        })
      )
      .subscribe({
        next: (targetInfo) => {
          console.log(targetInfo);
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
