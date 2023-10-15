import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { distinctUntilChanged, map, Observable, of, switchMap } from 'rxjs';

import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { DeviceService } from '@lob/client/shared/device/data-access';
import { ImageRetrievalService } from '@lob/client/shared/images/data-access';
import { UiVisibilityTarget } from '@lob/client/shared/mobile/utilities/data';
import { UiVisibilityService } from '@lob/client/shared/mobile/utilities/data-access';
// TODO fix issue where app cant import from itself using relative path
// eslint-disable-next-line @nx/enforce-module-boundaries
import { GlistInitializationService } from 'apps/glist/src/app/glist-initialization.service';

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

  imageUrl$!: Observable<string | SafeUrl | null>;
  isSignedIn = false;
  isHeaderVisible = true;

  constructor(
    private userFacadeService: UserFacadeService,
    private readonly imageRetrievalService: ImageRetrievalService,
    private readonly uiVisibilityService: UiVisibilityService,
    private changeDetectorRef: ChangeDetectorRef,
    public readonly deviceService: DeviceService,
    private readonly glistInitializationService: GlistInitializationService
  ) {}

  public ngOnInit(): void {
    this.getUserImage();
    this.getIsUserSignedIn();
    this.getHeaderVisibility();
  }

  public changeSignInStatus(): void {
    if (this.isSignedIn) {
      this.userFacadeService.logUserOut();
    } else {
      this.userFacadeService.signUserIn(this.glistInitializationService.app, false);
    }
  }

  private getUserImage(): void {
    this.imageUrl$ = this.userFacadeService.potentiallyNullUser$.pipe(
      switchMap((res) => (res ? this.imageRetrievalService.retrieveImage(res?.pictureUrl ?? '', true) : of(null)))
    );
  }

  private getIsUserSignedIn(): void {
    this.userFacadeService.isUserSignedIn$.subscribe({
      next: (isSignedIn) => {
        this.isSignedIn = isSignedIn;
      }
    });
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
