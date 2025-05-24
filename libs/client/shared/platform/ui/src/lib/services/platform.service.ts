import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private readonly platform = inject(PLATFORM_ID);

  public readonly isBrowser = isPlatformBrowser(this.platform);
}
