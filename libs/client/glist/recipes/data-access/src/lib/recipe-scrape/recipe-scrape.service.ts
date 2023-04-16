import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ScrapeResponse } from '@lob/shared/ingredients/data';

@Injectable({
  providedIn: 'root'
})
export class RecipeScrapeService {
  constructor(private readonly http: HttpClient) {}

  public scrapeRecipe(url: string): Observable<ScrapeResponse> {
    return this.http.post<ScrapeResponse>('http://localhost:3333/api/scrape', { url });
  }
}
