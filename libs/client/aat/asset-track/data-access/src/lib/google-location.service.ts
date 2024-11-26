import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

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
  private readonly apiKey = '';
  private readonly http = inject(HttpClient);

  getCurrentAddress(latitude: number, longitude: number) {
    return this.http
      .get<GeocodeApiResponse>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.apiKey}`)
      .pipe(map((res) => res.results?.[0]?.formatted_address));
  }
}
