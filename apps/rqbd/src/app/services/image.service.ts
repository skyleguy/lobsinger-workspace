import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly imageUrl = signal<string | null>(null);
}
