import { inject, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { ToastService } from '@lob/client-shared-messaging-data-access';

@Injectable({ providedIn: 'root' })
export class UpdateService {
  private swUpdate = inject(SwUpdate);
  private toastService = inject(ToastService);

  public enableAutoUpdate() {
    this.setVisibilityChangeUpdateListener();
    this.updateIfAvailable();
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
