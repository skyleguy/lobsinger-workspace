import { Inject, Injectable, signal } from '@angular/core';
import { debounceTime, fromEvent, map, startWith } from 'rxjs';

import { DeviceConfig, DeviceConfigSymbol, DeviceSize } from '@lob/client/shared/device/data';
import { AbstractSubscriptionComponent } from '@lob/client/shared/lifecycle-management/data-access';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends AbstractSubscriptionComponent {
  deviceSize = signal(DeviceSize.COMPUTER);
  isMobile = signal(false);
  isComputer = signal(false);

  constructor(@Inject(DeviceConfigSymbol) private readonly deviceConfig: DeviceConfig) {
    super();
    this.subToWindowSize();
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
        this.deviceSize.set(breakpointDeviceSize);
        this.isMobile.set(this.isDeviceSizeMobileBreakpoint(breakpointDeviceSize));
        this.isComputer.set(this.isDeviceSizeComputerBreakpoint(breakpointDeviceSize));
        break;
      }
    }
  }

  private isDeviceSizeMobileBreakpoint(deviceSize: DeviceSize): boolean {
    return deviceSize === DeviceSize.MOBILE || deviceSize === DeviceSize.TABLET;
  }

  private isDeviceSizeComputerBreakpoint(deviceSize: DeviceSize): boolean {
    return deviceSize === DeviceSize.COMPUTER || deviceSize === DeviceSize.LARGE_COMPUTER;
  }

  private isWindow(data: unknown): data is Window {
    return 'innerWidth' in (data as Window);
  }
}
