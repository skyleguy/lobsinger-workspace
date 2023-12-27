import { DeviceConfigSymbol, DeviceModuleOptions, defaultDeviceConfig } from '@lob/client/shared/device/data';

export function provideDevice(options?: DeviceModuleOptions) {
  return [{ provide: DeviceConfigSymbol, useValue: options?.config ?? defaultDeviceConfig }];
}
