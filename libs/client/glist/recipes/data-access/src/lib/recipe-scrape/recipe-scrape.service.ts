import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ScrapeResponse } from '@lob/shared/ingredients/data';

@Injectable({
  providedIn: 'root'
})
export class RecipeScrapeService {
  readonly baseUrl = 'http://localhost:3333';

  constructor(private readonly http: HttpClient) {}

  public scrapeRecipe(url: string): Observable<ScrapeResponse> {
    return this.http.post<ScrapeResponse>(`${this.baseUrl}/api/scrape`, { url });
  }
}
