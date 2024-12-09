import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LetDirective } from '@ngrx/component';
import { FirebaseApp } from 'firebase/app';
import { distinctUntilChanged, map } from 'rxjs';

import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { DeviceService } from '@lob/client/shared/device/data-access';
import { FirebaseAppFacadeService } from '@lob/client/shared/firebase/data-access';
import { UiVisibilityTarget } from '@lob/client/shared/mobile/utilities/data';
import { UiVisibilityService } from '@lob/client/shared/mobile/utilities/data-access';

@Component({
    selector: 'glist-layout-feature-header',
    templateUrl: './glist-header.component.html',
    styleUrls: ['./glist-header.component.scss'],
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, LetDirective, AsyncPipe, NgOptimizedImage]
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

  imageUrl = toSignal(
    this.userFacadeService.potentiallyNullUser$.pipe(
      map((res) => {
        if (res && res.pictureUrl) {
          return res.pictureUrl;
        }
        return '';
      })
    )
  );
  isSignedIn = false;
  isHeaderVisible = true;
  app!: FirebaseApp;

  constructor(
    private userFacadeService: UserFacadeService,
    private readonly uiVisibilityService: UiVisibilityService,
    private changeDetectorRef: ChangeDetectorRef,
    public readonly deviceService: DeviceService,
    private readonly firebaseAppFacadeService: FirebaseAppFacadeService
  ) {}

  public ngOnInit(): void {
    this.getIsUserSignedIn();
    this.getHeaderVisibility();
    this.firebaseAppFacadeService.app$.subscribe({
      next: (app) => {
        this.app = app;
      }
    });
  }

  public changeSignInStatus(): void {
    if (this.isSignedIn) {
      this.userFacadeService.logUserOut();
    } else {
      this.userFacadeService.signUserIn(this.app, false);
    }
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
