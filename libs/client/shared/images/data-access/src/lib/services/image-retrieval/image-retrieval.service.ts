import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs';

import { arrayBufferToImageString } from '@lob/client/shared/images/util';

const mimeTypes = ['jpeg', 'jpg', 'svg', 'png'];

@Injectable({
  providedIn: 'root'
})
export class ImageRetrievalService {
  constructor(private readonly http: HttpClient, private readonly sanitizer: DomSanitizer) {}

  retrieveImage(url: string, makeSafeUrl = false) {
    const urlFragments = url.split('.');
    let mimeType = mimeTypes[0];
    if (mimeTypes.includes(urlFragments[urlFragments.length - 1])) {
      mimeType = urlFragments[urlFragments.length - 1];
    }
    return this.http.get(url, { responseType: 'arraybuffer' }).pipe(
      map((res): string | SafeUrl => {
        const image = arrayBufferToImageString(res);
        return makeSafeUrl ? this.sanitizer.bypassSecurityTrustUrl(`data:image/${mimeType};base64,${image}`) : image;
      })
    );
  }
}
