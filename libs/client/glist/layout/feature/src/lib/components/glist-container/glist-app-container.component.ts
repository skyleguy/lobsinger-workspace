import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationStart, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';

import { DeviceService } from '@lob/client/shared/device/data-access';

import { GlistContentComponent } from '../glist-content/glist-content.component';
import { GlistHeaderComponent } from '../glist-header/glist-header.component';
import { GlistSidebarComponent } from '../glist-sidebar/glist-sidebar.component';

@Component({
  selector: 'glist-layout-feature-container',
  templateUrl: './glist-app-container.component.html',
  styleUrls: ['./glist-app-container.component.scss'],
  standalone: true,
  imports: [GlistHeaderComponent, MatSidenavModule, GlistSidebarComponent, GlistContentComponent]
})
export class GlistContainerComponent {
  isOpened!: boolean;
  isMobile = signal(false);

  constructor(
    private deviceService: DeviceService,
    private router: Router
  ) {
    this.chooseSidebarBehavior();
    this.closeMenuWhenRouteChanges();
  }

  public chooseSidebarBehavior(): void {
    this.deviceService.isMobile$.pipe(distinctUntilChanged()).subscribe({
      next: (isMobile) => {
        this.isMobile.set(isMobile);
        this.isOpened = !isMobile;
      }
    });
  }

  public closeMenuWhenRouteChanges(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationStart && this.isMobile())).subscribe({
      next: () => {
        this.isOpened = false;
      }
    });
  }
}
