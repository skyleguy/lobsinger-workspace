import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { ToastService } from '@lob/client-shared-messaging-data-access';

@Injectable({ providedIn: 'root' })
export class UpdateService {
  private readonly swUpdate = inject(SwUpdate);
  private readonly toastService = inject(ToastService);
  private readonly platform = inject(PLATFORM_ID);

  public enableAutoUpdate() {
    if (isPlatformBrowser(this.platform)) {
      this.setVisibilityChangeUpdateListener();
      this.updateIfAvailable();
    }
  }

  public updateIfAvailable() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          this.toastService.toast('warn', 'Old Version Found', 'You will be updated automatically in 3 seconds.');
          setTimeout(() => {
            document.location.reload();
          }, 3000);
        }
      });
    }
  }

  public setVisibilityChangeUpdateListener() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.swUpdate.checkForUpdate().then((updateAvailable) => {
          if (updateAvailable) {
            this.updateIfAvailable();
          }
        });
      }
    });
  }
}
