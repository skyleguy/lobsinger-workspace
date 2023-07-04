import { DeviceConfig } from '../config';
import { DeviceSize } from '../enum';

export const defaultDeviceConfig = new DeviceConfig({
  breakpointMap: {
    480: DeviceSize.MOBILE,
    768: DeviceSize.TABLET,
    1200: DeviceSize.COMPUTER,
    5000: DeviceSize.LARGE_COMPUTER
  },
  windowSizeDebounceTime: 200
});
