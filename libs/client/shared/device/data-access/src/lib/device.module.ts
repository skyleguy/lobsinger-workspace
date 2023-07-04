import { ModuleWithProviders, NgModule } from '@angular/core';

import { DeviceConfig, DeviceConfigSymbol, defaultDeviceConfig } from '@lob/client/shared/device/data';

import { DeviceService } from './services';

export interface DeviceModuleOptions {
  config: DeviceConfig;
}

@NgModule({})
export class DeviceModule {
  static forRoot(options?: DeviceModuleOptions): ModuleWithProviders<DeviceModule> {
    return {
      ngModule: DeviceModule,
      providers: [
        {
          provide: DeviceConfigSymbol,
          useValue: options?.config ?? defaultDeviceConfig
        },
        DeviceService
      ]
    };
  }
}
