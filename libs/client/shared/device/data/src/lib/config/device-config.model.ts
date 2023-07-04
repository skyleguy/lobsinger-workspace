import { DeviceSize } from '../enum';

export const DeviceConfigSymbol = Symbol('DeviceConfig');

export class DeviceConfig {
  breakpointMap!: Record<number, DeviceSize>;
  windowSizeDebounceTime!: number;

  constructor(obj: Partial<DeviceConfig>) {
    Object.assign(this, obj);
  }
}
