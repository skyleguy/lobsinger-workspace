import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, map, startWith } from 'rxjs';

import { DeviceConfig, DeviceConfigSymbol, DeviceSize } from '@lob/client/shared/device/data';
import { AbstractSubscriptionComponent } from '@lob/client/shared/lifecycle-management/data-access';

import { DeviceModule } from '../../device.module';

@Injectable({
  providedIn: DeviceModule
})
export class DeviceService extends AbstractSubscriptionComponent {
  deviceSize$ = new BehaviorSubject(DeviceSize.COMPUTER);

  constructor(@Inject(DeviceConfigSymbol) private readonly deviceConfig: DeviceConfig) {
    super();
    this.subToWindowSize();
    console.log('init');
  }

  private subToWindowSize(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(this.deviceConfig.windowSizeDebounceTime),
        map((evt) => evt.target),
        startWith(window)
      )
      .subscribe((window) => {
        if (this.isWindow(window)) {
          this.selectDeviceSize(window.innerWidth);
        }
      });
  }

  private selectDeviceSize(width: number): void {
    for (const [breakpointWidth, breakpointDeviceSize] of Object.entries(this.deviceConfig.breakpointMap)) {
      const entryWidth = +breakpointWidth;
      if (width < entryWidth) {
        console.log(DeviceSize[breakpointDeviceSize]);
        this.deviceSize$.next(breakpointDeviceSize);
        break;
      }
    }
  }

  private isWindow(data: any): data is Window {
    return 'innerWidth' in data;
  }
}