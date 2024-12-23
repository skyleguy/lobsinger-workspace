import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

import { AjaxState } from '@lob/shared/data-management/data';
import { createAjaxState } from '@lob/shared/data-management/util';

interface GeocodeApiResult {
  formatted_address: string;
}

interface GeocodeApiResponse {
  results: GeocodeApiResult[];
}

@Injectable({
  providedIn: 'root'
})
export class GoogleLocationService {
  private readonly apiKey = 'AIzaSyDL9WxF63ZE6pxDn1bxiItR3OWDzkF620g';
  private readonly http = inject(HttpClient);

  getLocation(): Signal<AjaxState<string | undefined>> {
    const location = signal(createAjaxState<string | undefined>(undefined, true));
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.getCurrentAddress(latitude, longitude).subscribe({
          next: (currentAddress: string | undefined) => {
            location.set(createAjaxState(currentAddress));
          },
          error: (err) => {
            console.error(`error: ${JSON.stringify(err)}`);
            location.set(createAjaxState(undefined, false, err));
          }
        });
      },
      (geolocationError) => {
        console.error('Error obtaining location', geolocationError);
        const err = new Error(`${geolocationError.code}: ${geolocationError.message}`);
        location.set(createAjaxState(undefined, false, err));
      },
      { enableHighAccuracy: true }
    );
    return location;
  }

  getCurrentAddress(latitude: number, longitude: number) {
    return this.http
      .get<GeocodeApiResponse>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.apiKey}`)
      .pipe(
        map((res) => res.results?.[0]?.formatted_address),
        catchError((err) => {
          console.error(err);
          return throwError(() => err);
        })
      );
  }
}
