import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SafeUrl } from '@angular/platform-browser';
import { LetDirective } from '@ngrx/component';
import { FirebaseApp } from 'firebase/app';
import { distinctUntilChanged, map, Observable, of, switchMap } from 'rxjs';

import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { DeviceService } from '@lob/client/shared/device/data-access';
import { FirebaseAppFacadeService } from '@lob/client/shared/firebase/data-access';
import { ImageRetrievalService } from '@lob/client/shared/images/data-access';
import { UiVisibilityTarget } from '@lob/client/shared/mobile/utilities/data';
import { UiVisibilityService } from '@lob/client/shared/mobile/utilities/data-access';
// TODO fix issue where app cant import from itself using relative path
// eslint-disable-next-line @nx/enforce-module-boundaries

@Component({
  selector: 'glist-layout-feature-header',
  templateUrl: './glist-header.component.html',
  styleUrls: ['./glist-header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, LetDirective, AsyncPipe]
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
  app!: FirebaseApp;

  constructor(
    private userFacadeService: UserFacadeService,
    private readonly imageRetrievalService: ImageRetrievalService,
    private readonly uiVisibilityService: UiVisibilityService,
    private changeDetectorRef: ChangeDetectorRef,
    public readonly deviceService: DeviceService,
    private readonly firebaseAppFacadeService: FirebaseAppFacadeService
  ) {}

  public ngOnInit(): void {
    this.getUserImage();
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
