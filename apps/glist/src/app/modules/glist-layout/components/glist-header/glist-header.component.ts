import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { distinctUntilChanged, map, Observable, switchMap } from 'rxjs';

import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { DeviceService } from '@lob/client/shared/device/data-access';
import { ImageRetrievalService } from '@lob/client/shared/images/data-access';
import { UiVisibilityTarget } from '@lob/client/shared/mobile/utilities/data';
import { UiVisibilityService } from '@lob/client/shared/mobile/utilities/data-access';

@Component({
  selector: 'glist-header',
  templateUrl: './glist-header.component.html',
  styleUrls: ['./glist-header.component.scss']
})
export class GlistHeaderComponent implements OnInit {
  readonly isMenuVisible$ = this.uiVisibilityService.visibilityMap$.pipe(
    map((map) => {
      return !!map[UiVisibilityTarget.TOP_BAR];
    }),
    distinctUntilChanged()
  );

  @Output()
  menuClicked: EventEmitter<void> = new EventEmitter();

  imageUrl$!: Observable<any>;
  isHeaderVisible = true;

  constructor(
    private userFacadeService: UserFacadeService,
    private readonly imageRetrievalService: ImageRetrievalService,
    private readonly uiVisibilityService: UiVisibilityService,
    private changeDetectorRef: ChangeDetectorRef,
    public readonly deviceService: DeviceService
  ) {}

  public ngOnInit(): void {
    this.getUserImage();
    this.getHeaderVisibility();
  }

  private getUserImage(): void {
    this.imageUrl$ = this.userFacadeService.user$.pipe(
      switchMap((res) => this.imageRetrievalService.retrieveImage(res.pictureUrl ?? '', true))
    );
  }

  private getHeaderVisibility(): void {
    this.isMenuVisible$.subscribe({
      next: (isHeaderVisible) => {
        this.isHeaderVisible = isHeaderVisible;
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}
